import type { Metadata } from "next";
import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton";
import ShopfrontMockup from "@/components/ShopfrontMockup";
import SectionHeading from "@/components/SectionHeading";
import PostCard from "@/components/PostCard";
import CtaBand from "@/components/CtaBand";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import { portfolioFor } from "@/data/portfolio";
import { industryDemosFor } from "@/data/industryDemos";
import { allFaqs } from "@/data/faqs";
import { posts } from "@/content/blog";
import type { Market } from "@/config/markets/types";
import { editHours, mpath, price } from "@/lib/market";
import { marketMetadata } from "@/lib/seo";
import { absoluteUrl, BUSINESS_ID, SITE_NAME, SITE_URL } from "@/lib/site";
import { DEFAULT_MARKET_CODE } from "@/config/markets";

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

/** Fascia colours for the row of shoplots in the work section, in order. */
const shoplotSigns = [
  "bg-sign-red text-sign-red-ink [--sign-glow:var(--sign-red-ink)]",
  "bg-sign-green text-sign-green-ink [--sign-glow:var(--sign-green-ink)]",
  "bg-sign-yellow text-sign-yellow-ink",
  "bg-sign-black text-sign-black-ink [--sign-glow:var(--sign-black-ink)]",
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function HomePage({ market }: { market: Market }) {
  const monthly = price(market, market.pricing.monthly);
  const setup = price(market, market.pricing.setup);
  const lumpSum = price(market, market.pricing.lumpSum);
  const care = price(market, market.pricing.lumpSumCare);
  const hours = editHours(market);
  const { addons } = market.pricing;
  const work = portfolioFor(market);
  const faqs = allFaqs(market);
  const latestPosts = market.pages.blogPosts ? posts.slice(0, 3) : [];

  const directory = [
    { title: "Web design", body: market.voice.homeWhatWeDoDesign, href: "/services/web-design" },
    {
      title: "Hand-coded build",
      body: "Fast static sites. No WordPress, no page builders, no plugins to break or hack.",
      href: "/services/web-design",
    },
    {
      title: "Google Business Profile",
      body: "Claimed, verified and optimised so you show up on Google Maps and the local 3-pack.",
      href: "/services/google-business-profile",
    },
    { title: "Local SEO", body: market.voice.homeWhatWeDoSeo, href: "/services/seo" },
    {
      title: "Online stores & web apps",
      body: "Your own shop with catalogue, checkout and an admin you run from your phone. Plus custom software.",
      href: "/work",
    },
  ];

  const receipt = [
    { item: "Chat on WhatsApp", time: "5 min", body: "Tell us about your business. No jargon, no sales pitch." },
    { item: "Design draft", time: "2–3 days", body: "You tell us what to tweak until you love it." },
    { item: "Hand-coded build", time: "~3 days", body: "Mobile-first, tested on real phones." },
    { item: "Go live", time: "Day 7", body: "Domain, hosting and SSL all sorted for you." },
  ];

  const menu = [
    { item: "Website, 5 pages (monthly plan)", price: `${monthly}/mo` },
    { item: "Setup fee", price: setup },
    { item: "Own it outright (lump sum)", price: `from ${lumpSum}` },
    { item: "Hosting & care (lump sum)", price: `${care}/mo` },
    { item: "Extra edit time", price: `${price(market, market.pricing.edits.hourlyRate)}/hr` },
    { item: "Extra page", price: price(market, addons.extraPage) },
    { item: "Google Business Profile setup", price: price(market, addons.googleBusinessProfile) },
    { item: "Local SEO pages", price: `${price(market, addons.localSeoMonthly)}/mo` },
    { item: "Online store / web app", price: "Quote" },
  ];

  const isDefaultMarket = market.code === DEFAULT_MARKET_CODE;

  // Site name + brand variants, so Google labels results "JPBC Web Designs"
  // and treats searches like "jpbcwebdesign" as the brand. Read from the root
  // home page only.
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: ["JPBC", "JPBC Webdesigns", "jpbcwebdesigns.com"],
    url: `${SITE_URL}/`,
    publisher: { "@id": BUSINESS_ID },
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    ...(isDefaultMarket ? { "@id": BUSINESS_ID } : {}),
    name: SITE_NAME,
    url: absoluteUrl(mpath(market, "/")),
    logo: `${SITE_URL}/icon-512.png`,
    image: `${SITE_URL}/icon-512.png`,
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
        description: `Custom hand-coded 5-page website. ${setup} down, ${monthly}/month including domain, hosting, SSL and ${hours} of edits a month.`,
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
      {isDefaultMarket && <JsonLd data={websiteJsonLd} />}
      <JsonLd data={localBusinessJsonLd} />

      {/* ---------- HERO: the shopfront ---------- */}
      <section className="overflow-hidden">
        <div className="awning" aria-hidden />
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 pb-16 pt-10 lg:grid-cols-[1.1fr_1fr] lg:pt-14">
          <div>
            <p className="plate !bg-sign-yellow !text-sign-yellow-ink">{market.heroCopy.badge}</p>
            <h1 className="display mt-6 text-[2.6rem] text-ink sm:text-6xl lg:text-[4.1rem]">
              {market.heroCopy.headlineLead}
              <span className="sign sign-lit mt-3 inline-block -rotate-[1.5deg] rounded-tag border-2 border-frame bg-sign-red px-3 pb-2 pt-3 text-sign-red-ink shadow-[4px_4px_0_var(--shadow-hard)] [--sign-glow:var(--sign-red-ink)]">
                {market.heroCopy.headlineHighlight}
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-pretty text-lg text-muted">{market.heroCopy.subheadline}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={mpath(market, "/get-started")} className="btn btn-primary">
                Get started
              </Link>
              <Link href={mpath(market, "/pricing")} className="btn btn-secondary">
                See the menu
              </Link>
            </div>
          </div>
          <ShopfrontMockup market={market} />
        </div>
      </section>

      {/* ---------- 01 WHAT WE DO: the building directory ---------- */}
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-24 lg:grid-cols-[1fr_1.35fr] lg:items-start">
        <SectionHeading
          no="No. 01"
          title="What's in this building"
          intro="One small studio, five things done properly. Everything your business needs to get found and get customers online."
        />
        <nav aria-label="Services" className="letterboard p-5 sm:p-7">
          <p className="mb-4 border-b border-white/20 pb-3 text-center text-xs font-bold uppercase tracking-[0.35em] text-white/70">
            Directory
          </p>
          <ul className="divide-y divide-white/10">
            {directory.map((d, i) => (
              <li key={d.title}>
                <Link
                  href={mpath(market, d.href)}
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-3 py-3.5"
                >
                  <span className="font-bold tabular-nums text-white/50">{pad(i + 1)}</span>
                  <span>
                    <span className="block font-extrabold uppercase tracking-[0.12em] group-hover:text-sign-yellow">
                      {d.title}
                    </span>
                    <span className="mt-1 block text-sm text-white/65">{d.body}</span>
                  </span>
                  <span aria-hidden className="text-white/60 transition-transform group-hover:translate-x-1 group-hover:text-sign-yellow">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {/* ---------- 02 WHY HAND-CODED: yellow price-tag boards ---------- */}
      <section className="border-y-2 border-frame bg-surface-2 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading no="No. 02" title="Why hand-coded beats WordPress" />
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr_1fr]">
            <div className="board screws bg-sign-yellow p-8 text-sign-yellow-ink lg:row-span-2 lg:p-10">
              <p className="sign text-7xl sm:text-8xl">&lt;1s</p>
              <h3 className="mt-6 text-2xl font-extrabold">Loads before they blink</h3>
              <p className="mt-3 max-w-md">
                Our static sites load in under a second. The average WordPress site takes 3–5 seconds, and half your
                visitors give up by then. Speed is also a Google ranking factor.
              </p>
            </div>
            <div className="board bg-surface p-7">
              <p className="sign text-5xl text-accent">0</p>
              <h3 className="mt-4 text-lg font-extrabold text-ink">Nothing to hack</h3>
              <p className="mt-2 text-sm text-muted">
                No database, no admin login, no plugins with security holes. There&apos;s simply no way in.
              </p>
            </div>
            <div className="board bg-surface p-7">
              <p className="sign text-5xl text-accent">0</p>
              <h3 className="mt-4 text-lg font-extrabold text-ink">Plugin updates, ever</h3>
              <p className="mt-2 text-sm text-muted">
                No &ldquo;please update 14 plugins&rdquo; emails, no theme breaking after an update. It just works.
              </p>
            </div>
            {/* Notice taped to the wall */}
            <div className="relative rotate-[0.6deg] border-2 border-dashed border-frame bg-surface p-7 lg:col-span-2">
              <span className="absolute -top-3 left-8 h-6 w-20 -rotate-3 bg-sign-yellow/70" aria-hidden />
              <p className="sign text-sm tracking-wider text-accent">Notice</p>
              <p className="mt-2 font-semibold text-ink">
                Don&apos;t take our word for it. Test your current site at{" "}
                <a
                  href="https://pagespeed.web.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline decoration-2 underline-offset-2"
                >
                  pagespeed.web.dev
                </a>
                . If it scores under 90 on mobile, WhatsApp us the result and we&apos;ll show you what we&apos;d fix.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 03 HOW IT WORKS: the order receipt ---------- */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-[1fr_1fr]">
        <div>
          <SectionHeading
            no="No. 03"
            title="How it works"
            intro="From your first WhatsApp to a live website in about a week. Here's your order."
          />
          <div className="mt-8">
            <WhatsAppButton market={market}>Place your order</WhatsAppButton>
          </div>
        </div>
        <div className="receipt mx-auto w-full max-w-md -rotate-1 text-sm">
          <div className="text-center">
            <p className="text-base font-bold tracking-widest">JPBC WEB DESIGNS</p>
            <p className="mt-1 text-xs opacity-70">{market.voice.footerLegalLine}</p>
            <p className="mt-3 border-y border-dashed border-current/40 py-2 text-xs uppercase tracking-widest">
              Order receipt
            </p>
          </div>
          <ol className="mt-4 space-y-4">
            {receipt.map((r) => (
              <li key={r.item}>
                <div className="menu-row font-bold">
                  <span>1x {r.item}</span>
                  <span className="menu-leader" aria-hidden />
                  <span className="shrink-0">{r.time}</span>
                </div>
                <p className="mt-1 pl-6 text-xs opacity-75">{r.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-5 space-y-1 border-t border-dashed border-current/40 pt-4 font-bold">
            <div className="menu-row">
              <span>TO PAY TODAY</span>
              <span className="menu-leader" aria-hidden />
              <span>{setup}</span>
            </div>
            <div className="menu-row">
              <span>THEN</span>
              <span className="menu-leader" aria-hidden />
              <span>{monthly}/mo</span>
            </div>
          </div>
          <p className="mt-6 text-center text-xs uppercase tracking-widest opacity-70">{market.signage.receiptThanks}</p>
        </div>
      </section>

      {/* ---------- 04 WORK: a row of shoplots ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading no="No. 04" title={market.voice.homeWorkHeading} intro={market.voice.homeWorkIntro} />
          <Link href={mpath(market, "/work")} className="btn btn-secondary">
            See all work
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {work.length > 0
            ? work.slice(0, 6).map((p, i) => (
                <Link key={p.slug} href={mpath(market, "/work")} className="board group flex flex-col overflow-hidden bg-surface-2">
                  <div className={`border-b-2 border-frame px-4 py-3 text-center ${shoplotSigns[i % shoplotSigns.length]}`}>
                    <h3 className="sign sign-lit truncate text-lg">{p.name}</h3>
                  </div>
                  <div className="awning awning-sm" aria-hidden />
                  <div className="relative mx-4 -mt-1 h-40 overflow-hidden rounded-tag border-2 border-frame bg-surface">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={`Screenshot of the ${p.name} website`}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient}`} aria-hidden />
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-3 px-4 pb-4 pt-3 text-sm">
                    <span className="font-bold text-ink">{p.industry}</span>
                    <span className="shrink-0 text-xs font-bold uppercase tracking-wider text-muted">No. {pad(i + 1)}</span>
                  </div>
                </Link>
              ))
            : industryDemosFor(market).slice(0, 6).map((d, i) => (
                <a
                  key={d.slug}
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="board group flex flex-col overflow-hidden bg-surface"
                >
                  <div className={`border-b-2 border-frame px-4 py-3 text-center ${shoplotSigns[i % shoplotSigns.length]}`}>
                    <h3 className="sign sign-lit truncate text-lg">{d.name}</h3>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="plate self-start">Live demo</span>
                    <p className="mt-4 text-sm text-muted">{d.blurb}</p>
                    <span className="mt-auto pt-4 text-sm font-bold text-accent">Explore the demo →</span>
                  </div>
                </a>
              ))}
        </div>
      </section>

      {/* ---------- 05 PRICING: the kopitiam menu board ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="board screws overflow-hidden bg-sign-green text-sign-green-ink [--sign-glow:var(--sign-yellow)]">
          <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="plate !bg-sign-yellow !text-sign-yellow-ink">No. 05</p>
              <h2 className="sign sign-lit mt-5 text-5xl text-sign-yellow sm:text-6xl">Menu</h2>
              <p className="mt-5 max-w-sm text-lg text-[#e3efe7]">
                Simple, honest pricing. No &ldquo;PM for price&rdquo;. Everything on the monthly plan includes domain,
                hosting, SSL and {hours} of edits a month.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={mpath(market, "/pricing")} className="btn btn-yellow">
                  Full pricing
                </Link>
                <WhatsAppButton
                  market={market}
                  variant="on-sign"
                  message="Hi JPBC! Can you tell me more about your website pricing?"
                >
                  Ask us
                </WhatsAppButton>
              </div>
            </div>
            <ul className="space-y-4 text-base sm:text-lg">
              {menu.map((m) => (
                <li key={m.item} className="menu-row">
                  <span className="font-semibold">{m.item}</span>
                  <span className="menu-leader" aria-hidden />
                  <span className="sign shrink-0 text-sign-yellow">{m.price}</span>
                </li>
              ))}
              <li className="pt-2 text-sm text-[#cfe2d6]">
                Monthly plan: {market.pricing.minimumMonths}-month minimum, then cancel anytime.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- 06 FAQ ---------- */}
      <section className="mx-auto max-w-3xl px-6 py-10">
        <SectionHeading no="No. 06" title="Quick questions" center />
        <div className="mt-10">
          <FaqAccordion faqs={faqs.slice(0, 4)} />
        </div>
        <p className="mt-8 text-center">
          <Link href={mpath(market, "/faq")} className="btn btn-secondary">
            Read all {faqs.length} FAQs
          </Link>
        </p>
      </section>

      {/* ---------- 07 FROM THE BLOG ---------- */}
      {latestPosts.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              no="No. 07"
              title="Free advice, no sales pitch"
              intro="Plain-English guides for business owners on websites, Google and selling online."
            />
            <Link href={mpath(market, "/blog")} className="btn btn-secondary">
              All articles
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      <CtaBand market={market} />
    </>
  );
}
