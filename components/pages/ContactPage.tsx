import type { Metadata } from "next";
import WhatsAppButton from "@/components/WhatsAppButton";
import ContactForm from "@/components/ContactForm";
import type { Market } from "@/config/markets/types";
import { marketMetadata } from "@/lib/seo";

export function contactMetadata(market: Market): Metadata {
  return marketMetadata(market, "contact", "/contact");
}

export default function ContactPage({ market }: { market: Market }) {
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pb-4 pt-16">
        <p className="plate mb-5">Contact</p>
        <h1 className="display text-balance text-[2.6rem] text-ink sm:text-6xl lg:text-7xl">Contact us</h1>
        {/* Answer-first for SEO/AEO */}
        <p className="mt-4 max-w-2xl text-lg text-muted">
          The fastest way to reach JPBC Web Designs is WhatsApp — a real person replies, usually within the hour during
          business hours. Prefer a form? That works too.
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl gap-10 px-6 py-10 lg:grid-cols-2">
        <div>
          <div className="board screws bg-sign-green p-8 text-sign-green-ink [--sign-glow:var(--sign-green-ink)]">
            <h2 className="display sign-lit text-3xl">WhatsApp — the fast lane</h2>
            <p className="mt-3 opacity-90">
              Tell us your business name and what you need. No forms, no waiting, no &ldquo;a representative will
              contact you shortly&rdquo;.
            </p>
            <div className="mt-6">
              <WhatsAppButton market={market} variant="yellow" />
            </div>
          </div>

          <div className="board mt-6 bg-surface p-8 text-sm text-muted">
            <h2 className="font-bold text-ink">Business hours</h2>
            <p className="mt-2">{market.contact.hours}</p>
            <p>{market.contact.afterHoursNote}</p>
            <h2 className="mt-6 font-bold text-ink">Email</h2>
            <p className="mt-2">
              <a href={`mailto:${market.contact.email}`} className="font-bold text-accent underline decoration-2 underline-offset-2">
                {market.contact.email}
              </a>
            </p>
            <h2 className="mt-6 font-bold text-ink">Service area</h2>
            <p className="mt-2">{market.contact.serviceAreaBody}</p>
          </div>
        </div>

        <div className="board bg-surface p-8">
          <h2 className="display text-2xl text-ink">Or send a message</h2>
          <p className="mt-2 text-sm text-muted">We&apos;ll reply on WhatsApp or email within one business day.</p>
          <ContactForm market={market} />
        </div>
      </section>
    </>
  );
}
