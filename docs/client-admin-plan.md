# Plan: private client admin (idea, not started)

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

- **Database**: this site has none yet (it's a static Next 15 site on Vercel). It needs its
  own NEW Supabase project. Never reuse a client's project (e.g. `pvg-store`); that's the
  client's data.
- **Next version**: this site is on Next 15, the Gary store on Next 16. Next 15 calls the
  file `middleware.ts` (Next 16 renamed it `proxy.ts`), so copied code needs small changes,
  or upgrade first.
- **Privacy**: client details and receipts are personal data (PDPA). Keep the bucket private,
  never put IC numbers in it, and keep the admin path out of the code and the sitemap/robots.
- **Backups**: a daily backup like the Gary store's GitHub Action, since this becomes the
  record of who paid.
- Existing records to import: `client-one-ecommerce-simple/client-records/`
  (invoice `INV-20261015-001.pdf`, Shinjiru domain invoice, signed agreement/plan PDFs).
