import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import type { Market } from "@/config/markets/types";
import { mpath, price } from "@/lib/market";
import { legalMetadata, OPERATOR, OPERATOR_REG_NO } from "@/lib/legal";

export const TERMS_EFFECTIVE = "22 October 2026";

export function termsMetadata(market: Market): Metadata {
  return legalMetadata(
    market,
    "/terms",
    "Terms of Service",
    `Terms for JPBC Web Designs and its products, MY Swift Audit and MyResit. Operated by ${OPERATOR} (${OPERATOR_REG_NO}). All sales are final.`,
  );
}

const h2 = "display text-2xl text-ink";
const list = "mt-3 list-disc space-y-2 pl-6";
const link = "font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent";

export default function TermsPage({ market }: { market: Market }) {
  const { pricing, contact } = market;
  const email = contact.email;

  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pb-4 pt-16">
        <h1 className="display text-5xl text-ink sm:text-6xl">Terms of Service</h1>
        {/* Answer-first for SEO/AEO */}
        <p className="mt-6 text-lg text-muted">
          The short version: JPBC Web Designs and its products, MY Swift Audit and MyResit, are run by {OPERATOR} (
          {OPERATOR_REG_NO}), a business registered in Malaysia. All sales are final — we do not offer refunds. Details
          below.
        </p>
        <p className="mt-4 text-sm uppercase tracking-wider text-muted">Effective date: {TERMS_EFFECTIVE}</p>
      </section>

      <section className="mx-auto max-w-3xl space-y-10 px-6 py-10 text-muted">
        <div>
          <h2 className={h2}>1. Who we are</h2>
          <p className="mt-3">
            JPBC Web Designs, MY Swift Audit and MyResit are operated by {OPERATOR} ({OPERATOR_REG_NO}), a business
            registered in Malaysia (&ldquo;we&rdquo;, &ldquo;us&rdquo;). These Terms are an agreement between you and us.
            By buying from us or using any of our services, you agree to them. If you do not agree, please do not use
            our services.
          </p>
        </div>

        <div>
          <h2 className={h2}>2. What these Terms cover</h2>
          <ul className={list}>
            <li>
              <strong className="text-ink">Web design services</strong> sold on this website: websites, hosting and
              care, edits, and add-ons.
            </li>
            <li>
              <strong className="text-ink">MY Swift Audit</strong> (
              <a href="https://myswiftaudit.com" className={link}>myswiftaudit.com</a>): audit report generation
              software for Malaysian audit and accounting firms.
            </li>
            <li>
              <strong className="text-ink">MyResit</strong> (myresit.com.my): a receipt archive that reads, stores and
              exports receipts for individuals and businesses in Malaysia.
            </li>
          </ul>
          <p className="mt-3">
            Each product also has its own terms of service and privacy notice, shown on its website. Where a
            product&rsquo;s own terms say something different about that product, its own terms apply. Anything they do
            not cover is covered here.
          </p>
        </div>

        <div>
          <h2 className={h2}>3. Web design services</h2>
          <ul className={list}>
            <li>
              <strong className="text-ink">Monthly plan:</strong> {price(market, pricing.setup)} down and{" "}
              {price(market, pricing.monthly)} a month, including domain, hosting, SSL and unlimited content edits.
              The first {pricing.minimumMonths} months are a minimum term; after that you can cancel anytime. The
              website is part of the subscription: when the subscription ends, the site goes offline. A one-time
              buyout is available on request.
            </li>
            <li>
              <strong className="text-ink">Lump sum:</strong> from {price(market, pricing.lumpSum)} one-time, plus{" "}
              {price(market, pricing.lumpSumCare)} a month for hosting and care. You own the site code outright.
            </li>
            <li>
              <strong className="text-ink">Add-ons</strong> such as extra pages, Google Business Profile setup and
              local SEO are quoted and agreed before any work starts. We always tell you before anything costs extra.
            </li>
            <li>
              Your domain is registered in your name and stays yours. Your logo, photos and text are always yours.
            </li>
            <li>
              Timelines (such as &ldquo;live within 7 days of design approval&rdquo;) are our usual pace, not a
              guarantee; they depend on you supplying content and approvals on time.
            </li>
          </ul>
          <p className="mt-3">
            Current prices are on our <a href={mpath(market, "/pricing")} className={link}>pricing page</a>.
          </p>
        </div>

        <div>
          <h2 className={h2}>4. Software subscriptions</h2>
          <p className="mt-3">
            MY Swift Audit and MyResit are sold as subscriptions, paid by card through Stripe. Their plans and prices are
            on each product&rsquo;s pricing page. By subscribing to a paid plan, you authorise us to charge your payment
            method on a recurring basis. Subscription fees are charged in advance at the beginning of each billing
            period. You can cancel at any time from your account; cancellation takes effect at the end of the period you
            have paid for. Both products let you try them free before you pay.
          </p>
        </div>

        <div>
          <h2 className={h2}>5. Payment</h2>
          <p className="mt-3">
            Web design: {market.voice.faqPayment} Software subscriptions: by card through Stripe. Your card details go
            to Stripe, never to us. Prices are in the currency shown at the time of purchase.
          </p>
        </div>

        <div id="no-refund" className="scroll-mt-24 rounded-3xl border-2 border-accent/40 bg-surface p-8">
          <h2 className={h2}>6. No refund policy</h2>
          <p className="mt-4 font-semibold text-ink">
            All sales are final. We do not offer refunds, credits, or exchanges for any fees once payment has been
            processed.
          </p>
          <p className="mt-3">
            This includes but is not limited to: web design setup, monthly and lump-sum fees, hosting and care, add-ons,
            the remainder of a minimum term, MY Swift Audit and MyResit subscriptions, partial billing periods, and
            unused months, years or allowances.
          </p>
          <p className="mt-3">
            If you have a billing error or were charged incorrectly, contact us at{" "}
            <a href={`mailto:${email}`} className={link}>{email}</a> within 7 days and we will investigate.
          </p>
          <p className="mt-3">
            This is why our products have free plans and trials, and why we agree every web design quote with you
            before you pay: so you can see what you are getting first.
          </p>
          <p className="mt-3">Nothing in these terms limits any rights you have under Malaysian consumer law that cannot be excluded.</p>
        </div>

        <div>
          <h2 className={h2}>7. Acceptable use</h2>
          <p className="mt-3">You agree not to use our services to:</p>
          <ul className={list}>
            <li>Break Malaysian law, or the law where you are</li>
            <li>Publish or store content you have no right to use, or that is unlawful, fraudulent or misleading</li>
            <li>Upload malware, viruses, or any malicious code</li>
            <li>Attempt to gain unauthorised access to our systems or other users&rsquo; accounts</li>
            <li>Resell, sublicense or share access to our software with anyone outside your own business</li>
            <li>Use our services in any way that could damage, disable, or impair them</li>
          </ul>
        </div>

        <div>
          <h2 className={h2}>8. Intellectual property</h2>
          <p className="mt-3">
            Our software, designs, code and all related intellectual property are owned by {OPERATOR}, except where
            you have bought a website outright (lump sum or buyout), in which case that site&rsquo;s code is yours. You
            may not copy, modify, distribute, sell, or lease any part of our services without our written permission.
          </p>
          <p className="mt-3">
            Your domain, your content, your brand, and the reports, records and files you create with our products
            belong to you.
          </p>
        </div>

        <div>
          <h2 className={h2}>9. Limitation of liability</h2>
          <p className="mt-3">
            Our services are provided &ldquo;as is&rdquo; without warranties of any kind, either express or implied.
            Our software uses artificial intelligence to help read documents and prepare output; you are responsible for
            reviewing and checking everything before you rely on it or give it to anyone else. It is a tool, not a
            substitute for professional judgment or advice.
          </p>
          <p className="mt-3">
            To the fullest extent permitted by applicable law, we are not liable for any indirect, incidental, special,
            consequential, or punitive damages — including but not limited to loss of profits, loss of revenue, loss of
            data, regulatory fines, or professional liability claims — arising out of or related to your use of our
            services, even if we have been advised of the possibility of such damages.
          </p>
          <p className="mt-3">
            In any event, our total cumulative liability to you for any claims arising out of or related to these Terms
            or our services shall not exceed the total fees paid by you to us in the twelve (12) months preceding the
            claim.
          </p>
        </div>

        <div>
          <h2 className={h2}>10. Suspension and termination</h2>
          <p className="mt-3">
            We may suspend or end a service or account if you break these Terms or act in a way that harms our services
            or other users. If we do:
          </p>
          <ul className={list}>
            <li>Your access to that service ends</li>
            <li>You will not be entitled to any refund of fees paid</li>
            <li>Your data is handled as set out in the relevant privacy notice</li>
          </ul>
        </div>

        <div>
          <h2 className={h2}>11. Changes to these Terms</h2>
          <p className="mt-3">
            We may update these Terms from time to time to reflect changes in our services or legal requirements. We
            will give notice of material changes by email, through the product, or on this page. Continued use of our
            services after such notice means you accept the updated Terms.
          </p>
        </div>

        <div>
          <h2 className={h2}>12. Governing law</h2>
          <p className="mt-3">
            These Terms are governed by the laws of Malaysia. Any disputes arising from these Terms or your use of our
            services shall be resolved in the courts of Malaysia.
          </p>
        </div>

        <div>
          <h2 className={h2}>13. Contact us</h2>
          <p className="mt-3">
            For questions about these Terms, billing or any legal matter, email{" "}
            <a href={`mailto:${email}`} className={link}>{email}</a>. Our privacy practices are in our{" "}
            <a href={mpath(market, "/privacy")} className={link}>Privacy Policy</a>.
          </p>
        </div>
      </section>

      <CtaBand
        market={market}
        heading="Questions about these terms?"
        sub="WhatsApp us — a real person replies, usually within the hour."
        waMessage="Hi JPBC! I have a question about your terms."
      />
    </>
  );
}
