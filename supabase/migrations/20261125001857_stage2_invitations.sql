-- RelayOps Stage 2C: invitations and secure acceptance
-- Prerequisites: Stages 1, 2A, and 2B have been applied.
-- Apply as the database owner (normally postgres).
begin;

create table public.organization_invitations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null
    references public.organizations(id) on delete restrict,
  email text not null,
  role text not null
    check (role in ('admin', 'dispatcher', 'technician')),
  status text not null default 'pending'
    check (status in ('pending', 'accepted', 'revoked', 'expired')),
  invited_by uuid not null
    references public.profiles(id) on delete restrict,
  accepted_by uuid
    references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '7 days'),
  accepted_at timestamptz,
  constraint invitations_email_normalized
    check (email = lower(btrim(email))),
  constraint invitations_accepted_fields
    check (
      (status = 'accepted' and accepted_by is not null and accepted_at is not null)
      or
      (status <> 'accepted' and accepted_by is null and accepted_at is null)
    )
);

-- The same organization cannot have two simultaneously pending invitations
-- for the same email address.
create unique index invitations_one_pending_per_email
  on public.organization_invitations(organization_id, email)
  where status = 'pending';

create index invitations_org_status_idx
  on public.organization_invitations(organization_id, status);

-- No direct browser access to invitation data. Access is through narrow RPCs.
alter table public.organization_invitations enable row level security;
revoke all on table public.organization_invitations from anon, authenticated;

create trigger invitations_updated_at
  before update on public.organization_invitations
  for each row execute function private.set_updated_at();

-- Privileged creation function. Authorization is established from auth.uid(),
-- never from a caller-supplied user ID or organization role.
create function private.create_employee_invitation_internal(
  p_organization_id uuid,
  p_email text,
  p_role text
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_actor_id uuid := (select auth.uid());
  v_email text := lower(btrim(p_email));
  v_invitation_id uuid;
begin
  if v_actor_id is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;

  if v_email is null or char_length(v_email) > 254
     or v_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' then
    raise exception 'Invalid invitation email' using errcode = '22023';
  end if;

  if p_role is null or p_role not in ('admin', 'dispatcher', 'technician') then
    raise exception 'Invalid membership role' using errcode = '22023';
  end if;

  -- This lock follows the same ordering as our membership-management
  -- functions, so authorization and membership changes are serialized.
  perform 1 from public.organizations
  where id = p_organization_id for update;
  if not found then
    raise exception 'Organization not found or access denied' using errcode = '42501';
  end if;

  if not private.is_active_org_admin(p_organization_id) then
    raise exception 'Active administrator required' using errcode = '42501';
  end if;

  -- An existing member, even an inactive one, should be handled via the
  -- membership management workflow rather than invited as a new member.
  if exists (
    select 1
    from public.organization_memberships m
    join auth.users u on u.id = m.user_id
    where m.organization_id = p_organization_id
      and lower(btrim(u.email)) = v_email
  ) then
    raise exception 'User already has a membership; manage that membership instead'
      using errcode = '23505';
  end if;

  -- Expired invitations remain in the audit history but no longer block
  -- creating a new invitation for that address.
  update public.organization_invitations
  set status = 'expired'
  where organization_id = p_organization_id
    and email = v_email
    and status = 'pending'
    and expires_at <= now();

  insert into public.organization_invitations (
    organization_id, email, role, invited_by
  )
  values (p_organization_id, v_email, p_role, v_actor_id)
  returning id into v_invitation_id;

  return v_invitation_id;
end;
$$;

revoke all on function private.create_employee_invitation_internal(uuid, text, text)
  from public, anon, authenticated;
grant usage on schema private to authenticated;
grant execute on function private.create_employee_invitation_internal(uuid, text, text)
  to authenticated;

create function public.create_employee_invitation(
  p_organization_id uuid,
  p_email text,
  p_role text
)
returns uuid
language sql
security invoker
set search_path = ''
as $$
  select private.create_employee_invitation_internal(
    p_organization_id, p_email, p_role
  );
$$;

revoke all on function public.create_employee_invitation(uuid, text, text)
  from public, anon, authenticated;
grant execute on function public.create_employee_invitation(uuid, text, text)
  to authenticated;

-- Acceptance by a verified account with exactly the invited email address.
-- The invitation ID is a locator, not a bearer credential.
create function private.accept_employee_invitation_internal(p_invitation_id uuid)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_actor_id uuid := (select auth.uid());
  v_org_id uuid;
  v_email text;
  v_invite public.organization_invitations%rowtype;
  v_membership_id uuid;
begin
  if v_actor_id is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;

  select lower(btrim(u.email)) into v_email
  from auth.users u
  where u.id = v_actor_id
    and u.email_confirmed_at is not null;

  if v_email is null then
    raise exception 'Verified email required' using errcode = '42501';
  end if;

  select organization_id into v_org_id
  from public.organization_invitations
  where id = p_invitation_id;

  if v_org_id is null then
    raise exception 'Invitation unavailable' using errcode = '42501';
  end if;

  -- Same lock ordering as existing membership administrative operations.
  perform 1 from public.organizations where id = v_org_id for update;

  select * into v_invite
  from public.organization_invitations
  where id = p_invitation_id
  for update;

  if not found or v_invite.status <> 'pending'
     or v_invite.expires_at <= now()
     or v_invite.email <> v_email then
    raise exception 'Invitation unavailable' using errcode = '42501';
  end if;

  -- No reactivation or duplicate membership via invitation acceptance.
  if exists (
    select 1 from public.organization_memberships m
    where m.organization_id = v_org_id and m.user_id = v_actor_id
  ) then
    raise exception 'Membership already exists' using errcode = '23505';
  end if;

  insert into public.organization_memberships (
    organization_id, user_id, role, status
  )
  values (v_org_id, v_actor_id, v_invite.role, 'active')
  returning id into v_membership_id;

  update public.organization_invitations
  set status = 'accepted', accepted_by = v_actor_id, accepted_at = now()
  where id = p_invitation_id;

  return v_membership_id;
end;
$$;

revoke all on function private.accept_employee_invitation_internal(uuid)
  from public, anon, authenticated;
grant execute on function private.accept_employee_invitation_internal(uuid)
  to authenticated;

create function public.accept_employee_invitation(p_invitation_id uuid)
returns uuid
language sql
security invoker
set search_path = ''
as $$
  select private.accept_employee_invitation_internal(p_invitation_id);
$$;

revoke all on function public.accept_employee_invitation(uuid)
  from public, anon, authenticated;
grant execute on function public.accept_employee_invitation(uuid)
  to authenticated;

commit;
