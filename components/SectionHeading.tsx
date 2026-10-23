/**
 * Section heading with an enamel number plate above it ("No. 03"), like the
 * lot number screwed beside a shop door. Pass `as="h1"` for page headers.
 */
export default function SectionHeading({
  no,
  title,
  intro,
  as: Tag = "h2",
  className = "",
  center = false,
}: {
  /** Plate text, e.g. "No. 03" or "Pricing" */
  no?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  as?: "h1" | "h2";
  className?: string;
  center?: boolean;
}) {
  const size = Tag === "h1" ? "text-[2.6rem] sm:text-6xl lg:text-7xl" : "text-4xl sm:text-5xl";
  return (
    <div className={`${center ? "text-center" : ""} ${className}`}>
      {no && <p className="plate mb-4">{no}</p>}
      <Tag className={`display text-balance text-ink ${size}`}>{title}</Tag>
      {intro && (
        <p className={`mt-4 max-w-2xl text-pretty text-lg text-muted ${center ? "mx-auto" : ""}`}>{intro}</p>
      )}
    </div>
  );
}
