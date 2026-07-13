// The local SEO engine. Add a new object here and the site automatically
// gets a new /locations/[slug] page, sitemap entry, and nav dropdown item —
// no layout code changes needed.

export type Location = {
  slug: string;
  name: string;
  /** Short label for the nav dropdown */
  short?: string;
  /** Locally-flavored intro paragraph under the H1 */
  intro: string;
  /** 2–3 sentence answer-first paragraph for SEO/AEO */
  answerFirst: string;
  /** A few neighbourhoods / landmarks to make the copy feel local */
  areas: string[];
  /** Location-specific FAQ entries (merged with shared ones on the page) */
  faqs: { q: string; a: string }[];
};

export const locations: Location[] = [
  {
    slug: "petaling-jaya",
    name: "Petaling Jaya",
    short: "PJ",
    intro:
      "PJ is home base for us — our studio is here, and most of our first clients were PJ businesses: aircon specialists in SS2, klinik pergigian in Damansara, kedai makan along Section 17. We know how PJ customers search, and we build sites that show up when they do.",
    answerFirst:
      "Looking for a web designer in Petaling Jaya? JPBC Web Designs is a PJ-based studio that hand-codes fast, custom websites for small businesses — RM0 down and RM179/month, including domain, hosting, and unlimited edits.",
    areas: ["SS2", "Damansara Utama", "Section 17", "Kelana Jaya", "Bandar Utama", "Kota Damansara"],
    faqs: [
      {
        q: "Do you meet clients in Petaling Jaya face to face?",
        a: "Yes — we're based in PJ, so if you prefer to discuss over kopi instead of WhatsApp, we can arrange a meetup at your shop or a mamak nearby. Most clients handle everything over WhatsApp though; it's faster.",
      },
      {
        q: "Can you help my PJ business show up in 'near me' searches?",
        a: "That's exactly what our Google Business Profile and local SEO add-ons are for. We optimise your profile, build location-relevant content, and make sure your site loads fast — all three matter for 'web designer near me' style searches.",
      },
    ],
  },
  {
    slug: "kuala-lumpur",
    name: "Kuala Lumpur",
    short: "KL",
    intro:
      "KL businesses compete with everyone — big brands, franchises, and a thousand other kedai one street over. A fast, professional website is how a small KL business punches above its weight. We build them for cafes in TTDI, tuition centres in Cheras, workshops in Kepong, and everything in between.",
    answerFirst:
      "Need a web designer in Kuala Lumpur? JPBC Web Designs builds hand-coded, custom websites for KL small businesses from RM0 down and RM179/month — no WordPress, no templates, loads in under a second.",
    areas: ["Cheras", "TTDI", "Kepong", "Setapak", "Bangsar", "Mont Kiara"],
    faqs: [
      {
        q: "I run a small business in KL — is RM179/month really all I pay?",
        a: "For the standard 5-page site, yes. Domain, hosting, SSL, unlimited edits, and WhatsApp support are all included. Add-ons like extra pages or local SEO are optional and priced separately.",
      },
      {
        q: "Do you only serve certain areas of KL?",
        a: "No — everything from Sentul to Sri Petaling. Since we work over WhatsApp and email, your exact neighbourhood doesn't matter. We serve the whole Klang Valley.",
      },
    ],
  },
  {
    slug: "subang-jaya",
    name: "Subang Jaya",
    intro:
      "From SS15's food scene to USJ's endless rows of shoplots, Subang is packed with small businesses that deserve better than a Facebook page. We build proper websites for Subang tuition centres, klinik, salons, and service businesses — sites that load fast and rank locally.",
    answerFirst:
      "Searching for a web designer in Subang Jaya? JPBC Web Designs hand-codes custom small business websites for RM0 down and RM179/month — including domain, hosting, and unlimited edits, with support over WhatsApp.",
    areas: ["SS15", "USJ", "Bandar Sunway", "Putra Heights", "SS18"],
    faqs: [
      {
        q: "My Subang customers mostly find me on Instagram. Why do I need a website?",
        a: "Instagram is rented land — the algorithm decides who sees you. A website you own ranks on Google when people search 'salon USJ' or 'tuition SS15', works as your menu/price list, and gives customers a place to verify you're legit before they WhatsApp you.",
      },
      {
        q: "Can the site be in both English and BM?",
        a: "Yes — we build in BM, English, Chinese, or a mix. For most Subang businesses we recommend English-first with BM where it counts, but it's your call.",
      },
    ],
  },
  {
    slug: "shah-alam",
    name: "Shah Alam",
    intro:
      "Shah Alam runs on SMEs — workshops in Section 26, kedai in Seksyen 7, factories and services all over. Most still have no website or an outdated one from 2015. We fix that with fast, hand-coded sites that match how Shah Alam customers actually search: on their phones, in BM and English.",
    answerFirst:
      "Looking for a web designer in Shah Alam? JPBC Web Designs builds fast, hand-coded websites for Shah Alam small businesses — RM0 down, RM179/month, everything included. BM and English content, optimised for mobile.",
    areas: ["Seksyen 7", "Seksyen 13", "Setia Alam", "Kota Kemuning", "Bukit Jelutong"],
    faqs: [
      {
        q: "Boleh buat website dalam Bahasa Melayu?",
        a: "Boleh, memang selalu buat. Ramai pelanggan Shah Alam pilih website dwibahasa — BM untuk pelanggan tempatan, English untuk corporate clients. Kami tulis copy yang natural, bukan Google Translate.",
      },
      {
        q: "I run a workshop — do I really need more than a Facebook page?",
        a: "A website ranks on Google Maps and search when someone's car breaks down and they search 'workshop Shah Alam'. Facebook posts don't. Plus your pricing, services, and location are always one click away, not buried in a feed.",
      },
    ],
  },
  {
    slug: "puchong",
    name: "Puchong",
    intro:
      "Puchong grew fast, and the competition grew with it — every row of shoplots in Bandar Puteri has three of everything. The businesses that win the Google search win the customer. We build Puchong businesses fast, professional sites that rank and convert.",
    answerFirst:
      "Need a web designer in Puchong? JPBC Web Designs hand-codes custom websites for Puchong small businesses from RM0 down and RM179/month — fast-loading, mobile-first, and built to rank in local searches.",
    areas: ["Bandar Puteri", "Puchong Jaya", "Bandar Kinrara", "Puchong Utama", "Setia Walk"],
    faqs: [
      {
        q: "How long until my Puchong business shows up on Google?",
        a: "The site itself gets indexed within days. Ranking for competitive local terms takes longer — typically a few months of consistent local SEO. That's why we offer Google Business Profile optimisation and local SEO pages as add-ons.",
      },
      {
        q: "Can you add online booking for my Puchong salon/clinic?",
        a: "Yes — booking and e-commerce features are custom-quoted add-ons on top of the base package. WhatsApp us with what you need and we'll give you a straight answer on price.",
      },
    ],
  },
  {
    slug: "klang",
    name: "Klang",
    intro:
      "Klang businesses are some of the most established in the Klang Valley — decades-old kedai, family-run restaurants, port-related services. Established doesn't have to mean invisible online. We give Klang businesses websites that match their reputation: solid, fast, and easy to find.",
    answerFirst:
      "Looking for a web designer in Klang? JPBC Web Designs builds hand-coded custom websites for Klang small businesses — RM0 down and RM179/month including domain, hosting, SSL, and unlimited edits.",
    areas: ["Bandar Bukit Tinggi", "Klang Town", "Bukit Raja", "Kapar", "Port Klang"],
    faqs: [
      {
        q: "My family business has run fine without a website for 30 years. Why now?",
        a: "Your longtime customers know you — but their kids search Google. A website makes sure the next generation finds you instead of the new competitor with good SEO. It also works as a 24/7 storefront for your menu, price list, and location.",
      },
      {
        q: "Do you handle everything, or do I need to be tech-savvy?",
        a: "We handle everything — domain, hosting, content, updates. You WhatsApp us what you want changed, we change it. That's the whole point of the RM179/month plan.",
      },
    ],
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}
