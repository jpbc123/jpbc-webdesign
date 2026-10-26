-- Invoice PDFs for recorded payments.
--
-- Adds what an invoice needs that 0001 did not store:
--   * jpbc.settings: one row with the seller details printed at the top of
--     every invoice (address, phone and bank details are entered in the admin's
--     Settings page, so they never sit in the code).
--   * clients: billing address, agreement date and the default invoice line.
--   * payments: an optional custom invoice line (for one-off payments).
-- Generated PDFs are stored in the private jpbc-receipts bucket under
-- <client id>/invoices/, with the same owner-only policies as receipts.
--
-- Run once in the Supabase SQL editor (after 0001).

-- ---------------------------------------------------------------- seller details

create table jpbc.settings (
  id smallint primary key default 1 check (id = 1),
  trading_name text not null default 'JPBC Web Designs',
  website text default 'jpbcwebdesigns.com',
  operator_name text default 'RYC Software and Web Solutions',
  reg_no text default '202603276004 (RA0140571-V)',
  address text,
  phone text,
  bank_details text,
  invoice_notes text default 'No SST charged: RYC Software and Web Solutions is not registered for Sales and Service Tax.',
  updated_at timestamptz not null default now()
);

insert into jpbc.settings (id) values (1) on conflict (id) do nothing;

create trigger settings_touch before update on jpbc.settings
  for each row execute function jpbc.touch_updated_at();

grant select, update on jpbc.settings to authenticated;
grant all on jpbc.settings to service_role;
alter table jpbc.settings enable row level security;

create policy "owner manages settings" on jpbc.settings for all to authenticated
  using (jpbc.is_owner()) with check (jpbc.is_owner());

-- ---------------------------------------------------------------- invoice fields

alter table jpbc.clients
  add column address text,
  -- Date the client signed the plan agreement ("As per the … agreement signed …").
  add column agreement_date date,
  -- Line under the item title on monthly invoices, e.g.
  -- "Online store example.com.my: hosting, maintenance and support."
  add column invoice_item text;

alter table jpbc.payments
  -- Optional overrides for the invoice line, mainly for one-off payments.
  add column item_title text,
  add column item_details text;
