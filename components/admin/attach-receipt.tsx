"use client";

import { useRef, useState } from "react";
import { attachReceipt } from "@/app/admin/_actions/payments";
import { uploadReceipt } from "./receipt-upload";

/** "Add proof" / "Replace" link on a payment row: pick a file, it uploads and attaches. */
export function AttachReceipt({ clientId, paymentId, label }: { clientId: string; paymentId: string; label: string }) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      await attachReceipt(paymentId, await uploadReceipt(clientId, file));
    } catch (err) {
      alert(`Upload failed: ${(err as Error).message}`);
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  return (
    <>
      <input ref={input} type="file" accept="image/*,application/pdf" className="hidden" onChange={onChange} />
      <button
        type="button"
        disabled={busy}
        onClick={() => input.current?.click()}
        className="text-sm font-semibold text-accent-text hover:underline disabled:opacity-60"
      >
        {busy ? "Uploading…" : label}
      </button>
    </>
  );
}
