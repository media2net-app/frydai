import Link from "next/link";
import { copy, site } from "@/lib/copy";

/** Fixed bar height — keep in sync with SiteHeader `withNotice` offset */
export const FOUNDING_NOTICE_OFFSET = "top-9 sm:top-10";

export function FoundingNoticeBar() {
  const t = copy.foundingNotice;

  return (
    <div
      className="fixed inset-x-0 top-0 z-[60] border-b border-violet-500/25 bg-gradient-to-r from-violet-950/95 via-[#0d0d14] to-indigo-950/95 backdrop-blur-md"
      role="region"
      aria-label={t.badge}
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-3 py-2 sm:gap-x-3 sm:px-6 sm:py-2.5">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-200 sm:text-[11px]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-70" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-amber-400" />
          </span>
          {t.badge}
        </span>

        <span className="text-[11px] text-white/55 sm:text-xs">
          <span className="font-medium text-white/75">{t.limited}</span>
          <span className="mx-1.5 hidden text-white/25 sm:inline">·</span>
          <span className="hidden sm:inline">{t.priceLabel}</span>
          <span className="mx-1.5 hidden text-white/25 md:inline">·</span>
          <span className="font-semibold text-violet-200">{t.price}</span>
        </span>

        <Link
          href={site.whopCheckout}
          className="shrink-0 rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 px-3 py-1 text-[11px] font-semibold text-white transition-opacity hover:opacity-90 sm:px-4 sm:py-1.5 sm:text-xs"
        >
          {t.cta} →
        </Link>
      </div>
    </div>
  );
}
