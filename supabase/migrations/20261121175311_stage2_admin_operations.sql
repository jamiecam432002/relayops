
begin;

-- =====================================
-- 1. PRIVATE ORGANIZATION CREATION
-- =====================================

create or replace function
  private.create_organization_internal(
    p_name text
  )
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_org_id uuid;
begin
  -- Require an authenticated user
  if v_user_id is null then
    raise exception 'Authentication required'
      using errcode = '42501';
  end if;

  -- Validate organization name
  if p_name is null
     or char_length(btrim(p_name)) not between 2 and 120
  then
    raise exception
      'Organization name must be 2-120 characters';
  end if;

  -- Require an existing profile
  if not exists (
    select 1
    from public.profiles
    where id = v_user_id
  ) then
    raise exception 'User profile not found';
  end if;

  -- Create the organization
  insert into public.organizations (name)
  values (btrim(p_name))
  returning id into v_org_id;

  -- Make the creator its first administrator
  insert into public.organization_memberships (
    organization_id,
    user_id,
    role,
    status
  )
  values (
    v_org_id,
    v_user_id,
    'admin',
    'active'
  );

  return v_org_id;
end;
$$;

-- Restrict execution
revoke all on function
  private.create_organization_internal(text)
  from public, anon, authenticated;

grant usage on schema private to authenticated;

grant execute on function
  private.create_organization_internal(text)
  to authenticated;


-- =====================================
-- 2. PUBLIC RPC ENTRY POINT
-- =====================================

create or replace function
  public.create_organization(p_name text)
returns uuid
language sql
security invoker
set search_path = ''
as $$
  select private.create_organization_internal(p_name);
$$;

revoke all on function
  public.create_organization(text)
  from public, anon, authenticated;

grant execute on function
  public.create_organization(text)
  to authenticated;


-- =====================================
-- 3. PRIVATE ADMIN PERMISSION CHECK
-- =====================================

create or replace function
  private.is_active_org_admin(p_org_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.organization_memberships m
    where m.organization_id = p_org_id
      and m.user_id = (select auth.uid())
      and m.role = 'admin'
      and m.status = 'active'
  );
$$;

revoke all on function
  private.is_active_org_admin(uuid)
  from public, anon, authenticated;

grant execute on function
  private.is_active_org_admin(uuid)
  to authenticated;


-- =====================================
-- 4. ADMIN MEMBERSHIP VISIBILITY
-- =====================================

create policy "Admins can read org memberships"
on public.organization_memberships
for select
to authenticated
using (
  private.is_active_org_admin(organization_id)
);

commit;
