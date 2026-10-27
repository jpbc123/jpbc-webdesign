-- Invoices before payment, official receipts after.
--
-- A payment record can now exist before the money arrives:
--   * paid_on is null while it is awaiting payment (an invoice has been issued);
--     marking it paid sets paid_on, the method and the proof.
--   * issued_on is the invoice date, due_on the date it should be paid by.
--   * receipt_no / receipt_pdf_path hold the official receipt (OR-YYYYMMDD-NNN),
--     made once paid. (receipt_path stays the client's payment proof.)
-- Settings gain the bank details printed on invoices, one field per line, so
-- they never sit in the code.
--
-- Run once in the Supabase SQL editor (after 0003).

alter table jpbc.payments
  alter column paid_on drop not null,
  alter column paid_on drop default,
  add column issued_on date not null default current_date,
  add column due_on date,
  add column receipt_no text unique,
  add column receipt_pdf_path text;

-- Records made before this were all paid on receipt.
update jpbc.payments set issued_on = paid_on where paid_on is not null;

alter table jpbc.settings
  add column bank_name text,
  add column bank_account_name text,
  add column bank_account_no text;
