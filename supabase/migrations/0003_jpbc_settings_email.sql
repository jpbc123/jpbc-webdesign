-- Email address in the seller details printed on invoices.
-- Run once in the Supabase SQL editor (after 0002).

alter table jpbc.settings add column email text default 'hello@jpbcwebdesigns.com';
