"use client";

import { useEffect, useRef } from "react";

/**
 * Wraps a block and sets data-lit on it the first time it scrolls into view,
 * so CSS can play a one-off "lights flicker on" animation (the dark-mode
 * billboard in CtaBand).
 */
export default function LightsOnInView({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.lit = "";
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
