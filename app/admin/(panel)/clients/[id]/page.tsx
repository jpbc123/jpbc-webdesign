import Link from "next/link";
import { notFound } from "next/navigation";
import { AttachReceipt } from "@/components/admin/attach-receipt";
import { ClientForm } from "@/components/admin/client-form";
import { PaymentForm } from "@/components/admin/payment-form";
import { ConfirmButton } from "@/components/admin/ui";
import { deleteClient } from "@/app/admin/_actions/clients";
import { deletePayment } from "@/app/admin/_actions/payments";
import { adminHref, requireOwner } from "@/lib/admin";
import { RECEIPTS_BUCKET } from "@/lib/supabase/browser";
import { dateLabel, monthLabel, nextUnpaidMonth, rm, todayKL, unpaidMonths, type Client, type Payment } from "@/lib/billing";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string }> };

export default async function ClientPage({ params, searchParams }: Props) {
  const [{ id }, { error }] = await Promise.all([params, searchParams]);
  const { supabase } = await requireOwner();

  const [{ data: client }, { data: rows }] = await Promise.all([
    supabase.from("clients").select("*").eq("id", id).maybeSingle(),
    supabase.from("payments").select("*").eq("client_id", id).order("paid_on", { ascending: false }),
  ]);
  if (!client) notFound();
  const c = client as Client;
  const payments = (rows ?? []) as Payment[];
  const today = todayKL();
  const owed = unpaidMonths(c, payments, today);

  // Short-lived links to the private proofs; the bucket policy checks the owner.
  const paths = payments.map((p) => p.receipt_path).filter((p): p is string => Boolean(p));
  const { data: signed } = paths.length
    ? await supabase.storage.from(RECEIPTS_BUCKET).createSignedUrls(paths, 60 * 30)
    : { data: [] };
  const receiptUrl = new Map<string, string>();
  for (const s of signed ?? []) if (s.path && s.signedUrl) receiptUrl.set(s.path, s.signedUrl);

  return (
    <div className="space-y-8">
      <div>
        <Link href={adminHref("/clients")} className="text-sm font-semibold text-accent-text hover:underline">
          ← Clients
        </Link>
        <h1 className="display mt-3 text-3xl text-ink">{c.business_name}</h1>
        {c.site_url && (
          <a href={c.site_url} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-sm text-accent-text hover:underline">
            {c.site_url.replace(/^https?:\/\//, "")} ↗
          </a>
        )}
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
        <h2 className="text-lg font-bold text-ink">Payments</h2>
        {payments.length === 0 ? (
          <p className="text-sm text-muted">No payments recorded yet.</p>
        ) : (
          <div className="card overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-line text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Paid on</th>
                  <th className="px-4 py-3 font-semibold">Amount</th>
                  <th className="px-4 py-3 font-semibold">Covers</th>
                  <th className="px-4 py-3 font-semibold">Method / invoice</th>
                  <th className="px-4 py-3 font-semibold">Proof</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {payments.map((p) => (
                  <tr key={p.id} className="align-top">
                    <td className="px-4 py-3 text-ink">{dateLabel(p.paid_on)}</td>
                    <td className="px-4 py-3 font-bold text-ink">{rm(p.amount)}</td>
                    <td className="px-4 py-3 text-muted">{p.months.length ? p.months.map(monthLabel).join(", ") : "One-off"}</td>
                    <td className="px-4 py-3 text-muted">
                      {[p.method, p.invoice_no].filter(Boolean).join(" · ") || "—"}
                      {p.notes && <span className="block text-xs">{p.notes}</span>}
                    </td>
                    <td className="space-x-3 whitespace-nowrap px-4 py-3">
                      {p.receipt_path && receiptUrl.get(p.receipt_path) && (
                        <a href={receiptUrl.get(p.receipt_path)} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-accent-text hover:underline">
                          View
                        </a>
                      )}
                      <AttachReceipt clientId={c.id} paymentId={p.id} label={p.receipt_path ? "Replace" : "Add proof"} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <ConfirmButton action={deletePayment.bind(null, p.id)} message={`Delete the ${rm(p.amount)} payment from ${dateLabel(p.paid_on)}?`}>
                        Delete
                      </ConfirmButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <PaymentForm clientId={c.id} defaultAmount={c.monthly_fee} defaultFromMonth={nextUnpaidMonth(c, payments, today)} today={today} />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-ink">Details</h2>
        <ClientForm client={c} />
        <ConfirmButton action={deleteClient.bind(null, c.id)} message={`Delete ${c.business_name}? This can't be undone.`}>
          Delete client
        </ConfirmButton>
      </section>
    </div>
  );
}
