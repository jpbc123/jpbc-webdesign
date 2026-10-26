import Link from "next/link";
import { locations } from "@/data/locations";
import type { Market } from "@/config/markets/types";
import { enabledMarkets, SHARED_PAGE_PATHS } from "@/config/markets";
import { mpath, waLink } from "@/lib/market";
import { OPERATOR, OPERATOR_REG_NO } from "@/lib/legal";
import Logo from "./Logo";
import MarketSwitcher from "./MarketSwitcher";

const headingClass = "mb-4 text-sm font-bold text-ink";
const linkClass = "text-muted transition-colors hover:text-accent-text";

export default function Footer({ market }: { market: Market }) {
  const switcherMarkets = enabledMarkets.map((m) => ({
    code: m.code,
    label: m.label,
    flag: m.flag,
    locale: m.locale,
    pathPrefix: m.pathPrefix,
  }));

  return (
    <footer className="mt-24 border-t border-line bg-surface-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo afterHours="always" />
          <p className="mt-5 max-w-xs text-sm text-muted">{market.voice.footerBlurb}</p>
        </div>

        <div>
          <p className={headingClass}>{market.pages.services ? "Services" : "Explore"}</p>
          <ul className="space-y-2 text-sm">
            {market.pages.services && (
              <>
                <li><Link href={mpath(market, "/services/web-design")} className={linkClass}>Web Design</Link></li>
                <li><Link href={mpath(market, "/services/seo")} className={linkClass}>Local SEO</Link></li>
                <li><Link href={mpath(market, "/services/google-business-profile")} className={linkClass}>Google Business Profile</Link></li>
              </>
            )}
            <li><Link href={mpath(market, "/pricing")} className={linkClass}>Pricing</Link></li>
            <li><Link href={mpath(market, "/work")} className={linkClass}>Our Work</Link></li>
            <li><Link href={mpath(market, "/blog")} className={linkClass}>Blog</Link></li>
            {!market.pages.services && (
              <li><Link href={mpath(market, "/about")} className={linkClass}>About</Link></li>
            )}
          </ul>
        </div>

        {market.pages.locations && (
          <div>
            <p className={headingClass}>Areas</p>
            <ul className="space-y-2 text-sm">
              {locations.map((l) => (
                <li key={l.slug}>
                  <Link href={mpath(market, `/locations/${l.slug}`)} className={linkClass}>
                    Web Designer in {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <p className={headingClass}>Get in touch</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={waLink(market)} target="_blank" rel="noopener noreferrer" className={linkClass}>
                WhatsApp us now
              </a>
            </li>
            <li>
              <a href={`mailto:${market.contact.email}`} className={linkClass}>{market.contact.email}</a>
            </li>
            <li><Link href={mpath(market, "/get-started")} className={linkClass}>Get started</Link></li>
            <li><Link href={mpath(market, "/contact")} className={linkClass}>Contact</Link></li>
            <li><Link href={mpath(market, "/faq")} className={linkClass}>FAQ</Link></li>
            <li><Link href={mpath(market, "/terms")} className={linkClass}>Terms of Service</Link></li>
            <li><Link href={mpath(market, "/privacy")} className={linkClass}>Privacy Policy</Link></li>
          </ul>
          <p className="mt-4 text-xs text-muted">{market.voice.footerHoursNote}</p>
        </div>
      </div>

      <div className="border-t border-line py-5 text-xs text-muted">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <p>
              © {new Date().getFullYear()} JPBC Web Designs · {market.voice.footerLegalLine}
            </p>
            <p className="mt-1">
              JPBC Web Designs is operated by {OPERATOR} ({OPERATOR_REG_NO})
            </p>
          </div>
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
