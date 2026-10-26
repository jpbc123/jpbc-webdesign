import type { Metadata, Viewport } from "next";
import { Bungee, Plus_Jakarta_Sans, Yellowtail } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";

// One friendly sans for everything, headlines included. Bungee (sign
// lettering) and Yellowtail (neon script) appear only in the logo lockup.
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });
const bungee = Bungee({ subsets: ["latin"], weight: "400", variable: "--font-bungee" });
const yellowtail = Yellowtail({ subsets: ["latin"], weight: "400", variable: "--font-yellowtail" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "JPBC Web Designs - Small Business Web Design Malaysia, RM179/month",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Hand-coded custom websites for Malaysian small businesses. RM0 down, RM179/month — domain, hosting, SSL and 1 hour of edits a month included. Based in Shah Alam, serving Kuala Lumpur and the Klang Valley.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_MY",
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
  // SVG first for crisp tabs (and its own dark-scheme variant), .ico as the
  // fallback for browsers that don't take SVG favicons.
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

// Tints mobile browser chrome to match whichever palette is showing.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5efe6" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

// Runs before paint: applies saved theme (or system preference) to avoid a flash.
const themeInit = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark")}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      // Font variables live on <html> (not <body>) because the theme tokens in
      // globals.css that reference them are resolved at :root.
      className={`${jakarta.variable} ${bungee.variable} ${yellowtail.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {/* TODO: Paste your analytics snippet here (e.g. Plausible/GA4) */}
      </head>
      {/* Nav/main/footer come from the market layouts (components/MarketShell),
          so every page renders the chrome for the market it belongs to. */}
      <body className="font-body">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
