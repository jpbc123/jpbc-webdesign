import type { ShowcaseKind } from "@/data/showcase";

const COLOURS: Record<ShowcaseKind, string> = {
  "Client project": "bg-[#dcfce7] text-[#166534]",
  "Own project": "bg-[#fef3c7] text-[#92400e]",
  "Own product": "bg-[#dbeafe] text-[#1e40af]",
  "Concept / demo build": "bg-surface-2 text-muted ring-1 ring-line",
};

/** The honest "what is this" label on a work card, so demos never pass as client work. */
export default function KindTag({ kind }: { kind: ShowcaseKind }) {
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${COLOURS[kind]}`}>{kind}</span>;
}
