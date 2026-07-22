import type { Metadata } from "next";
import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton";
import DeviceMockup from "@/components/DeviceMockup";
import CurveDivider from "@/components/CurveDivider";
import NightSilhouette from "@/components/NightSilhouette";
import NightSkyFx from "@/components/NightSkyFx";
import CtaBand from "@/components/CtaBand";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import { portfolioFor } from "@/data/portfolio";
import { industryDemosFor } from "@/data/industryDemos";
import { allFaqs } from "@/data/faqs";
import type { Market } from "@/config/markets/types";
import { mpath, price } from "@/lib/market";
import { marketMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

// One home page for every market — all market-specific values come from the
// market config passed in by the route.

export function homeMetadata(market: Market): Metadata {
  const base = marketMetadata(market, "home", "/");
  return {
    ...base,
    // The home title already names the studio — keep it out of the root
    // layout's "%s | JPBC Web Designs" template.
    title: { absolute: market.meta.home.title },
    openGraph: {
      title: market.meta.home.title,
      description: `${price(market, market.pricing.setup)} down, ${price(market, market.pricing.monthly)}/month. Hand-coded websites that load in under 1 second.`,
      url: mpath(market, "/"),
    },
  };
}

const steps = [
  { n: "1", title: "Chat on WhatsApp", body: "Tell us about your business. Five minutes, no jargon, no sales pitch." },
  { n: "2", title: "We design, you approve", body: "Design draft in 2–3 days. You tell us what to tweak until you love it." },
  { n: "3", title: "We build it", body: "Hand-coded, mobile-first, tested on real phones. You don't lift a finger." },
  { n: "4", title: "Live in 7 days", body: "Domain, hosting, SSL — all sorted. Your site is live and loading in under a second." },
];

export default function HomePage({ market }: { market: Market }) {
  const monthly = price(market, market.pricing.monthly);
  const setup = price(market, market.pricing.setup);
  const lumpSum = price(market, market.pricing.lumpSum);
  const care = price(market, market.pricing.lumpSumCare);
  const work = portfolioFor(market);
  const faqs = allFaqs(market);

  const whatWeDo = [
    { title: "Web Design", body: market.voice.homeWhatWeDoDesign, href: "/services/web-design" },
    {
      title: "Development",
      body: "Hand-coded static sites. No WordPress, no page builders, no plugins to break or hack.",
      href: "/services/web-design",
    },
    {
      title: "Google Business Profile",
      body: "Claimed, verified, and optimised so you show up in Maps and the local 3-pack.",
      href: "/services/google-business-profile",
    },
    { title: "Local SEO", body: market.voice.homeWhatWeDoSeo, href: "/services/seo" },
  ];

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: "JPBC Web Designs",
    url: absoluteUrl(mpath(market, "/")),
    telephone: `+${market.contact.whatsapp}`,
    description: market.voice.businessDescription,
    ...(market.schema.address
      ? {
          address: {
            "@type": "PostalAddress",
            addressLocality: market.schema.address.locality,
            addressRegion: market.schema.address.region,
            addressCountry: market.schema.address.country,
          },
        }
      : {}),
    areaServed: market.schema.areaServed.names.map((name) => ({
      "@type": market.schema.areaServed.type,
      name,
    })),
    priceRange: `${market.currency.symbol}${market.pricing.monthly} - ${market.currency.symbol}${market.pricing.lumpSum}`,
    makesOffer: [
      {
        "@type": "Offer",
        name: "Monthly website plan",
        price: String(market.pricing.monthly),
        priceCurrency: market.currency.code,
        description: `Custom hand-coded 5-page website. ${setup} down, ${monthly}/month including domain, hosting, SSL, unlimited edits.`,
      },
      {
        "@type": "Offer",
        name: "Lump sum website",
        price: String(market.pricing.lumpSum),
        priceCurrency: market.currency.code,
        description: `Custom hand-coded 5-page website, owned outright. From ${lumpSum} + ${care}/month hosting & care.`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={localBusinessJsonLd} />

      {/* ---------- HERO ---------- */}
      <section className="starfield under-header relative overflow-hidden bg-hero pb-4 pt-32 text-hero-ink">
        <NightSilhouette />
        <NightSkyFx />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <p className="mb-4 inline-block rounded-full border border-accent/40 px-4 py-1 text-sm font-semibold text-accent">
              {market.heroCopy.badge}
            </p>
            <h1 className="display text-5xl sm:text-6xl lg:text-7xl">
              {market.heroCopy.headlineLead}
              <span className="text-accent">{market.heroCopy.headlineHighlight}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-hero-muted">{market.heroCopy.subheadline}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={mpath(market, "/get-started")}
                className="inline-flex items-center rounded-full bg-accent px-6 py-3 font-semibold text-accent-ink glow-accent transition-transform hover:-translate-y-0.5"
              >
                Get started
              </Link>
              <Link
                href={mpath(market, "/pricing")}
                className="inline-flex items-center rounded-full border-2 border-hero-ink/40 px-6 py-3 font-semibold text-hero-ink transition-colors hover:border-accent hover:text-accent"
              >
                See pricing
              </Link>
            </div>
          </div>
          <DeviceMockup />
        </div>
        {/* Sweeping curve into the light content below (relative: paints over the silhouette) */}
        <CurveDivider className="relative mt-16 text-bg" />
      </section>

      {/* ---------- WHAT WE DO ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="display text-4xl text-ink sm:text-5xl">What we do</h2>
        <p className="mt-3 max-w-2xl text-muted">
          One studio, four things — done properly. Everything your business needs to get found and get customers online.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whatWeDo.map((item) =>
            market.pages.services ? (
              <Link
                key={item.title}
                href={mpath(market, item.href)}
                className="glow-card group rounded-3xl border border-line bg-surface p-6 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-lg"
              >
                <h3 className="display text-xl text-ink">{item.title}</h3>
                <p className="mt-3 text-sm text-muted">{item.body}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-accent">Learn more →</span>
              </Link>
            ) : (
              <div key={item.title} className="glow-card rounded-3xl border border-line bg-surface p-6">
                <h3 className="display text-xl text-ink">{item.title}</h3>
                <p className="mt-3 text-sm text-muted">{item.body}</p>
              </div>
            )
          )}
        </div>
      </section>

      {/* ---------- WHY HAND-CODED ---------- */}
      <section className="bg-surface-2 py-20 dark:bg-surface">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="display text-4xl text-ink sm:text-5xl">Why hand-coded beats WordPress</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl bg-surface p-8 dark:bg-surface-2">
              <p className="display text-5xl text-accent">&lt;1s</p>
              <h3 className="mt-3 text-lg font-bold text-ink">Loads before they blink</h3>
              <p className="mt-2 text-sm text-muted">
                Our static sites load in under a second. The average WordPress site takes 3–5 seconds — and half your
                visitors give up by then. Speed is also a Google ranking factor.
              </p>
            </div>
            <div className="rounded-3xl bg-surface p-8 dark:bg-surface-2">
              <p className="display text-5xl text-accent">0</p>
              <h3 className="mt-3 text-lg font-bold text-ink">Nothing to hack</h3>
              <p className="mt-2 text-sm text-muted">
                Static files have no database, no admin login, no plugins with security holes. WordPress powers most of
                the web — and most of the hacked sites. Ours simply have no way in.
              </p>
            </div>
            <div className="rounded-3xl bg-surface p-8 dark:bg-surface-2">
              <p className="display text-5xl text-accent">✓</p>
              <h3 className="mt-3 text-lg font-bold text-ink">No plugin updates, ever</h3>
              <p className="mt-2 text-sm text-muted">
                No "please update 14 plugins" emails, no themes breaking after an update, no maintenance retainer. Your
                site just works — this month, next year, always.
              </p>
            </div>
          </div>
          <div className="mt-8 rounded-3xl border-2 border-dashed border-accent/50 p-6 text-center">
            <p className="font-semibold text-ink">
              Don&apos;t take our word for it — test your current site at{" "}
              <a
                href="https://pagespeed.web.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline"
              >
                pagespeed.web.dev
              </a>
              . If it scores under 90 on mobile, WhatsApp us the result and we&apos;ll show you what we&apos;d fix.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="display text-4xl text-ink sm:text-5xl">How it works</h2>
        <p className="mt-3 text-muted">From first WhatsApp to live website in about a week.</p>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="glow-card rounded-3xl border border-line bg-surface p-6">
              <span className="display flex h-12 w-12 items-center justify-center rounded-full bg-accent text-xl text-accent-ink">
                {s.n}
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- WORK GRID (client projects, or demo builds in newer markets) ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="display text-4xl text-ink sm:text-5xl">{market.voice.homeWorkHeading}</h2>
            <p className="mt-3 text-muted">{market.voice.homeWorkIntro}</p>
          </div>
          <Link href={mpath(market, "/work")} className="font-semibold text-accent hover:underline">
            See all work →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {work.length > 0
            ? work.slice(0, 6).map((p) => (
                <Link
                  key={p.slug}
                  href={mpath(market, "/work")}
                  className="glow-card group overflow-hidden rounded-3xl border border-line bg-surface transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-40">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={`Screenshot of the ${p.name} website`}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover object-top"
                      />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient}`} aria-hidden />
                    )}
                    <span className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
                      {p.industry}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-ink">{p.name}</h3>
                    <p className="mt-1 text-sm text-muted">
                      {p.location}
                      {p.loadTime && ` · loads in ${p.loadTime}`}
                    </p>
                  </div>
                </Link>
              ))
            : industryDemosFor(market).slice(0, 6).map((d) => (
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
        </div>
      </section>

      {/* ---------- PRICING TEASER ---------- */}
      <section className="starfield relative mx-3 mt-20 overflow-hidden rounded-[2.5rem] bg-hero px-6 py-16 text-hero-ink sm:mx-6">
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="display text-4xl sm:text-5xl">Simple, honest pricing</h2>
          <p className="mt-4 text-lg text-hero-muted">
            <span className="display text-3xl text-accent">
              {setup} down, {monthly}/month
            </span>
            <br />
            for a custom 5-page site — domain, hosting, SSL, and unlimited edits included. Prefer to own it outright?
            Lump sum from {lumpSum}.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={mpath(market, "/pricing")}
              className="inline-flex items-center rounded-full bg-accent px-6 py-3 font-semibold text-accent-ink glow-accent"
            >
              See full pricing
            </Link>
            <WhatsAppButton
              market={market}
              variant="outline"
              message="Hi JPBC! Can you tell me more about your website pricing?"
            >
              Ask us anything
            </WhatsAppButton>
          </div>
        </div>
      </section>

      {/* ---------- FAQ TEASER ---------- */}
      <section className="mx-auto max-w-3xl px-6 py-10">
        <h2 className="display text-center text-4xl text-ink sm:text-5xl">Quick questions</h2>
        <div className="mt-10">
          <FaqAccordion faqs={faqs.slice(0, 4)} />
        </div>
        <p className="mt-6 text-center">
          <Link href={mpath(market, "/faq")} className="font-semibold text-accent hover:underline">
            Read all {faqs.length} FAQs →
          </Link>
        </p>
      </section>

      {/* ---------- FINAL CTA ---------- */}
      <CtaBand market={market} />
    </>
  );
}
