export type Service = {
  slug: string;
  name: string;
  /** <title> for the page */
  title: string;
  description: string;
  /** 2–3 sentence answer-first opener */
  answerFirst: string;
  problem: { heading: string; body: string };
  approach: { heading: string; points: { title: string; body: string }[] };
  outcome: { heading: string; body: string };
  malaysiaAngle: { heading: string; body: string };
  cta: string;
};

export const services: Service[] = [
  {
    slug: "web-design",
    name: "Web Design & Development",
    title: "Small Business Web Design Malaysia — Hand-Coded, RM179/month",
    description:
      "Custom, hand-coded websites for Malaysian small businesses. RM0 down, RM179/month including domain, hosting, SSL, and unlimited edits. No WordPress.",
    answerFirst:
      "How much does a small business website cost in Malaysia? With JPBC it's RM0 down and RM179/month — a custom-designed, hand-coded 5-page site including domain, hosting, SSL, and unlimited edits. No RM10,000 agency quotes, no DIY page builders.",
    problem: {
      heading: "The problem: agencies overcharge, DIY underdelivers",
      body: "Malaysian SMEs get squeezed from both sides. Agencies quote RM8,000–RM15,000 for a WordPress site stuffed with plugins that break, load slowly, and get hacked. DIY builders like Wix look cheap until you're three weekends deep and the site still looks like a template — because it is one. Either way, you end up with a slow site that doesn't rank and doesn't convert.",
    },
    approach: {
      heading: "Our approach: hand-coded, custom, subscription",
      points: [
        {
          title: "Custom design, not a template",
          body: "We design your site around your business — your services, your customers, your kawasan. Nothing is dragged from a theme marketplace.",
        },
        {
          title: "Hand-coded static files",
          body: "No WordPress, no page builders, no database to hack. Just clean HTML, CSS, and minimal JavaScript. That's why our sites load in under a second.",
        },
        {
          title: "Everything included, one monthly price",
          body: "Domain (.com or .com.my), hosting, SSL, and unlimited edits — all in the RM179/month. You WhatsApp a change, we make it. Usually same day.",
        },
      ],
    },
    outcome: {
      heading: "The outcome",
      body: "A website that loads before your competitor's finishes its cookie banner, ranks in local searches, and turns visitors into WhatsApp conversations. Live within 7 days of design approval, and it never goes stale because edits are free forever.",
    },
    malaysiaAngle: {
      heading: "Built for how Malaysians buy",
      body: "Malaysian customers research on their phones and buy over WhatsApp. Every site we build is mobile-first with click-to-chat WhatsApp buttons as the primary action, BM/English/Chinese content as needed, prices in RM, and Waze/Maps links that actually drop the pin at your shop.",
    },
    cta: "WhatsApp us about your website",
  },
  {
    slug: "seo",
    name: "Local SEO",
    title: "Local SEO Malaysia — Rank in 'Near Me' Searches | JPBC",
    description:
      "Local SEO for Malaysian small businesses from RM300/month. Rank in 'near me' searches with location pages, fast hand-coded sites, and BM + English content.",
    answerFirst:
      "What is local SEO and does your Malaysian business need it? Local SEO makes you show up when nearby customers search things like 'klinik near me' or 'workshop Puchong'. JPBC builds it in from RM300/month: location pages, fast site speed, and content in the languages your customers actually search in.",
    problem: {
      heading: "The problem: invisible when it matters most",
      body: "When someone in your area searches 'aircon service near me' at 2pm on a hot day, they call whoever shows up first. If that's not you, your competitor gets the job — even if you're closer, cheaper, and better. Most Malaysian SME sites have zero location signals, so Google has no idea where you serve.",
    },
    approach: {
      heading: "Our approach: location pages + speed + language",
      points: [
        {
          title: "Dedicated location pages",
          body: "A properly written page for each area you serve — 'Aircon Service in Subang Jaya', 'Aircon Service in PJ' — with genuinely local content, not copy-paste with the town name swapped.",
        },
        {
          title: "Speed as a ranking signal",
          body: "Google rewards fast sites, and ours load in under a second. That's a built-in edge over every WordPress competitor in your niche.",
        },
        {
          title: "BM + English content",
          body: "Malaysians search in both languages — 'kedai kereta near me' and 'car workshop near me' are different keywords. We write for both.",
        },
      ],
    },
    outcome: {
      heading: "The outcome",
      body: "More impressions in local searches, more profile views, more WhatsApp enquiries from people in your service area. Local SEO compounds: each month of consistent work builds on the last, and unlike ads, rankings don't vanish when you stop paying for clicks.",
    },
    malaysiaAngle: {
      heading: "The Klang Valley angle",
      body: "The Klang Valley is dozens of overlapping neighbourhoods — someone in Kelana Jaya searching 'near me' may see results from PJ, Subang, and Sunway. Our location-page strategy targets each kawasan you serve so you appear across all of them, not just your registered address.",
    },
    cta: "WhatsApp us about local SEO",
  },
  {
    slug: "google-business-profile",
    name: "Google Business Profile",
    title: "Google Business Profile Optimisation Malaysia | JPBC Web Designs",
    description:
      "Google Business Profile setup and optimisation for Malaysian small businesses — get into the local 3-pack, collect reviews, and turn Maps searches into customers.",
    answerFirst:
      "Why does your Google Business Profile matter? Because for most Malaysian small businesses it's seen more than the website itself — it's what appears in Google Maps and the local 3-pack. JPBC sets up, verifies, and optimises your profile so nearby customers find you, trust you, and WhatsApp you.",
    problem: {
      heading: "The problem: an empty or wrong profile costs you customers",
      body: "Half the Google Business Profiles in Malaysia are unclaimed, half-filled, or wrong — old opening hours, missing photos, the pin dropped on the wrong shoplot. Customers check the profile before they visit; if it looks abandoned or the pin sends them to the wrong block, they go elsewhere and may leave an angry review on the way.",
    },
    approach: {
      heading: "Our approach: claim, complete, optimise",
      points: [
        {
          title: "Claim and verify properly",
          body: "We handle claiming, verification, and cleaning up duplicate listings — the boring admin most owners give up on.",
        },
        {
          title: "Complete every field that matters",
          body: "Categories, services with prices, photos, opening hours, attributes, BM + English descriptions — profiles with complete info get dramatically more calls and direction requests.",
        },
        {
          title: "Connect it to a fast website",
          body: "A profile linked to a fast, professional site converts far better than one linked to nothing — and the site feeds Google the location signals that push you into the 3-pack.",
        },
      ],
    },
    outcome: {
      heading: "The outcome",
      body: "You show up in the map results when nearby customers search, your profile looks alive and trustworthy, and the 'WhatsApp', 'Call', and 'Directions' buttons all work. We also set you up with a simple review-collection routine, because steady reviews are the #1 local ranking factor you control.",
    },
    malaysiaAngle: {
      heading: "Made for Malaysian search habits",
      body: "Malaysians navigate by Waze and judge by reviews. We make sure your pin is exact (down to the right shoplot row), your review responses sound like a real person in the right language, and your profile answers the questions locals actually ask — 'ada parking tak?', 'halal ke?', 'open on public holiday?'",
    },
    cta: "WhatsApp us about your Google profile",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
