import Link from "next/link";
import { notFound } from "next/navigation";
import { RecordPaymentButton } from "@/components/admin/payment-form";
import { PaymentsTable } from "@/components/admin/payments-table";
import { adminHref, requireOwner } from "@/lib/admin";
import { dateLabel, monthLabel, nextUnpaidMonth, rm, todayKL, unpaidMonths, type Client, type Payment } from "@/lib/billing";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string }> };

/** One client's record, read-only: details and payment history. Editing lives on /edit. */
export default async function ClientPage({ params, searchParams }: Props) {
  const [{ id }, { error }] = await Promise.all([params, searchParams]);
  const { supabase } = await requireOwner();

  const [{ data: client }, { data: rows }] = await Promise.all([
    supabase.from("clients").select("*").eq("id", id).maybeSingle(),
    supabase.from("payments").select("*").eq("client_id", id).order("issued_on", { ascending: false }),
  ]);
  if (!client) notFound();
  const c = client as Client;
  const payments = (rows ?? []) as Payment[];
  const today = todayKL();
  const owed = unpaidMonths(c, payments, today);

  const details: [string, React.ReactNode][] = [
    ["Contact person", c.contact_name],
    ["Phone / WhatsApp", c.phone],
    ["Email", c.email],
    ["SSM no.", c.ssm_no],
    ["Status", c.status[0].toUpperCase() + c.status.slice(1)],
    ["Plan", c.plan],
    ["Monthly fee", c.monthly_fee ? rm(c.monthly_fee) : null],
    ["First billed month", c.billing_start ? monthLabel(c.billing_start) : null],
    ["Agreement signed on", c.agreement_date ? dateLabel(c.agreement_date) : null],
    [
      "Live site",
      c.site_url && (
        <a href={c.site_url} target="_blank" rel="noopener noreferrer" className="text-accent-text hover:underline">
          {c.site_url.replace(/^https?:\/\//, "")} ↗
        </a>
      ),
    ],
    ["Domain(s)", c.domains],
    ["Hosting", c.hosting],
  ];
  const longDetails: [string, string | null][] = [
    ["Billing address", c.address],
    ["Invoice line (monthly)", c.invoice_item],
    ["Notes", c.notes],
  ];

  return (
    <div className="space-y-8">
      <div>
        <Link href={adminHref("/clients")} className="text-sm font-semibold text-accent-text hover:underline">
          ← Clients
        </Link>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <h1 className="display text-3xl text-ink">{c.business_name}</h1>
          <div className="flex flex-wrap gap-2">
            <Link href={adminHref(`/clients/${c.id}/edit`)} className="btn btn-secondary">
              Edit client
            </Link>
            <RecordPaymentButton
              clients={[{ id: c.id, business_name: c.business_name, monthly_fee: c.monthly_fee, next_from: nextUnpaidMonth(c, payments, today) }]}
              today={today}
            />
          </div>
        </div>
      </div>

      {error === "has-payments" && (
        <p role="alert" className="rounded-xl bg-[#fef3c7] p-4 text-sm text-[#92400e]">
          This client has payments on record, so it can&apos;t be deleted. Set the status to &ldquo;Ended&rdquo; instead.
        </p>
      )}

      {owed.length > 0 && (
        <p className="rounded-xl bg-[#fee2e2] p-4 text-sm font-semibold text-[#991b1b]">
          Owes {rm(owed.length * Number(c.monthly_fee))} for {owed.map(monthLabel).join(", ")}.
        </p>
      )}

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-ink">Details</h2>
        <dl className="card grid gap-x-6 gap-y-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
          {details.map(([k, v]) => (
            <div key={k}>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{k}</dt>
              <dd className="mt-0.5 break-words text-ink">{v || <span className="text-muted">—</span>}</dd>
            </div>
          ))}
          {longDetails.map(([k, v]) => (
            <div key={k} className="sm:col-span-2 lg:col-span-3">
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{k}</dt>
              <dd className="mt-0.5 whitespace-pre-line break-words text-ink">{v || <span className="text-muted">—</span>}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-ink">Payments</h2>
        {payments.length === 0 ? (
          <p className="text-sm text-muted">No payments recorded yet.</p>
        ) : (
          <PaymentsTable payments={payments} today={today} />
        )}
      </section>
    </div>
  );
}
