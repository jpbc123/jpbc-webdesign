import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "About - A Small Studio in Petaling Jaya",
  description:
    "JPBC Web Designs is a founder-led web design studio in Petaling Jaya. You WhatsApp us, the person who built your site replies. No account managers, no ticket systems.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pb-4 pt-16">
        <h1 className="display text-5xl text-ink sm:text-6xl">A small studio that answers its own WhatsApp</h1>
        {/* Answer-first for SEO/AEO */}
        <p className="mt-6 text-lg text-muted">
          Who is JPBC Web Designs? A founder-led web design studio in Petaling Jaya that hand-codes websites for
          Malaysian small businesses. No account managers, no ticket systems — you WhatsApp us, the person who built
          your site replies.
        </p>
      </section>

      <section className="mx-auto max-w-3xl space-y-6 px-6 py-10 text-muted">
        <p>
          JPBC started the way most of our clients&apos; businesses did: one person, one skill, and a lot of WhatsApp
          messages. We kept meeting kedai owners, clinic managers, and workshop bosses who&apos;d been quoted RM10,000
          for a website — or worse, paid it, and got a slow WordPress site that broke a year later with nobody
          answering the phone.
        </p>
        <p>
          That felt wrong. Building a good website for a small business isn&apos;t a RM10,000 problem. It&apos;s a
          craft problem: someone who knows what they&apos;re doing, sitting down and hand-coding a fast, clean site —
          then sticking around to keep it updated. So that&apos;s the business we built. RM0 down, RM179 a month,
          everything included, and the person who wrote your code is the one replying to your messages.
        </p>
        <p>
          We stay deliberately small. Small means your 9pm &ldquo;boss, can change the menu ah?&rdquo; message gets a
          same-day fix, not a ticket number. Small means we remember that your busy season is December and your
          promo banner needs to go up before Raya. Small means we only take on work we can do properly.
        </p>
        <div className="rounded-3xl border-2 border-accent/40 bg-surface p-8">
          <h2 className="display text-2xl text-ink">What we believe</h2>
          <ul className="mt-4 space-y-3">
            <li><strong className="text-ink">Fast is a feature.</strong> If your site takes 5 seconds to load, nothing else about it matters.</li>
            <li><strong className="text-ink">Plain talk wins.</strong> We tell you what things cost and what they don&apos;t include. No &ldquo;PM for price&rdquo;.</li>
            <li><strong className="text-ink">Hand-coded lasts.</strong> No plugins to update, nothing to hack, nothing that breaks while you sleep.</li>
            <li><strong className="text-ink">Local means local.</strong> We build for how Malaysians actually search and buy — on phones, over WhatsApp, in more than one language.</li>
          </ul>
        </div>
        <div className="text-center">
          <WhatsAppButton message="Hi JPBC! I'd like to chat about a website for my business.">
            Say hello on WhatsApp
          </WhatsAppButton>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
