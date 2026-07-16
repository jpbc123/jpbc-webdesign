import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Blog - Web & Local SEO Tips for Malaysian Small Businesses",
  description:
    "Practical articles on websites, Google rankings, and getting customers online — written for Malaysian small business owners, not tech people.",
  alternates: { canonical: "/blog" },
};

// Empty-state-ready blog index. When articles exist, replace this array
// (or wire up MDX/content files) and the listing below renders them.
const posts: { slug: string; title: string; excerpt: string; date: string }[] = [];

export default function BlogPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pb-4 pt-16">
        <h1 className="display text-5xl text-ink sm:text-6xl">Blog</h1>
        <p className="mt-4 text-lg text-muted">
          Practical advice on websites, Google rankings, and getting customers online — written for Malaysian business
          owners, not tech people.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-10">
        {posts.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-line bg-surface p-12 text-center">
            <p className="display text-2xl text-ink">Articles coming soon</p>
            <p className="mx-auto mt-3 max-w-md text-muted">
              We&apos;re writing our first guides — starting with &ldquo;How much should a small business website cost
              in Malaysia?&rdquo; and &ldquo;Why your kedai needs more than a Facebook page.&rdquo; Check back soon.
            </p>
          </div>
        ) : (
          <ul className="space-y-6">
            {posts.map((p) => (
              <li key={p.slug} className="glow-card rounded-3xl border border-line bg-surface p-8">
                <p className="text-sm text-muted">{p.date}</p>
                <h2 className="mt-1 text-xl font-bold text-ink">{p.title}</h2>
                <p className="mt-2 text-muted">{p.excerpt}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <CtaBand
        heading="Don't want to read? Just ask."
        sub="WhatsApp us your question about websites or Google — free answer, no obligation."
        waMessage="Hi JPBC! I have a question about getting my business online."
      />
    </>
  );
}
