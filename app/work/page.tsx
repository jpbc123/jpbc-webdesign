import type { Metadata } from "next";
import WorkGrid from "./WorkGrid";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Our Work - Websites for Malaysian Small Businesses",
  description:
    "Hand-coded websites and web apps for Malaysian businesses — aircon services, klinik, restoran, renovation, tuition centres, workshops, and more. Every project is live.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-4 pt-16">
        <h1 className="display text-5xl text-ink sm:text-6xl">Our work</h1>
        {/* Answer-first for SEO/AEO */}
        <p className="mt-4 max-w-3xl text-lg text-muted">
          What kind of websites does JPBC build? Fast, hand-coded sites and web apps for everyday Malaysian
          businesses — aircon teams, klinik, restoran, renovation contractors, tuition centres, workshops. Every
          project below is live; click through and see for yourself.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <WorkGrid />
      </section>

      <CtaBand
        heading="Want yours on this page?"
        sub="Every project here started with one WhatsApp message."
      />
    </>
  );
}
