"use client";

import { useTheme } from "@/components/theme/ThemeProvider";
import { THEMES, type ThemeId } from "@/lib/theme";
import { cx } from "@/lib/cx";

type ThemeSwitcherProps = {
  mobileOnly?: boolean;
  desktopOnly?: boolean;
};

export function ThemeSwitcher({ mobileOnly, desktopOnly }: ThemeSwitcherProps = {}) {
  const { theme, setTheme } = useTheme();
  const showMobile = mobileOnly || (!mobileOnly && !desktopOnly);
  const showDesktop = desktopOnly || (!mobileOnly && !desktopOnly);

  return (
    <>
      {showMobile && (
        <div className="flex gap-2 sm:hidden" role="group" aria-label="Thema">
          {THEMES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTheme(item.id as ThemeId)}
              aria-pressed={theme === item.id}
              className={cx(
                "rounded-full border px-3 py-2 text-[10px] font-bold transition-all",
                theme === item.id
                  ? "border-violet-500/40 bg-violet-500/15 text-foreground"
                  : "border-border-subtle bg-surface-elevated text-muted",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
      {showDesktop && (
        <div className="flex w-[11rem] flex-col gap-1.5" role="group" aria-label="Thema">
          <p className="mb-1 text-center text-[9px] font-bold uppercase tracking-wider text-muted">
            Thema
          </p>
          {THEMES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTheme(item.id as ThemeId)}
              aria-pressed={theme === item.id}
              title={`${item.label} — ${item.hint}`}
              className={cx(
                "rounded-xl border px-3 py-2 text-left transition-all duration-300",
                theme === item.id
                  ? "border-violet-500/40 bg-violet-500/15 shadow-[0_4px_20px_rgba(124,58,237,0.15)]"
                  : "border-border-subtle bg-surface-elevated/80 hover:border-violet-500/25",
              )}
            >
              <span className="block text-[10px] font-bold text-foreground">{item.label}</span>
              <span className="block text-[9px] text-muted">{item.hint}</span>
            </button>
          ))}
        </div>
      )}
    </>
  );
}
