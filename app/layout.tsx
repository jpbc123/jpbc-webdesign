import type { Metadata } from "next";
import { Inter, Oswald, Caveat } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "JPBC Web Designs — Small Business Web Design Malaysia, RM179/month",
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
      <body className={`${inter.variable} ${oswald.variable} ${caveat.variable} font-body`}>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
