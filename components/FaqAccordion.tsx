import type { Faq } from "@/data/faqs";

/** Zero-JS accordion using native <details>/<summary> — keyboard accessible for free. */
export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="glow-card divide-y divide-line rounded-3xl border border-line bg-surface">
      {faqs.map((f) => (
        <details key={f.q} className="group px-6 py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {f.q}
            <span aria-hidden className="text-accent transition-transform group-open:rotate-45">＋</span>
          </summary>
          <p className="mt-3 text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
