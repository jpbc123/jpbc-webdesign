import Link from "next/link";
import WhatsAppButton from "./WhatsAppButton";
import type { Market } from "@/config/markets/types";
import { mpath } from "@/lib/market";

/**
 * The 404 body, wired to one market: its wording, its home link, its WhatsApp
 * number. Shared by both 404 routes so they stay identical —
 * app/not-found.tsx (root, Malaysia) and app/[market]/[...rest] (prefixed
 * markets). See those files for why there are two.
 */
export default function NotFoundSection({ market }: { market: Market }) {
  const copy = market.voice.notFound;
  return (
    <section className="mx-auto max-w-2xl px-6 py-24 text-center">
      {/* A shop sign hanging askew, one screw gone */}
      <p className="board sign sign-lit inline-block rotate-[-4deg] bg-sign-red px-8 py-5 text-7xl text-sign-red-ink [--sign-glow:var(--sign-red-ink)]">
        404
      </p>
      <h1 className="display mt-10 text-4xl text-ink">{copy.heading}</h1>
      <p className="mt-4 text-muted">{copy.body}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link href={mpath(market, "/")} className="btn btn-primary">
          {copy.homeCta}
        </Link>
        <WhatsAppButton market={market} variant="secondary" message={copy.waMessage}>
          {copy.reportCta}
        </WhatsAppButton>
      </div>
    </section>
  );
}
