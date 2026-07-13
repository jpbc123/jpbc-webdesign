import type { Metadata } from "next";
import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton";
import DeviceMockup from "@/components/DeviceMockup";
import CurveDivider from "@/components/CurveDivider";
import CtaBand from "@/components/CtaBand";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import { portfolio } from "@/data/portfolio";
import { allFaqs } from "@/data/faqs";
import { locations } from "@/data/locations";
import { SITE_URL, WHATSAPP_NUMBER } from "@/lib/site";

export const metadata: Metadata = {
  title: "JPBC Web Designs — Small Business Web Design, Malaysian Prices",
  description:
    "Hand-coded custom websites for Malaysian small businesses. RM0 down, RM179/month — domain, hosting, SSL, unlimited edits included. No WordPress, no RM10,000 agency quotes.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "JPBC Web Designs — Small Business Web Design, Malaysian Prices",
    description: "RM0 down, RM179/month. Hand-coded websites that load in under 1 second.",
    url: "/",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "JPBC Web Designs",
  url: SITE_URL,
  telephone: `+${WHATSAPP_NUMBER}`,
  description:
    "Web design studio in Petaling Jaya, Malaysia. Hand-coded custom websites for small businesses — RM0 down, RM179/month.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Petaling Jaya",
    addressRegion: "Selangor",
    addressCountry: "MY",
  },
  areaServed: locations.map((l) => ({ "@type": "City", name: l.name })),
  priceRange: "RM179 - RM3500",
  makesOffer: [
    {
      "@type": "Offer",
      name: "Monthly website plan",
      price: "179",
      priceCurrency: "MYR",
      description: "Custom hand-coded 5-page website. RM0 down, RM179/month including domain, hosting, SSL, unlimited edits.",
    },
    {
      "@type": "Offer",
      name: "Lump sum website",
      price: "3500",
      priceCurrency: "MYR",
      description: "Custom hand-coded 5-page website, owned outright. From RM3,500 + RM49/month hosting & care.",
    },
  ],
};

const whatWeDo = [
  {
    title: "Web Design",
    body: "Custom design around your business — your services, your customers, your kawasan. No templates.",
    href: "/services/web-design",
  },
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
  {
    title: "Local SEO",
    body: "Location pages and content that rank when customers search 'near me' — in BM and English.",
    href: "/services/seo",
  },
];

const steps = [
  { n: "1", title: "Chat on WhatsApp", body: "Tell us about your business. Five minutes, no jargon, no sales pitch." },
  { n: "2", title: "We design, you approve", body: "Design draft in 2–3 days. You tell us what to tweak until you love it." },
  { n: "3", title: "We build it", body: "Hand-coded, mobile-first, tested on real phones. You don't lift a finger." },
  { n: "4", title: "Live in 7 days", body: "Domain, hosting, SSL — all sorted. Your site is live and loading in under a second." },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd} />

      {/* ---------- HERO ---------- */}
      <section className="starfield relative -mt-16 overflow-hidden bg-hero pb-4 pt-32 text-hero-ink">
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <p className="mb-4 inline-block rounded-full border border-accent/40 px-4 py-1 text-sm font-semibold text-accent">
              RM0 down · RM179/month · Live in 7 days
            </p>
            <h1 className="display text-5xl sm:text-6xl lg:text-7xl">
              Small business web design, <span className="text-accent">Malaysian prices</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-hero-muted">
              We hand-code fast, custom websites for Malaysian small businesses — RM0 down and RM179/month, including
              domain, hosting, and unlimited edits. No WordPress. No page builders. No RM10,000 agency quotes.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/get-started"
                className="inline-flex items-center rounded-full bg-accent px-6 py-3 font-semibold text-accent-ink glow-accent transition-transform hover:-translate-y-0.5"
              >
                Get started
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center rounded-full border-2 border-hero-ink/40 px-6 py-3 font-semibold text-hero-ink transition-colors hover:border-accent hover:text-accent"
              >
                See pricing
              </Link>
            </div>
          </div>
          <DeviceMockup />
        </div>
        {/* Sweeping curve into the light content below */}
        <CurveDivider className="mt-16 text-bg" />
      </section>

      {/* ---------- WHAT WE DO ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="display text-4xl text-ink sm:text-5xl">What we do</h2>
        <p className="mt-3 max-w-2xl text-muted">
          One studio, four things — done properly. Everything your business needs to get found and get customers online.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whatWeDo.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-3xl border border-line bg-surface p-6 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-lg"
            >
              <h3 className="display text-xl text-ink">{item.title}</h3>
              <p className="mt-3 text-sm text-muted">{item.body}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-accent">Learn more →</span>
            </Link>
          ))}
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
            <li key={s.n} className="rounded-3xl border border-line bg-surface p-6">
              <span className="display flex h-12 w-12 items-center justify-center rounded-full bg-accent text-xl text-accent-ink">
                {s.n}
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- PORTFOLIO GRID ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="display text-4xl text-ink sm:text-5xl">Recent work</h2>
            <p className="mt-3 text-muted">Real businesses, real load times.</p>
          </div>
          <Link href="/work" className="font-semibold text-accent hover:underline">
            See all work →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((p) => (
            <Link
              key={p.slug}
              href="/work"
              className="group overflow-hidden rounded-3xl border border-line bg-surface transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className={`flex h-40 items-end bg-gradient-to-br ${p.gradient} p-4`}>
                <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white">
                  {p.industry}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-ink">{p.name}</h3>
                <p className="mt-1 text-sm text-muted">
                  {p.location} · loads in {p.loadTime}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- PRICING TEASER ---------- */}
      <section className="starfield relative mx-3 mt-20 overflow-hidden rounded-[2.5rem] bg-hero px-6 py-16 text-hero-ink sm:mx-6">
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="display text-4xl sm:text-5xl">Simple, honest pricing</h2>
          <p className="mt-4 text-lg text-hero-muted">
            <span className="display text-3xl text-accent">RM0 down, RM179/month</span>
            <br />
            for a custom 5-page site — domain, hosting, SSL, and unlimited edits included. Prefer to own it outright?
            Lump sum from RM3,500.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/pricing"
              className="inline-flex items-center rounded-full bg-accent px-6 py-3 font-semibold text-accent-ink glow-accent"
            >
              See full pricing
            </Link>
            <WhatsAppButton variant="outline" message="Hi JPBC! Can you tell me more about your website pricing?">
              Ask us anything
            </WhatsAppButton>
          </div>
        </div>
      </section>

      {/* ---------- TESTIMONIALS (placeholder) ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="display text-4xl text-ink sm:text-5xl">What clients say</h2>
        {/* TODO: Replace placeholder testimonials with real client quotes */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {[
            {
              quote:
                "I WhatsApped a menu change at 9pm expecting a reply the next day. It was live before I finished my teh tarik.",
              name: "Kak Yam",
              role: "Restoran Kak Yam, Klang",
            },
            {
              quote:
                "The agency quoted me RM12,000. JPBC built something faster and nicer for RM179 a month. Senang cerita.",
              name: "Mr. Tan",
              role: "Ah Seng Motor Workshop, Puchong",
            },
            {
              quote:
                "Parents used to call asking about fees. Now they check the website and WhatsApp us ready to enrol.",
              name: "Ms. Priya",
              role: "Bright Minds Tuition, Subang Jaya",
            },
          ].map((t) => (
            <figure key={t.name} className="rounded-3xl border border-line bg-surface p-8">
              <blockquote className="text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-4 text-sm text-muted">
                <span className="font-semibold text-ink">{t.name}</span> · {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ---------- FAQ TEASER ---------- */}
      <section className="mx-auto max-w-3xl px-6 py-10">
        <h2 className="display text-center text-4xl text-ink sm:text-5xl">Quick questions</h2>
        <div className="mt-10">
          <FaqAccordion faqs={allFaqs.slice(0, 4)} />
        </div>
        <p className="mt-6 text-center">
          <Link href="/faq" className="font-semibold text-accent hover:underline">
            Read all 12 FAQs →
          </Link>
        </p>
      </section>

      {/* ---------- FINAL CTA ---------- */}
      <CtaBand />
    </>
  );
}
