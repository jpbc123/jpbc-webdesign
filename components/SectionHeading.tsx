/**
 * Section heading: a small accent kicker ("Pricing", "How we work") over a
 * heavy headline. Pass `as="h1"` for page headers.
 */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  as: Tag = "h2",
  className = "",
  center = false,
}: {
  /** Kicker text above the headline */
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  as?: "h1" | "h2";
  className?: string;
  center?: boolean;
}) {
  const size = Tag === "h1" ? "text-[2.6rem] sm:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl";
  return (
    <div className={`${center ? "text-center" : ""} ${className}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <Tag className={`display text-ink ${size} ${center ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>{title}</Tag>
      {intro && (
        <p className={`mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted ${center ? "mx-auto" : ""}`}>{intro}</p>
      )}
    </div>
  );
}
