import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import type { Market } from "@/config/markets/types";
import { mpath } from "@/lib/market";
import { legalMetadata, OPERATOR, OPERATOR_REG_NO } from "@/lib/legal";

export const PRIVACY_EFFECTIVE = "22 October 2026";

export function privacyMetadata(market: Market): Metadata {
  return legalMetadata(
    market,
    "/privacy",
    "Privacy Policy",
    `How JPBC Web Designs, operated by ${OPERATOR} (${OPERATOR_REG_NO}), collects, uses and protects your personal data under Malaysia's PDPA 2010.`,
  );
}

const h2 = "display text-2xl text-ink";
const list = "mt-3 list-disc space-y-2 pl-6";
const link = "font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent";

export default function PrivacyPage({ market }: { market: Market }) {
  const email = market.contact.email;

  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pb-4 pt-16">
        <h1 className="display text-5xl text-ink sm:text-6xl">Privacy Policy</h1>
        {/* Answer-first for SEO/AEO */}
        <p className="mt-6 text-lg text-muted">
          The short version: we collect only what we need to reply to you and build your website, we never sell it, and
          you can ask us to see, correct or delete it at any time. Written for Malaysia&rsquo;s Personal Data Protection
          Act 2010 (PDPA).
        </p>
        <p className="mt-4 text-sm uppercase tracking-wider text-muted">Effective date: {PRIVACY_EFFECTIVE}</p>
      </section>

      <section className="mx-auto max-w-3xl space-y-10 px-6 py-10 text-muted">
        <div>
          <h2 className={h2}>1. Who we are</h2>
          <p className="mt-3">
            JPBC Web Designs is operated by {OPERATOR} ({OPERATOR_REG_NO}), Malaysia (&ldquo;we&rdquo;,
            &ldquo;us&rdquo; or &ldquo;our&rdquo;), the data user responsible for your personal data under the PDPA
            2010. This policy covers this website and our web design services.
          </p>
          <p className="mt-3">
            Our software products, MY Swift Audit and MyResit, have their own privacy notices on their own websites,
            which explain what those products collect and why.
          </p>
        </div>

        <div>
          <h2 className={h2}>2. Information we collect</h2>
          <ul className={list}>
            <li>
              <strong className="text-ink">What you send through our forms:</strong> your name, business name,
              industry, phone number, current website, the package you are interested in, and your message.
            </li>
            <li>
              <strong className="text-ink">Conversations:</strong> messages you send us by WhatsApp or email.
            </li>
            <li>
              <strong className="text-ink">Project material:</strong> the logo, photos, text and business details you
              give us to build your website, and the details needed to register your domain in your name.
            </li>
            <li>
              <strong className="text-ink">Billing records:</strong> invoices, payments and receipts.
            </li>
            <li>
              <strong className="text-ink">Usage data:</strong> anonymous, aggregated page-view statistics about how
              this website is used.
            </li>
          </ul>
        </div>

        <div>
          <h2 className={h2}>3. How we use your information</h2>
          <ul className={list}>
            <li>To reply to your enquiry and give you a quote</li>
            <li>To design, build, host and maintain your website and register your domain</li>
            <li>To invoice you and keep records required by law</li>
            <li>To improve this website</li>
          </ul>
          <p className="mt-3">We do not use your information for marketing purposes without your explicit consent.</p>
        </div>

        <div>
          <h2 className={h2}>4. Data sharing</h2>
          <p className="mt-3">
            We do not sell, rent, or trade your personal data to third parties. We share limited information only with
            the services we use to run our business:
          </p>
          <ul className={list}>
            <li>
              <strong className="text-ink">Vercel</strong> — hosting for this website, and its anonymous visitor
              statistics.
            </li>
            <li>
              <strong className="text-ink">WhatsApp (Meta)</strong> — if you message us on WhatsApp.
            </li>
            <li>
              <strong className="text-ink">Our email provider</strong> — if you email us.
            </li>
            <li>
              <strong className="text-ink">Domain registrars and hosting providers</strong> — to register your domain
              and host your website.
            </li>
            <li>
              <strong className="text-ink">Stripe</strong> — card payments for our software. Your card details go to
              Stripe, never to us.
            </li>
            <li>
              <strong className="text-ink">Legal requirements</strong> — when required by law, court order, or
              governmental regulation.
            </li>
          </ul>
          <p className="mt-3">
            Some of these services are outside Malaysia, so your data may be transferred abroad (PDPA section 129). We
            use them because they are needed to provide our services.
          </p>
        </div>

        <div>
          <h2 className={h2}>5. Data retention</h2>
          <p className="mt-3">
            We keep enquiries for as long as we are talking with you, and project and billing records for as long as
            you are a client and for as long afterwards as the law requires (Malaysian business records are generally
            kept for seven years). You can ask us to delete anything we no longer need.
          </p>
        </div>

        <div>
          <h2 className={h2}>6. Your rights under PDPA 2010</h2>
          <p className="mt-3">Under the Personal Data Protection Act 2010 of Malaysia, you have the right to:</p>
          <ul className={list}>
            <li>Access your personal data we hold</li>
            <li>Request correction of inaccurate or incomplete data</li>
            <li>Withdraw consent for data processing (subject to contractual obligations)</li>
            <li>Request deletion of your data</li>
            <li>Limit the processing of your personal data in certain circumstances</li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, contact us at{" "}
            <a href={`mailto:${email}`} className={link}>{email}</a>. We will respond within 21 days as required by
            PDPA 2010.
          </p>
        </div>

        <div>
          <h2 className={h2}>7. Cookies and local storage</h2>
          <p className="mt-3">
            This website does not use advertising cookies or tracking pixels. Your browser remembers your light or dark
            theme and the country you picked, so the site looks right on your next visit. Visitor statistics are
            anonymous and aggregated.
          </p>
        </div>

        <div>
          <h2 className={h2}>8. Security</h2>
          <p className="mt-3">
            This website is served over encrypted connections (HTTPS), and we limit access to your information to the
            people who need it to work on your project. No method of transmission over the internet is 100% secure; if
            a breach affects you, we will tell you.
          </p>
        </div>

        <div>
          <h2 className={h2}>9. Changes to this policy</h2>
          <p className="mt-3">
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal
            requirements. The effective date above shows when it last changed; if a change matters, we will tell our
            clients directly.
          </p>
        </div>

        <div>
          <h2 className={h2}>10. Contact us</h2>
          <p className="mt-3">
            Questions or concerns about this policy or how we handle your data: email{" "}
            <a href={`mailto:${email}`} className={link}>{email}</a>. Our{" "}
            <a href={mpath(market, "/terms")} className={link}>Terms of Service</a> set out the rest of our agreement
            with you.
          </p>
        </div>
      </section>

      <CtaBand
        market={market}
        heading="Questions about your data?"
        sub="WhatsApp us — a real person replies, usually within the hour."
        waMessage="Hi JPBC! I have a question about my data."
      />
    </>
  );
}
