-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- PROFILES
-- ============================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  stripe_customer_id text,
  subscription_status text not null default 'free'
    check (subscription_status in ('free', 'active', 'canceled', 'past_due')),
  created_at timestamptz not null default now()
);

-- Auto-create profile when a user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- BUSINESSES
-- ============================================================
create table if not exists public.businesses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  industry text not null,
  created_at timestamptz not null default now()
);

-- ============================================================
-- GENERATED ADS
-- ============================================================
create table if not exists public.generated_ads (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  business_id uuid references public.businesses(id) on delete set null,
  prompt_input jsonb not null,
  ad_result text not null,
  created_at timestamptz not null default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.profiles enable row level security;
alter table public.businesses enable row level security;
alter table public.generated_ads enable row level security;

-- Profiles: users can only read/update their own profile
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- Businesses: users can only manage their own businesses
create policy "businesses_select_own" on public.businesses
  for select using (auth.uid() = user_id);

create policy "businesses_insert_own" on public.businesses
  for insert with check (auth.uid() = user_id);

create policy "businesses_update_own" on public.businesses
  for update using (auth.uid() = user_id);

create policy "businesses_delete_own" on public.businesses
  for delete using (auth.uid() = user_id);

-- Generated ads: users can only read/insert their own ads
create policy "ads_select_own" on public.generated_ads
  for select using (auth.uid() = user_id);

create policy "ads_insert_own" on public.generated_ads
  for insert with check (auth.uid() = user_id);

-- ============================================================
-- INDEXES
-- ============================================================
create index if not exists generated_ads_user_id_idx on public.generated_ads(user_id);
create index if not exists generated_ads_created_at_idx on public.generated_ads(created_at desc);
create index if not exists businesses_user_id_idx on public.businesses(user_id);
