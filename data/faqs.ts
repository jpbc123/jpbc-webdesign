import type { Market } from "@/config/markets/types";
import { price } from "@/lib/market";

export type Faq = { q: string; a: string };

// The Q&As for /faq, built per market so prices, domain types, payment rails,
// and languages always match the market you're browsing. `pricingFaqs` are
// reused in the accordion on /pricing (with FAQPage JSON-LD on both pages),
// so the ownership and cancellation answers show up in both places.

export function pricingFaqs(market: Market): Faq[] {
  const monthly = price(market, market.pricing.monthly);
  const setup = price(market, market.pricing.setup);
  const lumpSum = price(market, market.pricing.lumpSum);
  const care = price(market, market.pricing.lumpSumCare);
  const min = market.pricing.minimumMonths;

  return [
    {
      q: `What exactly does ${monthly}/month include?`,
      a: `A custom-designed, hand-coded 5-page website, your ${market.voice.domainLine} domain, hosting, SSL certificate, unlimited content edits, and support over WhatsApp. No hidden fees, no setup cost — ${setup} down.`,
    },
    {
      q: "Is there a contract? What's the minimum commitment?",
      a: `The monthly plan has a ${min}-month minimum term. After that there's no lock-in — you simply keep paying monthly, and you can cancel anytime.`,
    },
    {
      q: "What does 'unlimited edits' actually cover?",
      a: "Text changes, photo swaps, price updates, new menu items, opening hours, promo banners — anything on your existing pages. WhatsApp us the change and it's usually live the same day. New pages or new features (like booking systems) are add-ons, and we'll always tell you before anything costs extra.",
    },
    {
      q: "What payment methods do you accept?",
      a: market.voice.faqPayment,
    },
    {
      q: "What happens if I cancel?",
      a: "Your domain and your content are always yours — the domain gets transferred to you free of charge, along with your logo, photos and text. The website itself is part of your monthly subscription, so when the subscription ends, the site goes offline. If you'd like to keep the site permanently, a one-time buyout is available — just ask and we'll quote it.",
    },
    {
      q: "Monthly or lump sum — which should I choose?",
      a: `Monthly (${monthly}) is best if you want zero upfront cost and everything handled for you — most of our clients choose this. Lump sum (from ${lumpSum} + ${care}/month hosting & care) works out cheaper from around year three onwards and suits businesses that prefer to own the site outright.`,
    },
    {
      q: "Do I own the website?",
      a: `You own your domain, your content, and your brand — always. The website build is part of your subscription, the same way you don't own the software behind an email or accounting service you subscribe to. That's the trade for ${setup} down: we carry the cost of building it. If you'd prefer to own the site outright, we offer a one-time buyout — WhatsApp us for a quote.`,
    },
    {
      q: `What does the ${min}-month minimum mean?`,
      a: `The first ${min} months are a minimum term — that's what makes ${setup} down possible, since we cover the build, domain and hosting upfront. After month ${min} there's no lock-in at all: you simply keep paying monthly, and you can cancel anytime.`,
    },
    {
      q: "Can I move my website to another provider?",
      a: "Your domain moves with you at no cost, so you can point it anywhere you like. The site itself stays with the subscription unless you take the one-time buyout, in which case you get the code and can host it wherever you want.",
    },
  ];
}

export function generalFaqs(market: Market): Faq[] {
  const monthly = price(market, market.pricing.monthly);
  const setup = price(market, market.pricing.setup);

  return [
    {
      q: "Who owns the website and the domain?",
      a: `The domain is registered under your own name, so it stays yours even if you stop working with us. On the lump-sum plan you also own the site code outright. On the monthly plan the site is part of the ongoing service, which is how we keep it at ${setup} down.`,
    },
    {
      q: "How long does it take to build my website?",
      a: "Typically live within 7 days of you approving the design. The usual flow: WhatsApp chat today, design draft within 2–3 days, your feedback, then we build and launch.",
    },
    {
      q: "Why hand-coded instead of WordPress?",
      a: "Speed and safety. Hand-coded static sites load in under a second (WordPress sites average 3–5 seconds), have no plugins to update, and no database for hackers to break into. Google also ranks faster sites higher.",
    },
    market.voice.faqLanguages,
    {
      q: "Do I get receipts for my payments?",
      a: "Yes — every payment comes with an itemised digital receipt for your bookkeeping. If your accountant needs anything specific noted on it, just tell us and we'll include it.",
    },
    {
      q: "I already have a website. Can you take over or rebuild it?",
      a: `Yes. Most of our clients came to us with an outdated or slow site. We rebuild it hand-coded (usually keeping your domain and improving your content), and the ${monthly}/month covers the rebuild — still ${setup} down.`,
    },
  ];
}

export function allFaqs(market: Market): Faq[] {
  return [...pricingFaqs(market), ...generalFaqs(market)];
}
