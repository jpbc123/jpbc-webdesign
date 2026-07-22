import type { Market } from "./types";

// Australia — served from /au, but `enabled: false` for now: the pages build,
// stay out of the sitemap and the market switcher, and render noindex.
// Flip `enabled` to true when you're ready to launch (see config/markets/index.ts).
//
// Prices are set for this market on their own merits — they are NOT the
// Malaysian numbers run through an exchange rate.
// TODO: confirm the lump-sum and add-on numbers before flipping `enabled`.

const AU_WHATSAPP =
  process.env.NEXT_PUBLIC_AU_WHATSAPP || process.env.AU_WHATSAPP || "60122947847";

export const au: Market = {
  code: "au",
  label: "Australia",
  flag: "🇦🇺",
  locale: "en-AU",
  ogLocale: "en_AU",
  pathPrefix: "/au",
  enabled: false,

  currency: { symbol: "A$", code: "AUD", numberLocale: "en-AU" },

  pricing: {
    monthly: 179,
    setup: 0,
    lumpSum: 3500,
    lumpSumCare: 49,
    minimumMonths: 12,
    addons: { extraPage: 100, googleBusinessProfile: 500, localSeoMonthly: 300 },
  },

  contact: {
    whatsapp: AU_WHATSAPP,
    phoneDisplay: `+${AU_WHATSAPP}`,
    email: "hello@jpbcwebdesigns.com",
    serviceArea: "Australia (remote)",
    serviceAreaBody:
      "We work with businesses anywhere in Australia (remote) — Sydney, Melbourne, Brisbane, Perth, and every town in between. Everything happens over WhatsApp and email, so where you are never slows the project down.",
    hours: "Monday–Friday, 9am–6pm (AEST)",
    afterHoursNote: "WhatsApp anytime — we often reply outside business hours too.",
  },

  phone: {
    dialCode: "61",
    // 04XX XXX XXX local format, or 614XX... international format
    pattern: "^(?:61|0)4\\d{8}$",
    label: "Phone (Australian mobile)",
    placeholder: "0412 345 678",
    error: "Please enter a valid Australian mobile number, e.g. 0412 345 678",
  },

  heroCopy: {
    badge: "{setup} down · {monthly}/month · Live in 7 days",
    headlineLead: "Small business web design, ",
    headlineHighlight: "honest prices",
    subheadline:
      "We hand-code fast, custom websites for Australian small businesses — {setup} down and {monthly}/month, including domain, hosting, and unlimited edits. No WordPress. No page builders. No five-figure agency quotes.",
  },

  voice: {
    waDefaultMessage: "Hi JPBC! I'm interested in a website for my business.",
    domainLine: ".com or .com.au",
    homeWhatWeDoDesign:
      "Custom design around your business — your services, your customers, your area. No templates.",
    homeWhatWeDoSeo:
      "Location pages and content that rank when customers search 'near me' in your suburb.",
    homeWorkHeading: "What we build",
    homeWorkIntro: "Live demo sites showing exactly what we build — click through and see.",
    pricingQuestion: "How much does a small business website cost in Australia?",
    productDescription: "Custom, hand-coded 5-page website for Australian small businesses.",
    businessDescription:
      "Web design studio serving small businesses across Australia. Hand-coded custom websites — {setup} down, {monthly}/month.",
    workAnswerFirst:
      "What kind of websites does JPBC build? Fast, hand-coded sites and web apps for everyday small businesses — clinics, cafés, salons, trades, tutoring centres, workshops, travel agents. Explore the live demos below and see the standard for yourself.",
    aboutH1: "A small studio that answers its own WhatsApp",
    aboutAnswerFirst:
      "Who is JPBC Web Designs? A founder-led web design studio that hand-codes websites for Australian small businesses. No account managers, no ticket systems — you message us, the person who built your site replies.",
    aboutStory: [
      "JPBC started the way most of our clients' businesses did: one person, one skill, and a lot of messages. We kept meeting shop owners, clinic managers, and trades who'd been quoted a small fortune for a website — or worse, paid it, and got a slow WordPress site that broke a year later with nobody answering the phone.",
      "That felt wrong. Building a good website for a small business isn't a five-figure problem. It's a craft problem: someone who knows what they're doing, sitting down and hand-coding a fast, clean site — then sticking around to keep it updated. So that's the business we built. {setup} down, {monthly} a month, everything included, and the person who wrote your code is the one replying to your messages.",
      "We stay deliberately small. Small means your 9pm “can we change the menu?” message gets a same-day fix, not a ticket number. Small means we remember when your busy season starts and that your promo banner needs to go up before the holidays. Small means we only take on work we can do properly.",
    ],
    aboutBeliefs: [
      { title: "Fast is a feature.", body: "If your site takes 5 seconds to load, nothing else about it matters." },
      { title: "Plain talk wins.", body: "We tell you what things cost and what they don't include. No “price on application”." },
      { title: "Hand-coded lasts.", body: "No plugins to update, nothing to hack, nothing that breaks while you sleep." },
      { title: "Local means local.", body: "We build for how your customers actually search and buy — on phones, on the go, in plain language." },
    ],
    blogIntro:
      "Practical advice on websites, Google rankings, and getting customers online — written for small business owners, not tech people.",
    blogComingSoon:
      "We're writing our first guides — starting with “How much should a small business website cost in Australia?” and “Why your shop needs more than a Facebook page.” Check back soon.",
    footerBlurb:
      "Hand-coded websites for Australian small businesses. {setup} down, {monthly}/month. Working remotely with clients nationwide.",
    footerHoursNote: "Mon–Fri 9am–6pm · Message anytime, we reply fast.",
    footerLegalLine: "Serving Australia (remote)",
    formNamePlaceholder: "Your name",
    formBusinessPlaceholder: "e.g. Brunswick Street Dental",
    formIntakeBusinessPlaceholder: "e.g. Northside Auto Repairs",
    formThanks: "Message received — thanks! We'll get back to you within one business day.",
    intakeThanks: "Thanks, {business}! 🎉",
    faqPayment:
      "Bank transfer (PayID or direct deposit). We invoice monthly and send a receipt with every payment for your records.",
    faqLanguages: {
      q: "Can you build the site in a language other than English?",
      a: "Yes — we build in English or any combination of languages your customers use. We write natural copy in each language, not machine translation.",
    },
    ctaSub: "{setup} down. Live in 7 days. You message us, the person who built your site replies.",
    notFound: {
      heading: "We can't find that page",
      body: "The page you're looking for doesn't exist — the link may be out of date, or the address might have a typo in it.",
      homeCta: "Back to home",
      reportCta: "Tell us what broke",
      waMessage: "Hi JPBC! I found a broken link on your site.",
    },
  },

  meta: {
    home: {
      title: "JPBC Web Designs - Small Business Web Design, Australia",
      description:
        "Hand-coded custom websites for Australian small businesses. {setup} down, {monthly}/month — domain, hosting, SSL, unlimited edits included. No WordPress, no five-figure agency quotes.",
    },
    pricing: {
      title: "Website Pricing Australia - {monthly}/month or {lumpSum} Lump Sum",
      description:
        "Honest website pricing for Australian small businesses: {setup} down {monthly}/month (domain, hosting, unlimited edits included) or lump sum from {lumpSum} + {care}/month care.",
    },
    work: {
      title: "Our Work - Websites for Small Businesses",
      description:
        "Hand-coded websites and web apps built by JPBC — clinics, cafés, trades, and more. Explore our live industry demo sites and see exactly what we build.",
    },
    about: {
      title: "About - A Small Studio That Answers Its Own Messages",
      description:
        "JPBC Web Designs is a founder-led web design studio serving Australian small businesses. You message us, the person who built your site replies. No account managers.",
    },
    faq: {
      title: "FAQ - Pricing, Ownership, Timelines & Edits",
      description:
        "Answers to the most common questions about JPBC Web Designs: what {monthly}/month includes, who owns the website and domain, what happens if you cancel, how fast we build, unlimited edits, and languages.",
    },
    blog: {
      title: "Blog - Web & Local SEO Tips for Australian Small Businesses",
      description:
        "Practical articles on websites, Google rankings, and getting customers online — written for Australian small business owners, not tech people.",
    },
    contact: {
      title: "Contact - Message Us or Send a Message",
      description:
        "Contact JPBC Web Designs. WhatsApp is fastest — a real person replies. Working remotely with small businesses across Australia.",
    },
    getStarted: {
      title: "Get Started - Tell Us About Your Business",
      description:
        "Start your website with JPBC in 60 seconds: five quick questions about your business, then we take it from there. {setup} down.",
    },
  },

  workExamples: {
    portfolioSlugs: [],
    showIndustryDemos: true,
    demosNote:
      "We're onboarding our first Australian clients now. Until their sites launch, these live demo builds show exactly the standard you'd get.",
  },

  pages: { services: false, locations: false },

  schema: {
    areaServed: { type: "Country", names: ["Australia"] },
  },
};
