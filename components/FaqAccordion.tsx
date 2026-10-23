import type { Faq } from "@/data/faqs";

/** Zero-JS accordion using native <details>/<summary> — keyboard accessible for free. */
export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="board divide-y divide-line bg-surface">
      {faqs.map((f) => (
        <details key={f.q} className="group px-5 py-4 sm:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-ink [&::-webkit-details-marker]:hidden">
            {f.q}
            <span aria-hidden className="sign flex h-7 w-7 shrink-0 items-center justify-center rounded-tag bg-sign-yellow text-sign-yellow-ink transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 max-w-prose text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
