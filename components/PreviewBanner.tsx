import { waLink } from "@/lib/site";

/**
 * "Prepared by JPBC Web Designs" banner.
 *
 * NOTE: Prospect preview sites live on the `preview.` subdomain as a SEPARATE
 * deployment — this marketing site doesn't render the banner anywhere itself.
 * Import this component into the preview app (copy the file or share via a
 * package) and mount it at the top of the preview layout.
 */
export default function PreviewBanner({ businessName }: { businessName?: string }) {
  return (
    <div className="fixed inset-x-0 top-0 z-[100] flex items-center justify-center gap-3 bg-[#0b1f3a] px-3 py-1.5 text-xs text-white">
      <span>
        Draf pratonton — belum live
        {businessName ? ` · disediakan untuk ${businessName}` : ""} · Prepared by JPBC Web Designs
      </span>
      <a
        href={waLink("Hi JPBC! I saw my preview site and I'd like to activate it.")}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-[#06b6d4] px-3 py-0.5 font-semibold text-[#04202a]"
      >
        WhatsApp kami untuk aktifkan
      </a>
    </div>
  );
}
