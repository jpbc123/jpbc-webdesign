import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PostCard from "@/components/PostCard";
import SectionHeading from "@/components/SectionHeading";
import { posts } from "@/content/blog";
import type { Market } from "@/config/markets/types";
import { marketMetadata } from "@/lib/seo";

export function blogMetadata(market: Market): Metadata {
  return marketMetadata(market, "blog", "/blog");
}

export default function BlogPage({ market }: { market: Market }) {
  // Articles are written for Malaysia; other markets keep the coming-soon board.
  const list = market.pages.blogPosts ? posts : [];
  const [featured, ...rest] = list;

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-4 pt-16">
        <SectionHeading as="h1" no="Notice board" title="Blog" intro={market.voice.blogIntro} />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        {!featured ? (
          <div className="board mx-auto max-w-2xl bg-sign-yellow p-10 text-center text-sign-yellow-ink">
            <p className="sign text-2xl">Coming soon</p>
            <p className="mx-auto mt-3 max-w-md">{market.voice.blogComingSoon}</p>
          </div>
        ) : (
          <>
            <PostCard post={featured} featured />
            {rest.length > 0 && (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <CtaBand
        market={market}
        heading="Don't want to read? Just ask."
        sub="WhatsApp us your question about websites or Google — free answer, no obligation."
        waMessage="Hi JPBC! I have a question about getting my business online."
      />
    </>
  );
}
