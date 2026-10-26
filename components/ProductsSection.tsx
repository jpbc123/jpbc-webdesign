import Link from "next/link";
import KindTag from "./KindTag";
import SectionHeading from "./SectionHeading";
import { products } from "@/data/products";
import type { Market } from "@/config/markets/types";
import { mpath } from "@/lib/market";
import { OPERATOR } from "@/lib/legal";

/** Our own software, with prices — on /work. */
export default function ProductsSection({ market }: { market: Market }) {
  return (
    <section id="products" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-10 sm:px-6">
      <SectionHeading
        eyebrow="Made by us"
        title="Our products"
        intro={`Software we build and run ourselves, for Malaysian businesses. Sold by ${OPERATOR}, paid by card through Stripe.`}
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {products.map((product) => (
          <article
            key={product.slug}
            className="card group flex flex-col overflow-hidden transition duration-300 ease-out hover:shadow-[inset_0_0_0_1px_rgb(29_78_216/0.45),0_24px_50px_-24px_rgb(29_78_216/0.5)] motion-safe:hover:-translate-y-1"
          >
            {/* Screenshot in a browser frame on a tinted stage */}
            <div className="relative bg-gradient-to-br from-accent-soft to-surface-2 px-6 pt-6 sm:px-8 sm:pt-8">
              <div className="absolute right-4 top-4 z-10">
                {product.status ? <span className="pill !bg-surface">{product.status}</span> : <KindTag kind="Own product" />}
              </div>
              <div className="overflow-hidden rounded-t-xl bg-surface shadow-[0_-1px_0_1px_var(--line),0_20px_40px_-20px_rgb(0_0_0/0.35)]">
                <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
                  <span className="size-2.5 rounded-full bg-[#f87171]" />
                  <span className="size-2.5 rounded-full bg-[#fbbf24]" />
                  <span className="size-2.5 rounded-full bg-[#34d399]" />
                  <span className="ml-2 truncate rounded-md bg-surface-2 px-2 py-0.5 text-xs text-muted">{product.domain}</span>
                </div>
                <div className="aspect-[16/8] overflow-hidden">
                  <img
                    src={product.image}
                    alt={`Screenshot of ${product.name}`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <p className="text-sm font-medium text-accent-text">{product.tagline}</p>
              <h3 className="mt-1 text-2xl font-extrabold tracking-tight text-ink">{product.name}</h3>
              <p className="mt-3 leading-relaxed text-muted">{product.blurb}</p>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {product.plans.map((plan) => (
                  <li
                    key={plan.name}
                    className={`relative rounded-xl p-4 transition-colors ${
                      plan.was ? "bg-accent-soft ring-1 ring-accent/40" : "bg-surface-2 ring-1 ring-line hover:ring-line-strong"
                    }`}
                  >
                    {plan.was && (
                      <span className="absolute -top-2.5 right-3 rounded-full bg-accent px-2 py-0.5 text-[0.7rem] font-bold text-on-accent">
                        Launch price
                      </span>
                    )}
                    <p className="text-sm font-semibold text-muted">{plan.name}</p>
                    <p className="mt-1 text-xl font-extrabold tracking-tight text-ink">
                      {plan.was && <s className="mr-1.5 text-base font-medium text-muted">{plan.was}</s>}
                      {plan.price}
                    </p>
                    <p className="mt-1.5 text-sm leading-snug text-muted">{plan.detail}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-7">
                {product.url ? (
                  <a href={product.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary !py-2.5 text-sm">
                    Visit {product.domain}
                    <span className="inline-block transition-transform motion-safe:group-hover:translate-x-1">→</span>
                  </a>
                ) : (
                  <span className="text-sm text-muted">{product.domain}</span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted">
        Prices in Malaysian ringgit. All sales are final — see our{" "}
        <Link href={`${mpath(market, "/terms")}#no-refund`} className="font-semibold text-accent-text underline underline-offset-4">
          Terms of Service
        </Link>
        .
      </p>
    </section>
  );
}
