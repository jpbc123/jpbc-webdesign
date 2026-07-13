import Link from "next/link";
import { locations } from "@/data/locations";
import { waLink, BUSINESS_EMAIL } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="starfield mt-20 bg-hero text-hero-ink">
      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="display text-xl">
            JPBC <span className="text-accent">Web Designs</span>
          </p>
          <p className="mt-1 hidden font-script text-lg text-accent dark:block">lepas kerja mode aktif ✦</p>
          <p className="mt-3 max-w-xs text-sm text-hero-muted">
            Hand-coded websites for Malaysian small businesses. RM0 down, RM179/month. Based in Petaling Jaya, serving the whole Klang Valley.
          </p>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-hero-muted">Services</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/services/web-design" className="hover:text-accent">Web Design</Link></li>
            <li><Link href="/services/seo" className="hover:text-accent">Local SEO</Link></li>
            <li><Link href="/services/google-business-profile" className="hover:text-accent">Google Business Profile</Link></li>
            <li><Link href="/pricing" className="hover:text-accent">Pricing</Link></li>
            <li><Link href="/work" className="hover:text-accent">Our Work</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-hero-muted">Locations</p>
          <ul className="space-y-2 text-sm">
            {locations.map((l) => (
              <li key={l.slug}>
                <Link href={`/locations/${l.slug}`} className="hover:text-accent">
                  Web Designer in {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-hero-muted">Get in touch</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                WhatsApp us now
              </a>
            </li>
            <li>
              <a href={`mailto:${BUSINESS_EMAIL}`} className="hover:text-accent">{BUSINESS_EMAIL}</a>
            </li>
            <li><Link href="/get-started" className="hover:text-accent">Get started</Link></li>
            <li><Link href="/contact" className="hover:text-accent">Contact</Link></li>
            <li><Link href="/faq" className="hover:text-accent">FAQ</Link></li>
          </ul>
          <p className="mt-4 text-xs text-hero-muted">Mon–Fri 9am–6pm · WhatsApp anytime, we reply cepat.</p>
        </div>
      </div>
      <div className="relative border-t border-white/10 py-5 text-center text-xs text-hero-muted">
        © {new Date().getFullYear()} JPBC Web Designs · Petaling Jaya, Selangor, Malaysia
      </div>
    </footer>
  );
}
