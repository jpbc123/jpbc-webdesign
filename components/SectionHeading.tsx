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
  introSize = "text-lg",
}: {
  /** Kicker text above the headline */
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  as?: "h1" | "h2";
  className?: string;
  center?: boolean;
  /** Font size class for the intro paragraph */
  introSize?: string;
}) {
  const size = Tag === "h1" ? "text-[2.6rem] sm:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl";
  return (
    <div className={`${center ? "text-center" : ""} ${className}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <Tag className={`display text-ink ${size} ${center ? "mx-auto max-w-3xl" : ""}`}>{title}</Tag>
      {intro && (
        <p className={`mt-4 text-pretty ${introSize} leading-relaxed text-muted ${center ? "mx-auto max-w-3xl" : ""}`}>{intro}</p>
      )}
    </div>
  );
}
