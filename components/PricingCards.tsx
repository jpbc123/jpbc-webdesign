import Link from "next/link";
import type { Market } from "@/config/markets/types";
import { editHours, mpath, price, waLink } from "@/lib/market";

const Check = () => (
  <span className="inline-grid size-6 place-items-center rounded-full bg-[#dcfce7] text-[#166534]" aria-label="Included">
    <svg viewBox="0 0 20 20" className="size-3.5" fill="currentColor" aria-hidden>
      <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0Z" />
    </svg>
  </span>
);

const Cell = ({ v }: { v: string | true }) => (v === true ? <Check /> : <span>{v}</span>);

/** The two plans side by side as one comparison table; Monthly is highlighted. */
export default function PricingCards({ market }: { market: Market }) {
  const monthly = price(market, market.pricing.monthly);
  const setup = price(market, market.pricing.setup);
  const lumpSum = price(market, market.pricing.lumpSum);
  const care = price(market, market.pricing.lumpSumCare);
  const editRate = price(market, market.pricing.edits.hourlyRate);
  const hours = editHours(market);

  // [feature, monthly, lump sum]; `true` renders a tick.
  const rows: [string, string | true, string | true][] = [
    ["Custom-designed pages", "5 pages", "5 pages"],
    ["Hand-coded, no WordPress", true, true],
    [`${market.voice.domainLine} domain`, "Included", "Included in care plan"],
    ["Hosting + SSL certificate", "Included", "Included in care plan"],
    ["Content edits", `${hours} a month included, then ${editRate}/hr`, `${editRate}/hr, only when you need them`],
    ["Mobile-friendly, loads under 1s", true, true],
    ["WhatsApp support from the builder", true, true],
    ["Live within 7 days of design sign-off", true, true],
    ["You own the site code", "Optional one-time buyout", true],
    ["Your domain and content are yours", true, true],
    ["Minimum term", `${market.pricing.minimumMonths} months, then cancel anytime`, "None"],
  ];

  return (
    <div className="overflow-x-auto rounded-2xl bg-surface ring-1 ring-line">
      <table className="w-full min-w-[600px] border-collapse text-left">
        <thead>
          <tr className="align-bottom">
            <th className="w-[38%] rounded-tl-2xl bg-head p-6 text-xl font-bold text-head-ink">Compare plans</th>
            <th className="relative bg-accent-soft p-6 text-center font-normal">
              <span className="absolute inset-x-0 top-0 h-1 bg-accent" aria-hidden />
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-on-accent">Most popular</span>
              <span className="mt-4 block text-lg font-bold text-ink">Monthly</span>
              <span className="mt-1 block text-4xl font-extrabold tracking-tight text-ink">
                {monthly}
                <span className="text-sm font-medium text-muted">/mo</span>
              </span>
              <span className="mt-1 block text-sm text-muted">{setup} down · No setup fee</span>
            </th>
            <th className="p-6 text-center font-normal">
              <span className="block text-lg font-bold text-ink">Lump sum</span>
              <span className="mt-1 block text-4xl font-extrabold tracking-tight text-ink">{lumpSum}</span>
              <span className="mt-1 block text-sm text-muted">+ {care}/mo hosting &amp; care</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([feature, a, b], i) => (
            <tr key={feature} className={i % 2 ? "" : "bg-surface-2"}>
              <th scope="row" className="bg-head px-6 py-3.5 text-sm font-semibold text-head-ink">
                {feature}
              </th>
              <td className="bg-accent-soft/70 px-6 py-3.5 text-center text-sm text-ink">
                <Cell v={a} />
              </td>
              <td className="px-6 py-3.5 text-center text-sm text-ink">
                <Cell v={b} />
              </td>
            </tr>
          ))}
          <tr>
            <td className="rounded-bl-2xl bg-head" />
            <td className="bg-accent-soft/70 p-6">
              <a
                href={waLink(market, `Hi JPBC Web Designs, I'm interested in the ${monthly}/month website plan.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full !px-4 !py-3 text-sm"
              >
                Start monthly
              </a>
            </td>
            <td className="p-6">
              <Link href={mpath(market, "/get-started")} className="btn btn-secondary w-full !px-4 !py-3 text-sm">
                Get a lump-sum quote
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
