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
        <p className="eyebrow mb-3">About us</p>
        <h1 className="display text-[2.6rem] text-ink sm:text-5xl lg:text-6xl">{market.voice.aboutH1}</h1>
        {/* Answer-first for SEO/AEO */}
        <p className="mt-6 text-lg text-muted">{market.voice.aboutAnswerFirst}</p>
      </section>

      <section className="mx-auto max-w-3xl space-y-6 px-6 pb-10 pt-2 text-muted">
        {market.voice.aboutStory.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
        <div className="pt-6">
          <h2 className="display text-3xl text-ink">What we believe</h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2">
            {market.voice.aboutBeliefs.map((belief, i) => (
              <li
                key={belief.title}
                className={i === 0 ? "rounded-2xl bg-accent-soft p-6" : "card p-6"}
              >
                <strong className="block text-lg font-bold text-ink">{belief.title}</strong>
                <span className="mt-1 block text-sm">{belief.body}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-center">
          <WhatsAppButton market={market} message="Hi JPBC Web Designs, I'd like to chat about a website for my business.">
            Say hello on WhatsApp
          </WhatsAppButton>
        </div>
      </section>

      <CtaBand market={market} />
    </>
  );
}
