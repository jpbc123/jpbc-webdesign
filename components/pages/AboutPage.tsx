import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import WhatsAppButton from "@/components/WhatsAppButton";
import type { Market } from "@/config/markets/types";
import { marketMetadata } from "@/lib/seo";

export function aboutMetadata(market: Market): Metadata {
  return marketMetadata(market, "about", "/about");
}

export default function AboutPage({ market }: { market: Market }) {
  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pb-4 pt-16">
        <h1 className="display text-5xl text-ink sm:text-6xl">{market.voice.aboutH1}</h1>
        {/* Answer-first for SEO/AEO */}
        <p className="mt-6 text-lg text-muted">{market.voice.aboutAnswerFirst}</p>
      </section>

      <section className="mx-auto max-w-3xl space-y-6 px-6 py-10 text-muted">
        {market.voice.aboutStory.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
        <div className="rounded-3xl border-2 border-accent/40 bg-surface p-8">
          <h2 className="display text-2xl text-ink">What we believe</h2>
          <ul className="mt-4 space-y-3">
            {market.voice.aboutBeliefs.map((belief) => (
              <li key={belief.title}>
                <strong className="text-ink">{belief.title}</strong> {belief.body}
              </li>
            ))}
          </ul>
        </div>
        <div className="text-center">
          <WhatsAppButton market={market} message="Hi JPBC! I'd like to chat about a website for my business.">
            Say hello on WhatsApp
          </WhatsAppButton>
        </div>
      </section>

      <CtaBand market={market} />
    </>
  );
}
