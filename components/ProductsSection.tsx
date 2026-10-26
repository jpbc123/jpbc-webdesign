import Link from "next/link";
import KindTag from "./KindTag";
import SectionHeading from "./SectionHeading";
import { products } from "@/data/products";
import type { Market } from "@/config/markets/types";
import { mpath } from "@/lib/market";
import { OPERATOR } from "@/lib/legal";

/** Our own software, with prices — the top of /work. */
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
          <article key={product.slug} className="card flex flex-col overflow-hidden">
            <div className="border-b border-line bg-accent-soft px-6 py-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm text-muted">{product.tagline}</span>
                {product.status ? <span className="pill !bg-surface">{product.status}</span> : <KindTag kind="Own product" />}
              </div>
              <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-ink">{product.name}</h3>
            </div>
            <div className="flex flex-1 flex-col p-6">
            <p className="text-muted">{product.blurb}</p>

            <ul className="mt-6 divide-y divide-line border-y border-line">
              {product.plans.map((plan) => (
                <li key={plan.name} className="py-3">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-semibold text-ink">{plan.name}</span>
                    <span className="whitespace-nowrap font-bold text-ink">
                      {plan.was && <s className="mr-2 font-normal text-muted">{plan.was}</s>}
                      {plan.price}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{plan.detail}</p>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-6">
              {product.url ? (
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary !py-2 text-sm"
                >
                  Visit {product.domain} →
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
