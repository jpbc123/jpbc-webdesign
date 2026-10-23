import Link from "next/link";
import { formatPostDate, type Post } from "@/content/blog";

/** A blog post as a notice pinned to the board: tag plate, title, excerpt, date. */
export default function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`board group flex h-full flex-col bg-surface p-6 ${featured ? "sm:p-10" : ""}`}
    >
      <span className="plate self-start">{post.tag}</span>
      <h3
        className={`mt-4 text-balance font-extrabold leading-tight text-ink [font-variation-settings:'wdth'_108] group-hover:text-accent ${
          featured ? "text-3xl sm:text-4xl" : "text-xl"
        }`}
      >
        {post.title}
      </h3>
      <p className={`mt-3 text-pretty text-muted ${featured ? "max-w-2xl text-lg" : "text-sm"}`}>{post.description}</p>
      <p className="mt-auto pt-5 text-xs font-bold uppercase tracking-wider text-muted">
        <time dateTime={post.date}>{formatPostDate(post.date)}</time> · {post.readMinutes} min read
      </p>
    </Link>
  );
}
