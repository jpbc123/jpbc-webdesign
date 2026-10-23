"use client";

import { useEffect, useState } from "react";
import type { Market } from "@/config/markets/types";

/** Is the studio inside its posted hours right now, in the market's own time zone? */
function isOpenNow(market: Market): boolean {
  const { timeZone, openingHours } = market.contact;
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    hour: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? -1);
  const isoDay = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(weekday) + 1;
  return openingHours.days.includes(isoDay) && hour >= openingHours.open && hour < openingHours.close;
}

/**
 * The little hanging "BUKA / TUTUP" sign in the nav. It reads the real clock
 * in the market's time zone, so it is decided after mount: the server can't
 * know the visitor's "now", and guessing would cause a hydration mismatch.
 * Until then it holds its space, invisible.
 */
export default function OpenSign({ market }: { market: Market }) {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    setOpen(isOpenNow(market));
    const id = setInterval(() => setOpen(isOpenNow(market)), 60_000);
    return () => clearInterval(id);
  }, [market]);

  const label = open ? market.signage.open : market.signage.closed;

  return (
    <span
      className={`hidden items-center gap-2 rounded-tag border-2 border-frame bg-surface px-2.5 py-1.5 xl:inline-flex ${
        open === null ? "invisible" : ""
      }`}
      title={open ? market.contact.hours : `${market.contact.hours} · ${market.signage.closedNote}`}
    >
      <span className={open ? "open-dot" : "open-dot open-dot--closed"} aria-hidden />
      <span className="sign text-xs leading-none text-ink">{label}</span>
    </span>
  );
}
