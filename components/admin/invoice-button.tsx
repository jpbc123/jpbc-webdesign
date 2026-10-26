"use client";

import { useTransition } from "react";
import { createInvoice } from "@/app/admin/_actions/invoices";

/** "Create invoice" / "Remake" on a payment row: builds the PDF on the server. */
export function InvoiceButton({ paymentId, remake }: { paymentId: string; remake: boolean }) {
  const [pending, startTransition] = useTransition();

  function onClick() {
    if (remake && !confirm("Remake this invoice with the current client and seller details? The old PDF is replaced.")) return;
    startTransition(async () => {
      const error = await createInvoice(paymentId);
      if (error) alert(error);
    });
  }

  return (
    <button
      type="button"
      disabled={pending}
      onClick={onClick}
      className="text-sm font-semibold text-accent-text hover:underline disabled:opacity-60"
    >
      {pending ? "Making…" : remake ? "Remake" : "Create invoice"}
    </button>
  );
}
