import type { Metadata } from "next";
import WorkGrid from "./WorkGrid";
import CtaBand from "@/components/CtaBand";
import { industryDemos } from "@/data/industryDemos";
import { waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Work - Websites for Malaysian Small Businesses",
  description:
    "Hand-coded websites and web apps for Malaysian businesses — aircon services, klinik, restoran, renovation, tuition centres, workshops, and more. Every project is live, plus industry demo sites for dental clinics and gyms.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-4 pt-16">
        <h1 className="display text-5xl text-ink sm:text-6xl">Our work</h1>
        {/* Answer-first for SEO/AEO */}
        <p className="mt-4 max-w-3xl text-lg text-muted">
          What kind of websites does JPBC build? Fast, hand-coded sites and web apps for everyday Malaysian
          businesses — aircon teams, klinik, restoran, renovation contractors, tuition centres, workshops, travel
          agencies. Every project below is live; click through and see for yourself.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <WorkGrid />
      </section>

      {/* ---------- WEBSITES BY INDUSTRY (live demo sites, not client work) ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="display text-4xl text-ink sm:text-5xl">Websites by Industry</h2>
        <p className="mt-3 max-w-3xl text-muted">
          Live demo sites showing exactly what we build for your type of business. Explore one, then imagine it with
          your name on it — we&apos;ll build your free preview to prove it.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industryDemos.map((d) => (
            <a
              key={d.slug}
              href={d.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-card group rounded-3xl border border-line bg-surface p-6 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-lg"
            >
              <div className="flex justify-end">
                <span className="rounded-full border border-accent/40 px-3 py-1 text-xs font-semibold text-accent">
                  Live demo
                </span>
              </div>
              <h3 className="display mt-4 text-xl text-ink">{d.name}</h3>
              <p className="mt-3 text-sm text-muted">{d.blurb}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-accent">Explore the demo →</span>
            </a>
          ))}
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-accent/50 p-6 text-center transition-all hover:-translate-y-1 hover:border-accent"
          >
            <span className="display text-xl text-ink">Your industry next? →</span>
            <p className="mt-2 text-sm text-muted">WhatsApp us and we&apos;ll build your free preview.</p>
          </a>
        </div>
      </section>

      <CtaBand
        heading="Want yours on this page?"
        sub="Every project here started with one WhatsApp message."
      />
    </>
  );
}
