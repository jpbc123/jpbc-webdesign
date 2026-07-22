import Link from "next/link";
import { locations } from "@/data/locations";
import type { Market } from "@/config/markets/types";
import { enabledMarkets, SHARED_PAGE_PATHS } from "@/config/markets";
import { mpath, waLink } from "@/lib/market";
import MarketSwitcher from "./MarketSwitcher";

export default function Footer({ market }: { market: Market }) {
  const switcherMarkets = enabledMarkets.map((m) => ({
    code: m.code,
    label: m.label,
    flag: m.flag,
    locale: m.locale,
    pathPrefix: m.pathPrefix,
  }));

  return (
    <footer className="starfield mt-20 overflow-hidden bg-hero text-hero-ink">
      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="display text-xl">
            JPBC <span className="text-accent">Web Designs</span>
          </p>
          <p className="mt-1 hidden font-script text-lg text-accent dark:block">after hours</p>
          <p className="mt-3 max-w-xs text-sm text-hero-muted">{market.voice.footerBlurb}</p>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-hero-muted">
            {market.pages.services ? "Services" : "Explore"}
          </p>
          <ul className="space-y-2 text-sm">
            {market.pages.services && (
              <>
                <li><Link href={mpath(market, "/services/web-design")} className="hover:text-accent">Web Design</Link></li>
                <li><Link href={mpath(market, "/services/seo")} className="hover:text-accent">Local SEO</Link></li>
                <li><Link href={mpath(market, "/services/google-business-profile")} className="hover:text-accent">Google Business Profile</Link></li>
              </>
            )}
            <li><Link href={mpath(market, "/pricing")} className="hover:text-accent">Pricing</Link></li>
            <li><Link href={mpath(market, "/work")} className="hover:text-accent">Our Work</Link></li>
            {!market.pages.services && (
              <li><Link href={mpath(market, "/about")} className="hover:text-accent">About</Link></li>
            )}
          </ul>
        </div>

        {market.pages.locations && (
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-hero-muted">Locations</p>
            <ul className="space-y-2 text-sm">
              {locations.map((l) => (
                <li key={l.slug}>
                  <Link href={mpath(market, `/locations/${l.slug}`)} className="hover:text-accent">
                    Web Designer in {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-hero-muted">Get in touch</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={waLink(market)} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                WhatsApp us now
              </a>
            </li>
            <li>
              <a href={`mailto:${market.contact.email}`} className="hover:text-accent">{market.contact.email}</a>
            </li>
            <li><Link href={mpath(market, "/get-started")} className="hover:text-accent">Get started</Link></li>
            <li><Link href={mpath(market, "/contact")} className="hover:text-accent">Contact</Link></li>
            <li><Link href={mpath(market, "/faq")} className="hover:text-accent">FAQ</Link></li>
          </ul>
          <p className="mt-4 text-xs text-hero-muted">{market.voice.footerHoursNote}</p>
        </div>
      </div>
      <div className="relative border-t border-white/10 py-5 text-xs text-hero-muted">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} JPBC Web Designs · {market.voice.footerLegalLine}
          </p>
          <MarketSwitcher
            markets={switcherMarkets}
            current={market.code}
            currentPrefix={market.pathPrefix}
            sharedPaths={[...SHARED_PAGE_PATHS]}
          />
        </div>
      </div>
    </footer>
  );
}
