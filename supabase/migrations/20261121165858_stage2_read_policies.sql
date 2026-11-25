
begin;

-- ==========================================
-- 1. DATABASE PRIVILEGES
-- ==========================================

-- Remove client privileges inherited from
-- older Supabase project defaults.
revoke all on table public.profiles
  from anon, authenticated;

revoke all on table public.organizations
  from anon, authenticated;

revoke all on table public.organization_memberships
  from anon, authenticated;

-- Authenticated users can read these tables.
-- RLS will determine which rows they can see.
grant select on table public.profiles
  to authenticated;

grant select on table public.organizations
  to authenticated;

grant select on table public.organization_memberships
  to authenticated;


-- ==========================================
-- 2. PROFILES
-- ==========================================

create policy "Users can read own profile"
on public.profiles
for select
to authenticated
using (
  id = (select auth.uid())
);


-- ==========================================
-- 3. ORGANIZATION MEMBERSHIPS
-- ==========================================

create policy "Users can read own memberships"
on public.organization_memberships
for select
to authenticated
using (
  user_id = (select auth.uid())
);


-- ==========================================
-- 4. ORGANIZATIONS
-- ==========================================

create policy "Users can read active organizations"
on public.organizations
for select
to authenticated
using (
  id in (
    select m.organization_id
    from public.organization_memberships m
    where m.user_id = (select auth.uid())
      and m.status = 'active'
  )
);

commit;
