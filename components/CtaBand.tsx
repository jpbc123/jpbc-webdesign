import Link from "next/link";
import WhatsAppButton from "./WhatsAppButton";
import type { Market } from "@/config/markets/types";
import { mpath } from "@/lib/market";

/** Final CTA band used at the bottom of most pages. */
export default function CtaBand({
  market,
  heading = "Ready for a website that actually works?",
  sub,
  waMessage,
}: {
  market: Market;
  heading?: string;
  sub?: string;
  waMessage?: string;
}) {
  return (
    <section className="starfield relative mx-3 mt-20 overflow-hidden rounded-[2.5rem] bg-hero px-6 py-16 text-center text-hero-ink sm:mx-6">
      <div className="relative mx-auto max-w-2xl">
        <h2 className="display text-4xl sm:text-5xl">{heading}</h2>
        <p className="mt-4 text-lg text-hero-muted">{sub ?? market.voice.ctaSub}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <WhatsAppButton market={market} message={waMessage} />
          <Link
            href={mpath(market, "/get-started")}
            className="inline-flex items-center rounded-full border-2 border-hero-ink/40 px-6 py-3 font-semibold text-hero-ink transition-colors hover:border-accent hover:text-accent"
          >
            Get started online
          </Link>
        </div>
      </div>
    </section>
  );
}
