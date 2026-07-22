import type { Metadata, Viewport } from "next";
import { Source_Sans_3, Oswald, Yellowtail } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";

const sourceSans = Source_Sans_3({ subsets: ["latin"], variable: "--font-source-sans" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const yellowtail = Yellowtail({ subsets: ["latin"], weight: "400", variable: "--font-yellowtail" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "JPBC Web Designs - Small Business Web Design Malaysia, RM179/month",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Hand-coded custom websites for Malaysian small businesses. RM0 down, RM179/month — domain, hosting, SSL, and unlimited edits included. Based in Petaling Jaya, serving the Klang Valley.",
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
    { media: "(prefers-color-scheme: light)", color: "#f5f7fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1f3a" },
  ],
};

// Runs before paint: applies saved theme (or system preference) to avoid a flash.
const themeInit = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark")}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {/* TODO: Paste your analytics snippet here (e.g. Plausible/GA4) */}
      </head>
      {/* Nav/main/footer come from the market layouts (components/MarketShell),
          so every page renders the chrome for the market it belongs to. */}
      <body className={`${sourceSans.variable} ${oswald.variable} ${yellowtail.variable} font-body`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
