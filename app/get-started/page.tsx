import type { Metadata } from "next";
import IntakeForm from "./IntakeForm";

export const metadata: Metadata = {
  title: "Get Started — Tell Us About Your Business",
  description:
    "Start your website with JPBC in 60 seconds: five quick questions about your business, then we take it from there on WhatsApp. RM0 down.",
  alternates: { canonical: "/get-started" },
};

export default function GetStartedPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 pb-20 pt-16">
      <h1 className="display text-5xl text-ink sm:text-6xl">Let&apos;s get started</h1>
      <p className="mt-4 text-lg text-muted">
        Five quick questions — takes about 60 seconds. We&apos;ll reply on WhatsApp with a plan and a straight answer
        on price.
      </p>
      <div className="mt-10">
        <IntakeForm />
      </div>
    </section>
  );
}
