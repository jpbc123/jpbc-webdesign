import AfterHoursSign from "./AfterHoursSign";

/**
 * The JPBC signboard logo (styles in .brand-board, globals.css). With
 * `afterHours`, a neon "after hours" sign hangs beside it from 6pm to 6am
 * (see AfterHoursSign). "wide" shows it only on xl screens, where the header
 * has room for it.
 */
export default function Logo({ afterHours }: { afterHours?: "always" | "wide" }) {
  return (
    <span className="flex items-end gap-2">
      <span className="brand-board">
        <span className="brand-name">JPBC</span>
        <span className="brand-desc">
          <span>WEB</span>
          <span>DESIGNS</span>
        </span>
      </span>
      {afterHours && <AfterHoursSign variant={afterHours} />}
    </span>
  );
}
