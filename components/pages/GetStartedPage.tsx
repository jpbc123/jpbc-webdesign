import type { Metadata } from "next";
import IntakeForm from "@/components/IntakeForm";
import type { Market } from "@/config/markets/types";
import { marketMetadata } from "@/lib/seo";

export function getStartedMetadata(market: Market): Metadata {
  return marketMetadata(market, "getStarted", "/get-started");
}

export default function GetStartedPage({ market }: { market: Market }) {
  return (
    <section className="mx-auto max-w-2xl px-6 pb-20 pt-16">
      <h1 className="display text-5xl text-ink sm:text-6xl">Let&apos;s get started</h1>
      <p className="mt-4 text-lg text-muted">
        Five quick questions — takes about 60 seconds. We&apos;ll reply on WhatsApp with a plan and a straight answer
        on price.
      </p>
      <div className="mt-10">
        <IntakeForm market={market} />
      </div>
    </section>
  );
}
