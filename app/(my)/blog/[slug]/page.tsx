import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import PostCard from "@/components/PostCard";
import { formatPostDate, getPost, posts } from "@/content/blog";
import { defaultMarket } from "@/config/markets";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

// Articles are written for Malaysia, so they live only under the root market
// (see `pages.blogPosts` in config/markets). Other markets' /blog shows the
// coming-soon board instead.
const market = defaultMarket;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const path = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: path,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const url = absoluteUrl(`/blog/${post.slug}`);
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const { Body } = post;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    mainEntityOfPage: url,
    url,
    inLanguage: market.locale,
    author: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
    publisher: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const faqJsonLd = post.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}

      <article>
        <header className="mx-auto max-w-3xl px-6 pb-6 pt-14">
          <nav aria-label="Breadcrumb" className="text-sm font-semibold text-muted">
            <Link href="/" className="hover:text-accent-text">Home</Link>
            <span aria-hidden> / </span>
            <Link href="/blog" className="hover:text-accent-text">Blog</Link>
          </nav>
          <p className="pill mt-6">{post.tag}</p>
          <h1 className="mt-4 text-balance text-4xl font-extrabold leading-[1.1] tracking-[-0.03em] text-ink sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-sm font-medium text-muted">
            By JPBC Web Designs · <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            {post.updated && (
              <>
                {" "}· Updated <time dateTime={post.updated}>{formatPostDate(post.updated)}</time>
              </>
            )}{" "}
            · {post.readMinutes} min read
          </p>
        </header>

        <div className="mx-auto max-w-3xl border-t border-line px-6 pt-8">
          <div className="prose-site">
            <Body market={market} />
          </div>
        </div>

        {post.faqs && post.faqs.length > 0 && (
          <section className="mx-auto max-w-3xl px-6 pt-14">
            <h2 className="display text-3xl text-ink">Quick answers</h2>
            <div className="mt-6">
              <FaqAccordion faqs={post.faqs} />
            </div>
          </section>
        )}
      </article>

      {more.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pt-20">
          <h2 className="display text-3xl text-ink sm:text-4xl">Keep reading</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      <CtaBand
        market={market}
        heading="Rather have us do it?"
        sub="Tell us about your business on WhatsApp. A real person replies, usually within the hour."
        waMessage={`Hi JPBC Web Designs, I just read "${post.title}" and have a question.`}
      />
    </>
  );
}
