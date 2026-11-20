-- RelayOps | Stage 1: Organizations, Profiles, Organization Memberships
-- Apply to a new RelayOps Supabase database, using a migration or the SQL Editor.
-- Run as the database owner (typically postgres), and only once.

begin;

create schema if not exists private;

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 2 and 120),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text,
  last_name text,
  avatar_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organization_memberships (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  user_id uuid not null references public.profiles(id) on delete restrict,
  role text not null check (role in ('admin', 'dispatcher', 'technician')),
  status text not null default 'active'
    check (status in ('active', 'suspended', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deactivated_at timestamptz,
  constraint unique_organization_user unique (organization_id, user_id)
);

create index memberships_active_user_idx
  on public.organization_memberships (user_id)
  where status = 'active';

-- Deny client access until Stage 2 policies are defined.
alter table public.organizations enable row level security;
alter table public.profiles enable row level security;
alter table public.organization_memberships enable row level security;

-- Automatically create a profile when an Auth user is created.
create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, first_name, last_name)
  values (
    new.id,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function private.handle_new_user();

-- Maintain updated_at on every update to the three tables.
create or replace function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger organizations_updated_at
  before update on public.organizations
  for each row execute function private.set_updated_at();

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function private.set_updated_at();

create trigger memberships_updated_at
  before update on public.organization_memberships
  for each row execute function private.set_updated_at();

-- Backfill accounts created before the trigger was installed.
insert into public.profiles (id, first_name, last_name, created_at)
select
  id,
  raw_user_meta_data ->> 'first_name',
  raw_user_meta_data ->> 'last_name',
  created_at
from auth.users
on conflict (id) do nothing;

commit;