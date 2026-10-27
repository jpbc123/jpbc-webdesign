import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import KindTag from "@/components/KindTag";
import Marquee from "@/components/Marquee";
import SectionHeading from "@/components/SectionHeading";
import PostCard from "@/components/PostCard";
import CtaBand from "@/components/CtaBand";
import NightSky from "@/components/NightSky";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import { sectors, showcaseFor, type ShowcaseItem } from "@/data/showcase";
import { allFaqs } from "@/data/faqs";
import { posts } from "@/content/blog";
import type { Market } from "@/config/markets/types";
import { editHours, mpath, price, waLink } from "@/lib/market";
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

function WorkCard({ item }: { item: ShowcaseItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card group block w-[290px] shrink-0 p-3 sm:w-[350px]"
    >
      <div className="overflow-hidden rounded-xl bg-surface-2">
        <Image
          src={item.image}
          alt={`${item.name} website`}
          width={960}
          height={600}
          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="px-1 pb-1 pt-4">
        <KindTag kind={item.kind} />
        <p className="mt-3 font-bold text-ink">{item.name}</p>
        <p className="text-sm text-muted">{item.sector}</p>
      </div>
    </a>
  );
}

const Check = ({ className = "size-5" }: { className?: string }) => (
  <svg viewBox="0 0 20 20" className={className} fill="currentColor" aria-hidden>
    <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0Z" />
  </svg>
);

const pad = (n: number) => String(n).padStart(2, "0");

export default function HomePage({ market }: { market: Market }) {
  const monthly = price(market, market.pricing.monthly);
  const setup = price(market, market.pricing.setup);
  const lumpSum = price(market, market.pricing.lumpSum);
  const care = price(market, market.pricing.lumpSumCare);
  const hours = editHours(market);
  const { addons } = market.pricing;
  const editRate = price(market, market.pricing.edits.hourlyRate);
  const work = showcaseFor(market);
  const faqs = allFaqs(market);
  const latestPosts = market.pages.blogPosts ? posts.slice(0, 3) : [];
  // Service pages exist only where the market has them; elsewhere the cards
  // fall back to pricing or work.
  const servicePath = (slug: string, fallback: string) =>
    mpath(market, market.pages.services ? `/services/${slug}` : fallback);

  const services = [
    {
      title: "Business websites",
      body: market.voice.homeWhatWeDoDesign,
      price: `From ${monthly}/month`,
      href: servicePath("web-design", "/pricing"),
    },
    {
      title: "Online stores",
      body: "Product catalogue, cart and order management you run yourself from a private admin.",
      price: "Quoted per project",
      href: mpath(market, "/work"),
    },
    {
      title: "Web apps & custom software",
      body: "Client portals, booking systems and internal tools, built like our own MY Swift Audit.",
      price: "Quoted per project",
      href: mpath(market, "/work"),
    },
    {
      title: "AI automation",
      body: "Customer chat on your website or WhatsApp, lead follow-up, quotes, reports and admin, handled automatically. Our own MyResit and MY Swift Audit run on it.",
      price: "Quoted per project",
      href: mpath(market, "/work"),
    },
    {
      title: "Google Business Profile",
      body: "Claimed, verified and set up properly so you show on Google Maps and in the local 3-pack.",
      price: `From ${price(market, addons.googleBusinessProfile)}`,
      href: servicePath("google-business-profile", "/pricing"),
    },
    {
      title: "Local SEO",
      body: market.voice.homeWhatWeDoSeo,
      price: `From ${price(market, addons.localSeoMonthly)}/month`,
      href: servicePath("seo", "/pricing"),
    },
  ];

  const steps = [
    { title: "Talk it through", body: "A short WhatsApp or call to agree your goals, pages and must-have features. Free, no obligation." },
    { title: "Plan the structure", body: "We map the pages and write the content with you before any design starts." },
    { title: "Design", body: "You review the design on desktop and mobile within 2–3 days, and sign it off before we build." },
    { title: "Build and test", body: "Hand-coded, with SEO basics and speed checks built in, tested on real phones and browsers." },
    { title: "Launch and look after", body: `Live within 7 days of sign-off. Then ${hours} of edits a month: just WhatsApp the person who built it.` },
  ];

  const menu = [
    { item: "Website, 5 pages (monthly plan)", price: `${monthly}/mo` },
    { item: "Down payment", price: setup },
    { item: "Own it outright (lump sum)", price: `from ${lumpSum}` },
    { item: "Hosting & care (lump sum)", price: `${care}/mo` },
    { item: "Extra edit time", price: `${editRate}/hr` },
    { item: "Extra page", price: price(market, addons.extraPage) },
    { item: "Online store, web app or AI automation", price: "Quote" },
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

      {/* ---------- HERO, centred, with the work marquee under it ---------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-hero to-bg">
        <NightSky />
        <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-16 text-center sm:px-6 sm:pt-24">
          <p className="mx-auto w-fit rounded-full bg-surface px-4 py-1.5 text-sm font-semibold text-accent-text shadow-sm ring-1 ring-line">
            {market.heroCopy.badge}
          </p>
          <h1 className="display mx-auto mt-7 max-w-4xl text-[2.6rem] text-ink sm:text-6xl">
            {market.heroCopy.headlineLead}
            <span className="text-accent-text">{market.heroCopy.headlineHighlight}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
            {market.heroCopy.subheadline}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={waLink(market, "Hi JPBC Web Designs, I'd like a free quote for a website.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary shadow-lg shadow-black/10"
            >
              Get a free quote
            </a>
            <Link href={mpath(market, "/pricing")} className="btn btn-secondary">
              See pricing
            </Link>
          </div>
          <dl className="mx-auto mt-12 flex max-w-xl justify-center divide-x divide-line-strong">
            {[
              { value: setup, label: "down payment" },
              { value: "7 days", label: "to go live" },
              { value: "< 1s", label: "load time" },
            ].map((f) => (
              <div key={f.label} className="flex flex-col-reverse px-5 sm:px-10">
                <dt className="text-sm text-muted">{f.label}</dt>
                <dd className="text-2xl font-extrabold text-ink sm:text-3xl">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative pb-16 pt-4">
          <Marquee seconds={55} gap="1.25rem">
            {/* Short lists repeat so the track is always wider than the screen */}
            {(work.length < 5 ? [...work, ...work] : work).map((item, i) => (
              <WorkCard key={`${item.name}-${i}`} item={item} />
            ))}
          </Marquee>
        </div>
      </section>

      {/* ---------- SECTORS ---------- */}
      <section className="border-y border-line py-6" aria-label="Who we build for">
        <p className="mb-4 text-center text-sm font-medium text-muted">Built for businesses of every kind</p>
        <Marquee seconds={40} gap="2.5rem" reverse>
          {sectors.map((name) => (
            <span key={name} className="whitespace-nowrap text-lg font-bold text-faint">
              {name}
            </span>
          ))}
        </Marquee>
      </section>

      {/* ---------- SERVICES ---------- */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading eyebrow="What we do" title="Everything you need to get found and get enquiries" center />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link key={s.title} href={s.href} className="card night-card group flex flex-col p-7">
              <span className="card-meteor" aria-hidden />
              <span className="card-icon grid size-10 place-items-center rounded-xl bg-accent-soft text-accent-text">
                <Check />
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink group-hover:text-accent-text">{s.title}</h3>
              <p className="mt-2 flex-1 text-pretty leading-relaxed text-muted">{s.body}</p>
              <p className="mt-5 text-sm font-bold text-accent-text">{s.price}</p>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted">
          Thinking about Facebook or Google ads? Ask us. We&apos;ll tell you straight whether it&apos;s worth it for your
          business.
        </p>
      </section>

      {/* ---------- WHY HAND-CODED ---------- */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-24">
        <SectionHeading eyebrow="Why hand-coded" title="Why hand-coded beats WordPress" />
        <div className="mt-12 grid gap-5 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div className="rounded-2xl bg-accent-soft p-8 lg:row-span-2 lg:p-10">
            <p className="text-7xl font-extrabold tracking-[-0.04em] text-accent-text sm:text-8xl">&lt;1s</p>
            <h3 className="mt-6 text-2xl font-bold text-ink">Loads before they blink</h3>
            <p className="mt-3 max-w-md leading-relaxed text-muted">
              Our static sites load in under a second. The average WordPress site takes 3–5 seconds, and half your
              visitors give up by then. Speed is also a Google ranking factor.
            </p>
          </div>
          <div className="card p-7">
            <p className="text-5xl font-extrabold tracking-tight text-accent-text">0</p>
            <h3 className="mt-4 text-lg font-bold text-ink">Nothing to hack</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              No database, no admin login, no plugins with security holes. There&apos;s simply no way in.
            </p>
          </div>
          <div className="card p-7">
            <p className="text-5xl font-extrabold tracking-tight text-accent-text">0</p>
            <h3 className="mt-4 text-lg font-bold text-ink">Plugin updates, ever</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              No &ldquo;please update 14 plugins&rdquo; emails, no theme breaking after an update. It just works.
            </p>
          </div>
          <div className="card p-7 lg:col-span-2">
            <p className="text-sm font-semibold text-accent-text">Test us</p>
            <p className="mt-2 font-medium leading-relaxed text-ink">
              Don&apos;t take our word for it. Test your current site at{" "}
              <a
                href="https://pagespeed.web.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent-text underline underline-offset-2"
              >
                pagespeed.web.dev
              </a>
              . If it scores under 90 on mobile, WhatsApp us the result and we&apos;ll show you what we&apos;d fix.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- PROCESS: five numbered cards ---------- */}
      <section className="bg-surface-2 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="How we work" title="Five steps. You approve before we build." />
          <ol className="mt-12 grid gap-4 md:grid-cols-5">
            {steps.map((step, i) => (
              <li key={step.title} className="card p-5">
                <span className="text-sm font-bold text-accent-text">{pad(i + 1)}</span>
                <h3 className="mt-3 font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- PRICING ---------- */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="card grid gap-10 p-8 sm:p-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionHeading
              eyebrow="Pricing"
              title="Simple, honest pricing"
              intro={`No "PM for price". The monthly plan includes domain, hosting, SSL and ${hours} of edits a month.`}
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={mpath(market, "/pricing")} className="btn btn-primary">
                Compare plans
              </Link>
              <a
                href={waLink(market, "Hi JPBC Web Designs, can you tell me more about your website pricing?")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Ask us
              </a>
            </div>
          </div>
          <div>
            <ul className="divide-y divide-line">
              {menu.map((m) => (
                <li key={m.item} className="flex items-baseline justify-between gap-4 py-3.5">
                  <span className="text-ink">{m.item}</span>
                  <span className="shrink-0 font-bold text-ink">{m.price}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">
              Monthly plan: {market.pricing.minimumMonths}-month minimum, then cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <SectionHeading eyebrow="FAQ" title="Quick questions" center />
        <div className="mt-10">
          <FaqAccordion faqs={faqs.slice(0, 4)} />
        </div>
        <p className="mt-8 text-center">
          <Link href={mpath(market, "/faq")} className="btn btn-secondary">
            Read all {faqs.length} FAQs
          </Link>
        </p>
      </section>

      {/* ---------- FROM THE BLOG ---------- */}
      {latestPosts.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="From the blog"
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

      <CtaBand
        market={market}
        heading={`${setup} down. ${monthly}/month. Live in 7 days.`}
        sub={`Or ${lumpSum} once and own it outright. You WhatsApp us, the person who built your site replies.`}
      />
    </>
  );
}
