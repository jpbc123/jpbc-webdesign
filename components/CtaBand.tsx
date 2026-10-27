import Link from "next/link";
import WhatsAppButton from "./WhatsAppButton";
import LightsOnInView from "./LightsOnInView";
import type { Market } from "@/config/markets/types";
import { mpath } from "@/lib/market";

const LAMPS = [12, 31, 50, 69, 88];

/**
 * Final CTA at the bottom of most pages. Light mode: one rounded blue panel.
 * Dark mode: the same panel becomes a roadside billboard, with spotlights that
 * flicker on when it scrolls into view, posts, and a hill that runs into the
 * footer (styles under "Billboard" in globals.css).
 */
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
    <section className="billboard mt-20">
      <LightsOnInView className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="billboard-board rounded-3xl bg-accent px-6 py-14 text-center text-on-accent sm:px-14">
          <div className="relative">
            <h2 className="display mx-auto max-w-3xl text-3xl sm:text-4xl">{heading}</h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-lg opacity-85">{sub ?? market.voice.ctaSub}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <WhatsAppButton market={market} message={waMessage} variant="inverse" />
              <Link href={mpath(market, "/get-started")} className="btn btn-outline-inverse">
                Get started online
              </Link>
            </div>
          </div>
        </div>
        <div className="billboard-stand hidden dark:block" aria-hidden>
          <span className="billboard-post" style={{ left: "24%" }} />
          <span className="billboard-post" style={{ left: "76%" }} />
          <span className="billboard-catwalk" />
          {LAMPS.map((x, i) => (
            <span key={x} className="billboard-lamp" style={{ left: `${x}%`, animationDelay: `${i * 0.12}s` }} />
          ))}
        </div>
      </LightsOnInView>
      <svg className="billboard-hill hidden dark:block" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden>
        <path d="M0 120V70C260 20 520 4 760 10s520 34 680 64v46z" />
      </svg>
    </section>
  );
}
