begin;

-- Execute this migration as the database owner (normally postgres).
-- The private schema and is_active_org_admin() come from Stage 2B.

create or replace function private.update_membership_internal(
  p_membership_id uuid,
  p_new_role text,
  p_new_status text
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_actor_id uuid := (select auth.uid());
  v_organization_id uuid;
  v_target public.organization_memberships%rowtype;
  v_effective_role text;
  v_effective_status text;
begin
  if v_actor_id is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;

  if p_membership_id is null
     or (p_new_role is null and p_new_status is null) then
    raise exception 'Specify a membership and a role or status change'
      using errcode = '22023';
  end if;

  if p_new_role is not null
     and p_new_role not in ('admin', 'dispatcher', 'technician') then
    raise exception 'Invalid membership role' using errcode = '22023';
  end if;

  if p_new_status is not null
     and p_new_status not in ('active', 'suspended', 'inactive') then
    raise exception 'Invalid membership status' using errcode = '22023';
  end if;

  -- Identify the organization owning the membership.
  select m.organization_id
    into v_organization_id
  from public.organization_memberships as m
  where m.id = p_membership_id;

  if v_organization_id is null then
    raise exception 'Membership not found or access denied'
      using errcode = '42501';
  end if;

  -- Serialize membership changes within this organization. All future
  -- privileged membership writers must follow the same lock protocol.
  perform 1
  from public.organizations as o
  where o.id = v_organization_id
  for update;

  if not found then
    raise exception 'Membership not found or access denied'
      using errcode = '42501';
  end if;

  -- Authorization must be checked AFTER acquiring the organization lock.
  if not private.is_active_org_admin(v_organization_id) then
    raise exception 'Active organization administrator required'
      using errcode = '42501';
  end if;

  select *
    into v_target
  from public.organization_memberships as m
  where m.id = p_membership_id
  for update;

  if not found or v_target.organization_id <> v_organization_id then
    raise exception 'Membership not found or access denied'
      using errcode = '42501';
  end if;

  -- Administrators cannot alter their own membership through this API.
  if v_target.user_id = v_actor_id then
    raise exception 'You cannot change your own membership'
      using errcode = '42501';
  end if;

  v_effective_role := coalesce(p_new_role, v_target.role);
  v_effective_status := coalesce(p_new_status, v_target.status);

  -- Preserve at least one active administrator for the organization.
  if v_target.role = 'admin'
     and v_target.status = 'active'
     and (v_effective_role <> 'admin' or v_effective_status <> 'active')
     and (
       select count(*)
       from public.organization_memberships as m
       where m.organization_id = v_organization_id
         and m.role = 'admin'
         and m.status = 'active'
     ) <= 1 then
    raise exception 'Organization must retain an active administrator';
  end if;

  update public.organization_memberships
  set role = v_effective_role,
      status = v_effective_status,
      deactivated_at = case
        when v_effective_status = 'inactive'
          then coalesce(v_target.deactivated_at, now())
        else null
      end
  where id = p_membership_id;

  return p_membership_id;
end;
$$;

revoke all on function private.update_membership_internal(uuid, text, text)
  from public, anon, authenticated;

grant usage on schema private to authenticated;
grant execute on function private.update_membership_internal(uuid, text, text)
  to authenticated;

-- The two externally visible endpoints remain SECURITY INVOKER.
create or replace function public.change_membership_role(
  p_membership_id uuid,
  p_new_role text
)
returns uuid
language sql
security invoker
set search_path = ''
as $$
  select private.update_membership_internal(
    p_membership_id,
    p_new_role,
    null::text
  );
$$;

revoke all on function public.change_membership_role(uuid, text)
  from public, anon, authenticated;
grant execute on function public.change_membership_role(uuid, text)
  to authenticated;

create or replace function public.set_membership_status(
  p_membership_id uuid,
  p_new_status text
)
returns uuid
language sql
security invoker
set search_path = ''
as $$
  select private.update_membership_internal(
    p_membership_id,
    null::text,
    p_new_status
  );
$$;

revoke all on function public.set_membership_status(uuid, text)
  from public, anon, authenticated;
grant execute on function public.set_membership_status(uuid, text)
  to authenticated;

commit;
