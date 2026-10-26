import Link from "next/link";
import WhatsAppButton from "./WhatsAppButton";
import type { Market } from "@/config/markets/types";
import { mpath } from "@/lib/market";

/** Final CTA at the bottom of most pages: one rounded blue panel. */
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
    <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
      <div className="rounded-3xl bg-accent px-6 py-14 text-center text-on-accent sm:px-14">
        <h2 className="display mx-auto max-w-3xl text-3xl sm:text-4xl">{heading}</h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-lg opacity-85">{sub ?? market.voice.ctaSub}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <WhatsAppButton market={market} message={waMessage} variant="inverse" />
          <Link href={mpath(market, "/get-started")} className="btn btn-outline-inverse">
            Get started online
          </Link>
        </div>
      </div>
    </section>
  );
}
