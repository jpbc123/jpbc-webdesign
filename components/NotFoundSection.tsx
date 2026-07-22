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
      <p className="display text-7xl text-accent">404</p>
      <h1 className="display mt-4 text-4xl text-ink">{copy.heading}</h1>
      <p className="mt-4 text-muted">{copy.body}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href={mpath(market, "/")}
          className="rounded-full bg-accent px-6 py-3 font-semibold text-accent-ink"
        >
          {copy.homeCta}
        </Link>
        <WhatsAppButton
          market={market}
          variant="outline"
          className="!border-ink/20 !text-ink"
          message={copy.waMessage}
        >
          {copy.reportCta}
        </WhatsAppButton>
      </div>
    </section>
  );
}
