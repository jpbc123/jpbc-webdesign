export type Faq = { q: string; a: string };

// The 12 starter Q&As for /faq. The first `pricingFaqs` below are reused
// in the accordion on /pricing (with FAQPage JSON-LD on both pages).

export const pricingFaqs: Faq[] = [
  {
    q: "What exactly does RM179/month include?",
    a: "A custom-designed, hand-coded 5-page website, your .com or .com.my domain, hosting, SSL certificate, unlimited content edits, and support over WhatsApp. No hidden fees, no setup cost — RM0 down.",
  },
  {
    q: "Is there a contract? What's the minimum commitment?",
    a: "The monthly plan has a 12-month minimum. After that it's month-to-month — stay because the service is good, not because a contract traps you.",
  },
  {
    q: "What does 'unlimited edits' actually cover?",
    a: "Text changes, photo swaps, price updates, new menu items, opening hours, promo banners — anything on your existing pages. WhatsApp us the change and it's usually live the same day. New pages or new features (like booking systems) are add-ons, and we'll always tell you before anything costs extra.",
  },
  {
    q: "What payment methods do you accept?",
    a: "FPX online banking. We invoice monthly and send a receipt with every payment for your records.",
  },
  {
    q: "What happens if I cancel?",
    a: "On the monthly plan, the design and code are our work product — if you cancel after the 12-month minimum, the site comes down but you keep your domain (it's registered in your name) and all your content. On the lump-sum option you own everything outright from day one.",
  },
  {
    q: "Monthly or lump sum — which should I choose?",
    a: "Monthly (RM179) is best if you want zero upfront cost and everything handled for you — most of our clients choose this. Lump sum (from RM3,500 + RM49/month hosting & care) works out cheaper from around year three onwards and suits businesses that prefer to own the site outright.",
  },
];

export const generalFaqs: Faq[] = [
  {
    q: "Who owns the website and the domain?",
    a: "The domain is registered under your own name, so it stays yours even if you stop working with us. On the lump-sum plan you also own the site code outright. On the monthly plan the site is part of the ongoing service, which is how we keep it at RM0 down.",
  },
  {
    q: "How long does it take to build my website?",
    a: "Typically live within 7 days of you approving the design. The usual flow: WhatsApp chat today, design draft within 2–3 days, your feedback, then we build and launch.",
  },
  {
    q: "Why hand-coded instead of WordPress?",
    a: "Speed and safety. Hand-coded static sites load in under a second (WordPress sites average 3–5 seconds), have no plugins to update, and no database for hackers to break into. Google also ranks faster sites higher.",
  },
  {
    q: "Can you build the site in Bahasa Melayu or Chinese?",
    a: "Yes — we build in BM, English, Chinese, or any combination. We write natural copy in each language, not machine translation.",
  },
  {
    q: "Do I get receipts for my payments?",
    a: "Yes — every payment comes with an itemised digital receipt for your bookkeeping. If your accountant needs anything specific noted on it, just tell us and we'll include it.",
  },
  {
    q: "I already have a website. Can you take over or rebuild it?",
    a: "Yes. Most of our clients came to us with an outdated or slow site. We rebuild it hand-coded (usually keeping your domain and improving your content), and the RM179/month covers the rebuild — still RM0 down.",
  },
];

export const allFaqs: Faq[] = [...pricingFaqs, ...generalFaqs];
