import { DeployFrydaiButton } from "@/components/checkout/DeployFrydaiButton";
import { copy } from "@/lib/copy";

/** Notice strip height — keep in sync with SiteHeader offset + hero spacer */
export const FOUNDING_NOTICE_HEIGHT = "h-9 sm:h-12";

/** Header flush under notice (no gap) */
export const FOUNDING_NOTICE_OFFSET = "top-9 sm:top-12";

/** Spacer: notice + compact header (h-14/h-16) */
export const HERO_CHROME_TOP_SPACER = "h-[5.75rem] sm:h-[7rem]";

/** Spacer: notice + expanded hero logo header */
export const HERO_CHROME_TOP_SPACER_EXPANDED = "h-[7.25rem] sm:h-[9rem]";

export function FoundingNoticeBar() {
  const t = copy.foundingNotice;

  return (
    <div
      className={`founding-notice-bar founding-notice-glass fixed inset-x-0 top-0 z-[60] ${FOUNDING_NOTICE_HEIGHT}`}
      role="region"
      aria-label={t.badge}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-2 px-3 sm:justify-center sm:gap-x-3 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:flex-initial sm:justify-center">
          <span className="notice-badge inline-flex shrink-0 items-center gap-1 rounded-full border border-amber-400/30 bg-amber-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-200 sm:gap-1.5 sm:text-[11px]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-70" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-amber-400" />
            </span>
            <span className="max-sm:sr-only sm:not-sr-only">{t.badge}</span>
            <span className="sm:hidden">Founding</span>
          </span>

          <p className="min-w-0 truncate text-[10px] text-muted sm:text-xs">
            <span className="font-medium text-muted-strong">{t.limited}</span>
            <span className="mx-1 text-muted">·</span>
            <span className="notice-price font-semibold text-violet-200">{t.price}</span>
            <span className="hidden text-muted sm:inline">
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
