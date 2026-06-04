import { DeployFrydaiButton } from "@/components/checkout/DeployFrydaiButton";
import { copy } from "@/lib/copy";

/** Notice strip height — keep in sync with SiteHeader offset + hero spacer */
export const FOUNDING_NOTICE_HEIGHT = "h-9 sm:h-12";

/** Header flush under notice (no gap) */
export const FOUNDING_NOTICE_OFFSET = "top-9 sm:top-12";

/** Spacer in hero: notice (h-9/h-12) + site header (h-14/h-16) */
export const HERO_CHROME_TOP_SPACER = "h-[5.75rem] sm:h-[7rem]";

export function FoundingNoticeBar() {
  const t = copy.foundingNotice;

  return (
    <div
      className={`fixed inset-x-0 top-0 z-[60] border-b border-violet-500/25 bg-gradient-to-r from-violet-950/95 via-[#0d0d14] to-indigo-950/95 backdrop-blur-md ${FOUNDING_NOTICE_HEIGHT}`}
      role="region"
      aria-label={t.badge}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-2 px-3 sm:justify-center sm:gap-x-3 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:flex-initial sm:justify-center">
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-amber-400/30 bg-amber-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-200 sm:gap-1.5 sm:text-[11px]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-70" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-amber-400" />
            </span>
            <span className="max-sm:sr-only sm:not-sr-only">{t.badge}</span>
            <span className="sm:hidden">Founding</span>
          </span>

          <p className="min-w-0 truncate text-[10px] text-white/55 sm:text-xs">
            <span className="font-medium text-white/75">{t.limited}</span>
            <span className="mx-1 text-white/25">·</span>
            <span className="font-semibold text-violet-200">{t.price}</span>
            <span className="hidden text-white/40 sm:inline">
              <span className="mx-1.5">·</span>
              {t.priceLabel}
            </span>
          </p>
        </div>

        <DeployFrydaiButton variant="pill" showArrow className="hidden shrink-0 sm:inline-flex">
          {t.cta}
        </DeployFrydaiButton>
      </div>
    </div>
  );
}
