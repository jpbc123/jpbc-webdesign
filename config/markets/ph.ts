import type { Market } from "./types";

// Philippines — served from /ph. Remote-only for now, so no street address and
// no city pages. Copy is plain English: no Manglish, no Malaysian references.
//
// Prices are set for this market on their own merits — they are NOT the
// Malaysian numbers run through an exchange rate.
// TODO: confirm the lump-sum and add-on numbers before promoting /ph.

const PH_WHATSAPP =
  process.env.NEXT_PUBLIC_PH_WHATSAPP || process.env.PH_WHATSAPP || "60122947847";

export const ph: Market = {
  code: "ph",
  label: "Philippines",
  flag: "🇵🇭",
  locale: "en-PH",
  ogLocale: "en_PH",
  pathPrefix: "/ph",
  enabled: true,

  currency: { symbol: "₱", code: "PHP", numberLocale: "en-PH" },

  pricing: {
    monthly: 1400,
    setup: 0,
    lumpSum: 28000,
    lumpSumCare: 390,
    minimumMonths: 12,
    addons: { extraPage: 800, googleBusinessProfile: 4000, localSeoMonthly: 2400 },
  },

  contact: {
    whatsapp: PH_WHATSAPP,
    phoneDisplay: `+${PH_WHATSAPP}`,
    email: "hello@jpbcwebdesigns.com",
    serviceArea: "Philippines (remote)",
    serviceAreaBody:
      "We work with businesses anywhere in the Philippines (remote) — Metro Manila, Cebu, Davao, and every province in between. Everything happens over WhatsApp and email, so where you are never slows the project down.",
    hours: "Monday–Friday, 9am–6pm (PHT)",
    afterHoursNote: "WhatsApp anytime — we often reply outside business hours too.",
  },

  phone: {
    dialCode: "63",
    // 09XX XXX XXXX local format, or 639XX... international format
    pattern: "^(?:63|0)9\\d{9}$",
    label: "Phone (Philippine number)",
    placeholder: "0917 123 4567",
    error: "Please enter a valid Philippine mobile number, e.g. 0917 123 4567",
  },

  heroCopy: {
    badge: "{setup} down · {monthly}/month · Live in 7 days",
    headlineLead: "Small business web design, ",
    headlineHighlight: "Philippine prices",
    subheadline:
      "We hand-code fast, custom websites for Philippine small businesses — {setup} down and {monthly}/month, including domain, hosting, and unlimited edits. No WordPress. No page builders. No six-figure agency quotes.",
  },

  voice: {
    waDefaultMessage: "Hi JPBC! I'm interested in a website for my business.",
    domainLine: ".com or .ph",
    homeWhatWeDoDesign:
      "Custom design around your business — your services, your customers, your area. No templates.",
    homeWhatWeDoSeo:
      "Location pages and content that rank when customers search 'near me' in your city.",
    homeWorkHeading: "What we build",
    homeWorkIntro: "Live demo sites showing exactly what we build — click through and see.",
    pricingQuestion: "How much does a small business website cost in the Philippines?",
    productDescription: "Custom, hand-coded 5-page website for Philippine small businesses.",
    businessDescription:
      "Web design studio serving small businesses across the Philippines. Hand-coded custom websites — {setup} down, {monthly}/month.",
    workAnswerFirst:
      "What kind of websites does JPBC build? Fast, hand-coded sites and web apps for everyday small businesses — clinics, restaurants, salons, contractors, tutorial centres, workshops, travel agencies. Explore the live demos below and see the standard for yourself.",
    aboutH1: "A small studio that answers its own WhatsApp",
    aboutAnswerFirst:
      "Who is JPBC Web Designs? A founder-led web design studio that hand-codes websites for small businesses in the Philippines. No account managers, no ticket systems — you WhatsApp us, the person who built your site replies.",
    aboutStory: [
      "JPBC started the way most of our clients' businesses did: one person, one skill, and a lot of WhatsApp messages. We kept meeting shop owners, clinic managers, and workshop bosses who'd been quoted a small fortune for a website — or worse, paid it, and got a slow WordPress site that broke a year later with nobody answering the phone.",
      "That felt wrong. Building a good website for a small business isn't a six-figure problem. It's a craft problem: someone who knows what they're doing, sitting down and hand-coding a fast, clean site — then sticking around to keep it updated. So that's the business we built. {setup} down, {monthly} a month, everything included, and the person who wrote your code is the one replying to your messages.",
      "We stay deliberately small. Small means your 9pm “can we change the menu?” message gets a same-day fix, not a ticket number. Small means we remember when your busy season starts and that your promo banner needs to go up before the holidays. Small means we only take on work we can do properly.",
    ],
    aboutBeliefs: [
      { title: "Fast is a feature.", body: "If your site takes 5 seconds to load, nothing else about it matters." },
      { title: "Plain talk wins.", body: "We tell you what things cost and what they don't include. No “PM for price”." },
      { title: "Hand-coded lasts.", body: "No plugins to update, nothing to hack, nothing that breaks while you sleep." },
      { title: "Local means local.", body: "We build for how your customers actually search and buy — on phones, over chat, in the language they use." },
    ],
    blogIntro:
      "Practical advice on websites, Google rankings, and getting customers online — written for small business owners, not tech people.",
    blogComingSoon:
      "We're writing our first guides — starting with “How much should a small business website cost in the Philippines?” and “Why your shop needs more than a Facebook page.” Check back soon.",
    footerBlurb:
      "Hand-coded websites for Philippine small businesses. {setup} down, {monthly}/month. Working remotely with clients nationwide.",
    footerHoursNote: "Mon–Fri 9am–6pm · WhatsApp anytime, we reply fast.",
    footerLegalLine: "Serving the Philippines (remote)",
    formNamePlaceholder: "Your name",
    formBusinessPlaceholder: "e.g. Lola Rosa Kitchen",
    formIntakeBusinessPlaceholder: "e.g. Bright Smile Dental Cebu",
    formThanks: "Message received — thank you! We'll get back to you within one business day.",
    intakeThanks: "Thank you, {business}! 🎉",
    faqPayment:
      "Bank transfer, GCash, or Maya. We invoice monthly and send a receipt with every payment for your records.",
    faqLanguages: {
      q: "Can you build the site in Filipino as well as English?",
      a: "Yes — we build in English, Filipino, or a mix of both. We write natural copy in each language, not machine translation.",
    },
    ctaSub: "{setup} down. Live in 7 days. You WhatsApp us, the person who built your site replies.",
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
      title: "JPBC Web Designs - Small Business Web Design, Philippines",
      description:
        "Hand-coded custom websites for Philippine small businesses. {setup} down, {monthly}/month — domain, hosting, SSL, unlimited edits included. No WordPress, no six-figure agency quotes.",
    },
    pricing: {
      title: "Website Pricing Philippines - {monthly}/month or {lumpSum} Lump Sum",
      description:
        "Honest website pricing for Philippine small businesses: {setup} down {monthly}/month (domain, hosting, unlimited edits included) or lump sum from {lumpSum} + {care}/month care.",
    },
    work: {
      title: "Our Work - Websites for Small Businesses",
      description:
        "Hand-coded websites and web apps built by JPBC — clinics, restaurants, services, and more. Explore our live industry demo sites and see exactly what we build.",
    },
    about: {
      title: "About - A Small Studio That Answers Its Own WhatsApp",
      description:
        "JPBC Web Designs is a founder-led web design studio serving Philippine small businesses. You WhatsApp us, the person who built your site replies. No account managers.",
    },
    faq: {
      title: "FAQ - Pricing, Ownership, Timelines & Edits",
      description:
        "Answers to the most common questions about JPBC Web Designs: what {monthly}/month includes, who owns the website and domain, what happens if you cancel, how fast we build, unlimited edits, and languages.",
    },
    blog: {
      title: "Blog - Web & Local SEO Tips for Philippine Small Businesses",
      description:
        "Practical articles on websites, Google rankings, and getting customers online — written for Philippine small business owners, not tech people.",
    },
    contact: {
      title: "Contact - WhatsApp Us or Send a Message",
      description:
        "Contact JPBC Web Designs. WhatsApp is fastest — a real person replies. Working remotely with small businesses across the Philippines.",
    },
    getStarted: {
      title: "Get Started - Tell Us About Your Business",
      description:
        "Start your website with JPBC in 60 seconds: five quick questions about your business, then we take it from there on WhatsApp. {setup} down.",
    },
  },

  workExamples: {
    portfolioSlugs: [],
    showIndustryDemos: true,
    demosNote:
      "We're onboarding our first Philippine clients now. Until their sites launch, these live demo builds show exactly the standard you'd get.",
  },

  // Service and city pages need market-specific copy written first — see the
  // "adding a market" notes in config/markets/index.ts.
  pages: { services: false, locations: false },

  schema: {
    areaServed: { type: "Country", names: ["Philippines"] },
  },
};
