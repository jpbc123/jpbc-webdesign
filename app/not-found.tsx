import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="display text-7xl text-accent">404</p>
      <h1 className="display mt-4 text-4xl text-ink">This page tak jumpa</h1>
      <p className="mt-4 text-muted">
        The page you&apos;re looking for doesn&apos;t exist — maybe the link is old, maybe it wandered off lepas kerja.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link href="/" className="rounded-full bg-accent px-6 py-3 font-semibold text-accent-ink">
          Back to home
        </Link>
        <WhatsAppButton variant="outline" className="!border-ink/20 !text-ink" message="Hi JPBC! I found a broken link on your site.">
          Tell us what broke
        </WhatsAppButton>
      </div>
    </section>
  );
}
