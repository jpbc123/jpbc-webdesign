import Link from "next/link";
import { AttachReceipt } from "./attach-receipt";
import { InvoiceButton } from "./invoice-button";
import { MarkPaidButton } from "./payment-form";
import { ConfirmButton } from "./ui";
import { deletePayment } from "@/app/admin/_actions/payments";
import { adminHref, requireOwner } from "@/lib/admin";
import { RECEIPTS_BUCKET } from "@/lib/supabase/browser";
import { dateLabel, monthLabel, rm, type Payment } from "@/lib/billing";

const linkCls = "text-sm font-semibold text-accent-text hover:underline";

/**
 * Payment records with their documents: proof, invoice and official receipt.
 * Pass `names` to add a client column (the Payments page).
 */
export async function PaymentsTable({ payments, today, names }: { payments: Payment[]; today: string; names?: Map<string, string> }) {
  const { supabase } = await requireOwner();

  // Short-lived links to the private proofs and PDFs; the bucket policy checks the owner.
  const paths = payments
    .flatMap((p) => [p.receipt_path, p.invoice_path, p.receipt_pdf_path])
    .filter((p): p is string => Boolean(p));
  const { data: signed } = paths.length ? await supabase.storage.from(RECEIPTS_BUCKET).createSignedUrls(paths, 60 * 30) : { data: [] };
  const fileUrl = new Map<string, string>();
  for (const s of signed ?? []) if (s.path && s.signedUrl) fileUrl.set(s.path, s.signedUrl);
  const fileLink = (path: string | null, text: string) =>
    path && fileUrl.get(path) ? (
      <a href={fileUrl.get(path)} target="_blank" rel="noopener noreferrer" className={linkCls}>
        {text}
      </a>
    ) : null;

  return (
    <div className="card overflow-x-auto">
      <table className="w-full min-w-[880px] text-left text-sm">
        <thead className="border-b border-line text-muted">
          <tr>
            {names && <th className="px-4 py-3 font-semibold">Client</th>}
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 font-semibold">Amount</th>
            <th className="px-4 py-3 font-semibold">Covers</th>
            <th className="px-4 py-3 font-semibold">Proof</th>
            <th className="px-4 py-3 font-semibold">Invoice</th>
            <th className="px-4 py-3 font-semibold">Official receipt</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {payments.map((p) => {
            const overdue = !p.paid_on && p.due_on && p.due_on < today;
            return (
              <tr key={p.id} className="align-top">
                {names && (
                  <td className="px-4 py-3">
                    <Link href={adminHref(`/clients/${p.client_id}`)} className="font-semibold text-ink hover:text-accent-text">
                      {names.get(p.client_id) ?? "Unknown client"}
                    </Link>
                  </td>
                )}
                <td className="px-4 py-3">
                  {p.paid_on ? (
                    <>
                      <span className="block text-ink">Paid {dateLabel(p.paid_on)}</span>
                      {p.method && <span className="block text-xs text-muted">{p.method}</span>}
                    </>
                  ) : (
                    <>
                      <span className={`block font-semibold ${overdue ? "text-red-600 dark:text-red-400" : "text-[#b45309] dark:text-[#fbbf24]"}`}>
                        {overdue ? "Overdue" : "Awaiting payment"}
                      </span>
                      <span className="block text-xs text-muted">
                        Invoiced {dateLabel(p.issued_on)}
                        {p.due_on ? ` · due ${dateLabel(p.due_on)}` : ""}
                      </span>
                    </>
                  )}
                  {p.notes && <span className="block text-xs text-muted">{p.notes}</span>}
                </td>
                <td className="px-4 py-3 font-bold text-ink">{rm(p.amount)}</td>
                <td className="px-4 py-3 text-muted">{p.months.length ? p.months.map(monthLabel).join(", ") : "One-off"}</td>
                <td className="space-x-3 whitespace-nowrap px-4 py-3">
                  {fileLink(p.receipt_path, "View")}
                  <AttachReceipt clientId={p.client_id} paymentId={p.id} label={p.receipt_path ? "Replace" : "Add proof"} />
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  {p.invoice_no && <span className="block text-xs text-muted">{p.invoice_no}</span>}
                  <span className="space-x-3">
                    {fileLink(p.invoice_path, "PDF")}
                    <InvoiceButton paymentId={p.id} kind="invoice" remake={Boolean(p.invoice_path)} />
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  {p.paid_on ? (
                    <>
                      {p.receipt_no && <span className="block text-xs text-muted">{p.receipt_no}</span>}
                      <span className="space-x-3">
                        {fileLink(p.receipt_pdf_path, "PDF")}
                        <InvoiceButton paymentId={p.id} kind="receipt" remake={Boolean(p.receipt_pdf_path)} />
                      </span>
                    </>
                  ) : (
                    <MarkPaidButton paymentId={p.id} clientId={p.client_id} today={today} />
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <ConfirmButton
                    action={deletePayment.bind(null, p.id)}
                    message={`Delete the ${rm(p.amount)} record from ${dateLabel(p.paid_on ?? p.issued_on)}?`}
                  >
                    Delete
                  </ConfirmButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
