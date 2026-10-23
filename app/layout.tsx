import type { Metadata, Viewport } from "next";
import { Archivo, Bungee, Yellowtail } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";

// Archivo carries everything from body copy to the wide sign-painter headlines
// (via its wdth axis). Bungee is the signboard lettering.
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo" });
const bungee = Bungee({ subsets: ["latin"], weight: "400", variable: "--font-bungee" });
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
    { media: "(prefers-color-scheme: light)", color: "#f3ead8" },
    { media: "(prefers-color-scheme: dark)", color: "#13110e" },
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
      className={`${archivo.variable} ${bungee.variable} ${yellowtail.variable}`}
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
