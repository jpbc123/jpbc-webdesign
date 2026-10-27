"use client";

import { useTransition } from "react";
import { createDocument } from "@/app/admin/_actions/invoices";
import type { DocKind } from "@/lib/invoice-pdf";

const NAMES: Record<DocKind, string> = { invoice: "invoice", receipt: "receipt" };

/** "Create invoice" / "Create receipt" / "Remake" on a payment row: builds the PDF on the server. */
export function InvoiceButton({ paymentId, kind, remake }: { paymentId: string; kind: DocKind; remake: boolean }) {
  const [pending, startTransition] = useTransition();

  function onClick() {
    if (remake && !confirm(`Remake this ${NAMES[kind]} with the current client and seller details? The old PDF is replaced.`)) return;
    startTransition(async () => {
      const error = await createDocument(paymentId, kind);
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
      {pending ? "Making…" : remake ? "Remake" : `Create ${NAMES[kind]}`}
    </button>
  );
}
