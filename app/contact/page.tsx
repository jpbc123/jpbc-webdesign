import type { Metadata } from "next";
import WhatsAppButton from "@/components/WhatsAppButton";
import ContactForm from "./ContactForm";
import { BUSINESS_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact - WhatsApp Us or Send a Message",
  description:
    "Contact JPBC Web Designs in Petaling Jaya. WhatsApp is fastest — a real person replies. Serving the whole Klang Valley: PJ, KL, Subang, Shah Alam, Puchong, Klang.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pb-4 pt-16">
        <h1 className="display text-5xl text-ink sm:text-6xl">Contact us</h1>
        {/* Answer-first for SEO/AEO */}
        <p className="mt-4 max-w-2xl text-lg text-muted">
          The fastest way to reach JPBC Web Designs is WhatsApp — a real person replies, usually within the hour during
          business hours. Prefer a form? That works too.
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl gap-10 px-6 py-10 lg:grid-cols-2">
        <div>
          <div className="rounded-3xl border-2 border-accent/40 bg-surface p-8">
            <h2 className="display text-2xl text-ink">WhatsApp — the fast lane</h2>
            <p className="mt-3 text-muted">
              Tell us your business name and what you need. No forms, no waiting, no &ldquo;a representative will
              contact you shortly&rdquo;.
            </p>
            <div className="mt-6">
              <WhatsAppButton />
            </div>
          </div>

          <div className="glow-card mt-6 rounded-3xl border border-line bg-surface p-8 text-sm text-muted">
            <h2 className="font-bold text-ink">Business hours</h2>
            <p className="mt-2">Monday–Friday, 9am–6pm (MYT)</p>
            <p>WhatsApp anytime — we reply after hours more often than we should.</p>
            <h2 className="mt-6 font-bold text-ink">Email</h2>
            <p className="mt-2">
              <a href={`mailto:${BUSINESS_EMAIL}`} className="text-accent hover:underline">{BUSINESS_EMAIL}</a>
            </p>
            <h2 className="mt-6 font-bold text-ink">Service area</h2>
            <p className="mt-2">
              Based in Petaling Jaya, serving the whole Klang Valley — PJ, KL, Subang Jaya, Shah Alam, Puchong, Klang,
              and everywhere in between. Everything works over WhatsApp, so your exact location never slows us down.
            </p>
          </div>
        </div>

        <div className="glow-card rounded-3xl border border-line bg-surface p-8">
          <h2 className="display text-2xl text-ink">Or send a message</h2>
          <p className="mt-2 text-sm text-muted">We&apos;ll reply on WhatsApp or email within one business day.</p>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
