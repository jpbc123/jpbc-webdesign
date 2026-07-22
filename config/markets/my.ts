import type { Market } from "./types";
import { locations } from "@/data/locations";

// Malaysia — the default market, served from the root with no path prefix.
// Every string here is the copy that was previously hardcoded in components,
// so the Malaysian site renders exactly as it always has.

export const my: Market = {
  code: "my",
  label: "Malaysia",
  flag: "🇲🇾",
  locale: "en-MY",
  ogLocale: "en_MY",
  pathPrefix: "",
  enabled: true,

  currency: { symbol: "RM", code: "MYR", numberLocale: "en-MY" },

  pricing: {
    monthly: 179,
    setup: 0,
    lumpSum: 3500,
    lumpSumCare: 49,
    minimumMonths: 12,
    addons: { extraPage: 100, googleBusinessProfile: 500, localSeoMonthly: 300 },
  },

  contact: {
    whatsapp: "60122947847",
    phoneDisplay: "+60 12-294 7847",
    email: "hello@jpbcwebdesigns.com", // TODO: confirm email
    serviceArea: "Klang Valley, Malaysia",
    serviceAreaBody:
      "Based in Petaling Jaya, serving the whole Klang Valley — PJ, KL, Subang Jaya, Shah Alam, Puchong, Klang, and everywhere in between. Everything works over WhatsApp, so your exact location never slows us down.",
    hours: "Monday–Friday, 9am–6pm (MYT)",
    afterHoursNote: "WhatsApp anytime — we reply after hours more often than we should.",
  },

  phone: {
    dialCode: "60",
    // 01X-XXXXXXX(X) local format, or 601X... international format
    pattern: "^(?:60|0)1\\d{8,9}$",
    label: "Phone (Malaysian number)",
    placeholder: "012-345 6789",
    error: "Please enter a valid Malaysian number, e.g. 012-345 6789",
  },

  heroCopy: {
    badge: "{setup} down · {monthly}/month · Live in 7 days",
    headlineLead: "Small business web design, ",
    headlineHighlight: "Malaysian prices",
    subheadline:
      "We hand-code fast, custom websites for Malaysian small businesses — {setup} down and {monthly}/month, including domain, hosting, and unlimited edits. No WordPress. No page builders. No RM10,000 agency quotes.",
  },

  voice: {
    waDefaultMessage: "Hi JPBC! I'm interested in a website for my business.",
    domainLine: ".com or .com.my",
    homeWhatWeDoDesign:
      "Custom design around your business — your services, your customers, your kawasan. No templates.",
    homeWhatWeDoSeo:
      "Location pages and content that rank when customers search 'near me' — in BM and English.",
    homeWorkHeading: "Recent work",
    homeWorkIntro: "Real projects, all live — click through and see.",
    pricingQuestion: "How much does a small business website cost in Malaysia?",
    productDescription: "Custom, hand-coded 5-page website for Malaysian small businesses.",
    businessDescription:
      "Web design studio in Petaling Jaya, Malaysia. Hand-coded custom websites for small businesses — {setup} down, {monthly}/month.",
    workAnswerFirst:
      "What kind of websites does JPBC build? Fast, hand-coded sites and web apps for everyday Malaysian businesses — aircon teams, klinik, restoran, renovation contractors, tuition centres, workshops, travel agencies. Every project below is live; click through and see for yourself.",
    aboutH1: "A small studio that answers its own WhatsApp",
    aboutAnswerFirst:
      "Who is JPBC Web Designs? A founder-led web design studio in Petaling Jaya that hand-codes websites for Malaysian small businesses. No account managers, no ticket systems — you WhatsApp us, the person who built your site replies.",
    aboutStory: [
      "JPBC started the way most of our clients' businesses did: one person, one skill, and a lot of WhatsApp messages. We kept meeting kedai owners, clinic managers, and workshop bosses who'd been quoted RM10,000 for a website — or worse, paid it, and got a slow WordPress site that broke a year later with nobody answering the phone.",
      "That felt wrong. Building a good website for a small business isn't a RM10,000 problem. It's a craft problem: someone who knows what they're doing, sitting down and hand-coding a fast, clean site — then sticking around to keep it updated. So that's the business we built. {setup} down, {monthly} a month, everything included, and the person who wrote your code is the one replying to your messages.",
      "We stay deliberately small. Small means your 9pm “boss, can change the menu ah?” message gets a same-day fix, not a ticket number. Small means we remember that your busy season is December and your promo banner needs to go up before Raya. Small means we only take on work we can do properly.",
    ],
    aboutBeliefs: [
      { title: "Fast is a feature.", body: "If your site takes 5 seconds to load, nothing else about it matters." },
      { title: "Plain talk wins.", body: "We tell you what things cost and what they don't include. No “PM for price”." },
      { title: "Hand-coded lasts.", body: "No plugins to update, nothing to hack, nothing that breaks while you sleep." },
      { title: "Local means local.", body: "We build for how Malaysians actually search and buy — on phones, over WhatsApp, in more than one language." },
    ],
    blogIntro:
      "Practical advice on websites, Google rankings, and getting customers online — written for Malaysian business owners, not tech people.",
    blogComingSoon:
      "We're writing our first guides — starting with “How much should a small business website cost in Malaysia?” and “Why your kedai needs more than a Facebook page.” Check back soon.",
    footerBlurb:
      "Hand-coded websites for Malaysian small businesses. {setup} down, {monthly}/month. Based in Petaling Jaya, serving the whole Klang Valley.",
    footerHoursNote: "Mon–Fri 9am–6pm · WhatsApp anytime, we reply cepat.",
    footerLegalLine: "Petaling Jaya, Selangor, Malaysia",
    formNamePlaceholder: "Ali / Mei Ling / Kumar",
    formBusinessPlaceholder: "e.g. Restoran Selera Kampung",
    formIntakeBusinessPlaceholder: "e.g. Setia Alam Garden Services",
    formThanks: "Message received — terima kasih! We'll get back to you within one business day.",
    intakeThanks: "Terima kasih, {business}! 🎉",
    faqPayment:
      "FPX online banking. We invoice monthly and send a receipt with every payment for your records.",
    faqLanguages: {
      q: "Can you build the site in Bahasa Melayu or Chinese?",
      a: "Yes — we build in BM, English, Chinese, or any combination. We write natural copy in each language, not machine translation.",
    },
    ctaSub: "{setup} down. Live in 7 days. You WhatsApp us, the person who built your site replies.",
    notFound: {
      heading: "This page tak jumpa",
      body: "The page you're looking for doesn't exist — maybe the link is old, maybe it wandered off lepas kerja.",
      homeCta: "Back to home",
      reportCta: "Tell us what broke",
      waMessage: "Hi JPBC! I found a broken link on your site.",
    },
  },

  meta: {
    home: {
      title: "JPBC Web Designs - Small Business Web Design, Malaysian Prices",
      description:
        "Hand-coded custom websites for Malaysian small businesses. {setup} down, {monthly}/month — domain, hosting, SSL, unlimited edits included. No WordPress, no RM10,000 agency quotes.",
    },
    pricing: {
      title: "Website Pricing Malaysia - {monthly}/month or {lumpSum} Lump Sum",
      description:
        "Honest website pricing for Malaysian small businesses: {setup} down {monthly}/month (domain, hosting, unlimited edits included) or lump sum from {lumpSum} + {care}/month care.",
    },
    work: {
      title: "Our Work - Websites for Malaysian Small Businesses",
      description:
        "Hand-coded websites and web apps for Malaysian businesses — aircon services, klinik, restoran, renovation, tuition centres, workshops, and more. Every project is live, plus industry demo sites for dental clinics and gyms.",
    },
    about: {
      title: "About - A Small Studio in Petaling Jaya",
      description:
        "JPBC Web Designs is a founder-led web design studio in Petaling Jaya. You WhatsApp us, the person who built your site replies. No account managers, no ticket systems.",
    },
    faq: {
      title: "FAQ - Pricing, Ownership, Timelines & Edits",
      description:
        "Answers to the most common questions about JPBC Web Designs: what {monthly}/month includes, who owns the website and domain, what happens if you cancel, how fast we build, unlimited edits, and languages.",
    },
    blog: {
      title: "Blog - Web & Local SEO Tips for Malaysian Small Businesses",
      description:
        "Practical articles on websites, Google rankings, and getting customers online — written for Malaysian small business owners, not tech people.",
    },
    contact: {
      title: "Contact - WhatsApp Us or Send a Message",
      description:
        "Contact JPBC Web Designs in Petaling Jaya. WhatsApp is fastest — a real person replies. Serving the whole Klang Valley: PJ, KL, Subang, Shah Alam, Puchong, Klang.",
    },
    getStarted: {
      title: "Get Started - Tell Us About Your Business",
      description:
        "Start your website with JPBC in 60 seconds: five quick questions about your business, then we take it from there on WhatsApp. {setup} down.",
    },
  },

  workExamples: {
    portfolioSlugs: ["swift-audit", "fengshui-and-beyond", "setia-alam-garden-services"],
    showIndustryDemos: true,
  },

  pages: { services: true, locations: true },

  schema: {
    address: { locality: "Petaling Jaya", region: "Selangor", country: "MY" },
    areaServed: { type: "City", names: locations.map((l) => l.name) },
  },
};
