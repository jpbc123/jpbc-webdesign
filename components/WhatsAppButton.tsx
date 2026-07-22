import type { Market } from "@/config/markets/types";
import { waLink } from "@/lib/market";

type Props = {
  /** Active market — decides which number the link opens */
  market: Market;
  message?: string;
  children?: React.ReactNode;
  /** "solid" = accent pill (primary), "outline" = for dark/hero surfaces */
  variant?: "solid" | "outline";
  className?: string;
};

export default function WhatsAppButton({
  market,
  message,
  children = "WhatsApp us now",
  variant = "solid",
  className = "",
}: Props) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-transform hover:-translate-y-0.5";
  const styles =
    variant === "solid"
      ? "bg-accent text-accent-ink glow-accent"
      : "border-2 border-hero-ink/40 text-hero-ink hover:border-accent hover:text-accent";
  return (
    <a
      href={waLink(market, message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles} ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M17.5 14.4c-.3-.2-1.8-.9-2-.9-.3-.1-.5-.2-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.7-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4 0-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
      </svg>
      {children}
    </a>
  );
}
