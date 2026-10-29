# Plan: private client admin

## Status (2026-10-29)

- **Built and live** on jpbcwebdesigns.com since 2026-10-26, at the secret `ADMIN_PATH`.
- **Done:** clients, payments, uploads, an invoice PDF (`lib/invoice-pdf.ts`), and the
  invoice → official receipt flow. An unpaid record gives `INV-YYYYMMDD-NNN`; once marked
  paid it gives `OR-YYYYMMDD-NNN`.
- **Still to do:**
  - confirm migration `supabase/migrations/0004_jpbc_invoice_receipt.sql` has been run in Supabase;
  - fill in the bank fields in Settings;
  - import the existing records (list at the bottom);
  - add a daily backup (no workflow exists yet).

Noted 2026-10-25. A private admin area on this site, built like the one in the Gary
store (`C:\Users\User\client-one-ecommerce-simple`), but for running JPBC Webdesigns
itself: client records, monthly payments and receipts. Only the owner logs in;
clients never see it.

## What it should do

- **Clients**: one record per client (e.g. Gary / Perniagaan Vertex Global): business
  name, contact person, phone/WhatsApp, email, SSM no., domain(s), live site URL,
  hosting (Cloudflare Worker / Vercel / Supabase project names), plan and monthly fee
  (e.g. RM200/mo), start date, status (lead / active / paused / ended), notes.
- **Payments**: per client, which months are paid and which are due/overdue.
  Each payment: amount, date paid, months covered (e.g. Nov + Dec 2026 = RM400),
  method (bank transfer, DuitNow…), invoice number (format `INV-YYYYMMDD-NNN`).
- **Receipts**: upload the client's payment proof (image/PDF) against a payment, and
  keep the invoice PDF we sent. Files must be PRIVATE (only the logged-in owner can open them).
- **Dashboard**: who owes what this month, next due dates, total received per month/year.
- Nice later: generate the invoice PDF from the payment (today this is a Python script,
  `client-one-ecommerce-simple/private/make_invoice_INV-20261015-001.py`), and email/WhatsApp
  reminders.

## What to copy from the Gary store

| Need | Copy from `client-one-ecommerce-simple` |
| --- | --- |
| Admin hidden at a secret URL (`/admin` gives 404) | `src/proxy.ts` (`ADMIN_PATH` rewrite), `src/lib/admin.ts` (`requireAdmin`, `adminHref`) |
| Login + admin check | Supabase Auth + `is_admin()` in `supabase/migrations/0001_init.sql` |
| Admin layout, menu, form helpers | `src/components/admin/shell.tsx`, `src/components/admin/ui.tsx` (`useFormAction` keeps values on errors) |
| Private receipt uploads | `receipts` bucket (private, admin-read policies) in `0001_init.sql`; upload form `src/app/(store)/order/[orderNumber]/receipt-form.tsx`; upload button `src/components/admin/image-upload.tsx` |

## Things to decide first

- **Database** (decided 2026-10-25): share the `pvg-store` Supabase project (it's in the
  owner's account; saves cost and avoids juggling DBs), but kept apart from the store:
  - tables in their own `jpbc` schema. It is exposed to the API, so access relies on RLS
    against `jpbc.admins`;
  - own `jpbc.admins` table holding only the owner's user. NEVER reuse the store's
    `public.is_admin()`, because Gary is a store admin and could read the data with it;
  - own private `jpbc-receipts` bucket, policies checked against `jpbc.admins`;
  - keep it easy to move `jpbc` into its own project later if needed.
- **Next version**: resolved. This site was upgraded to Next 16 on 2026-10-26, the same
  version as the Gary store (both use `proxy.ts`).
- **Privacy**: client details and receipts are personal data (PDPA). Keep the bucket private,
  never put IC numbers in it, and keep the admin path out of the code and the sitemap/robots.
- **Backups**: a daily backup like the Gary store's GitHub Action, since this becomes the
  record of who paid.
- Existing records to import: `client-one-ecommerce-simple/client-records/`
  (invoice `INV-20261015-001.pdf`, Shinjiru domain invoice, signed agreement/plan PDFs).
