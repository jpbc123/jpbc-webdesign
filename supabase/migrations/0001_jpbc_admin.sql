-- JPBC client admin: client records, payments and private receipts.
--
-- Lives in the pvg-store Supabase project (to save cost), fenced off from the
-- store in its own `jpbc` schema:
--   * Only users listed in jpbc.admins (the owner) can read or write anything.
--     The store's public.is_admin() is NEVER used here: Gary is a store admin.
--   * The anon role gets no access to the schema at all; signed-in users get
--     table privileges, but row-level security returns nothing unless
--     jpbc.is_owner() is true.
--   * Receipts go in a private `jpbc-receipts` bucket with the same owner check.
--
-- Run once in the Supabase SQL editor, then:
--   1. Settings → API (Data API) → "Exposed schemas": add `jpbc`.
--   2. Add yourself as the owner (see the bottom of this file).

create schema if not exists jpbc;

revoke all on schema jpbc from public, anon;
grant usage on schema jpbc to authenticated, service_role;

-- ---------------------------------------------------------------- owners

create table jpbc.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function jpbc.is_owner()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from jpbc.admins where user_id = auth.uid());
$$;

revoke all on function jpbc.is_owner() from public, anon;
grant execute on function jpbc.is_owner() to authenticated, service_role;

-- ---------------------------------------------------------------- clients

create table jpbc.clients (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  contact_name text,
  phone text,
  email text,
  ssm_no text,
  domains text,
  site_url text,
  hosting text,
  plan text,
  monthly_fee numeric(10, 2) check (monthly_fee is null or monthly_fee >= 0),
  -- First month that is billed; months from here to now are expected to be paid.
  billing_start date,
  status text not null default 'active' check (status in ('lead', 'active', 'paused', 'ended')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------- payments

create table jpbc.payments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references jpbc.clients (id) on delete restrict,
  amount numeric(10, 2) not null check (amount > 0),
  paid_on date not null default current_date,
  -- Months this payment covers, each stored as the 1st of the month
  -- (e.g. {2026-11-01, 2026-12-01} for Nov + Dec).
  months date[] not null default '{}',
  method text,
  invoice_no text unique,
  notes text,
  -- Paths inside the private jpbc-receipts bucket
  receipt_path text,
  invoice_path text,
  created_at timestamptz not null default now()
);

create index payments_client_idx on jpbc.payments (client_id, paid_on desc);

create or replace function jpbc.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger clients_touch before update on jpbc.clients
  for each row execute function jpbc.touch_updated_at();

-- ---------------------------------------------------------------- privileges + RLS

grant select, insert, update, delete on jpbc.clients, jpbc.payments to authenticated;
grant select on jpbc.admins to authenticated;
grant all on all tables in schema jpbc to service_role;

alter table jpbc.admins enable row level security;
alter table jpbc.clients enable row level security;
alter table jpbc.payments enable row level security;

-- admins: the owner can see the list; changed via SQL only.
create policy "owner reads admins" on jpbc.admins for select to authenticated
  using (jpbc.is_owner());

create policy "owner manages clients" on jpbc.clients for all to authenticated
  using (jpbc.is_owner()) with check (jpbc.is_owner());

create policy "owner manages payments" on jpbc.payments for all to authenticated
  using (jpbc.is_owner()) with check (jpbc.is_owner());

-- ---------------------------------------------------------------- private receipts bucket

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'jpbc-receipts', 'jpbc-receipts', false, 10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'application/pdf']
)
on conflict (id) do nothing;

create policy "jpbc receipts owner read" on storage.objects for select to authenticated
  using (bucket_id = 'jpbc-receipts' and jpbc.is_owner());
create policy "jpbc receipts owner upload" on storage.objects for insert to authenticated
  with check (bucket_id = 'jpbc-receipts' and jpbc.is_owner());
create policy "jpbc receipts owner update" on storage.objects for update to authenticated
  using (bucket_id = 'jpbc-receipts' and jpbc.is_owner());
create policy "jpbc receipts owner delete" on storage.objects for delete to authenticated
  using (bucket_id = 'jpbc-receipts' and jpbc.is_owner());

-- ---------------------------------------------------------------- make yourself the owner
-- Use the email you sign in with (create the user first under Authentication →
-- Users if it doesn't exist). Use a different account from Gary's.
--
-- insert into jpbc.admins (user_id)
-- select id from auth.users where email = 'YOUR-EMAIL-HERE';
