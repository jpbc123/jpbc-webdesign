import Link from "next/link";
import WhatsAppButton from "./WhatsAppButton";
import type { Market } from "@/config/markets/types";
import { mpath } from "@/lib/market";

/** Final CTA at the bottom of most pages: one big red signboard. */
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
      <div className="board screws bg-sign-red px-6 py-14 text-center text-sign-red-ink [--sign-glow:var(--sign-red-ink)] sm:px-12">
        <h2 className="display sign-lit mx-auto max-w-3xl text-balance text-4xl sm:text-6xl">{heading}</h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-[#fff3dc]">{sub ?? market.voice.ctaSub}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <WhatsAppButton market={market} message={waMessage} variant="yellow" />
          <Link href={mpath(market, "/get-started")} className="btn btn-on-sign">
            Get started online
          </Link>
        </div>
      </div>
    </section>
  );
}
