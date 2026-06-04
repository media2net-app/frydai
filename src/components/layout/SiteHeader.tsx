"use client";

import Link from "next/link";
import { FrydaiLogoLink } from "@/components/brand/FrydaiLogo";
import { HeroMobileNav } from "@/components/layout/HeroMobileNav";
import { useHomepageChrome } from "@/components/layout/HomepageChromeContext";
import { useTheme } from "@/components/theme/ThemeProvider";
import { FOUNDING_NOTICE_OFFSET } from "@/components/layout/FoundingNoticeBar";
import { copy, site } from "@/lib/copy";
import { cx } from "@/lib/cx";

/** Nav bar height — keep in sync with hero header spacers */
export const SITE_HEADER_HEIGHT = "h-14 sm:h-16";
export const SITE_HEADER_HEIGHT_EXPANDED = "h-[4.75rem] sm:h-[5.5rem]";

type SiteHeaderProps = {
  /** Offset below fixed founding notice bar */
  withNotice?: boolean;
};

export function SiteHeader({ withNotice = false }: SiteHeaderProps) {
  const { nav } = copy;
  const { scrolled, expanded } = useHomepageChrome();
  const { theme } = useTheme();

  return (
    <header
      className={cx(
        "fixed inset-x-0 z-50 transition-[height,background-color,border-color,box-shadow] duration-500 ease-out",
        expanded ? SITE_HEADER_HEIGHT_EXPANDED : SITE_HEADER_HEIGHT,
        withNotice ? FOUNDING_NOTICE_OFFSET : "top-0",
        theme === "light" && "site-header--light-top",
        theme === "light" && scrolled && "site-header--scrolled",
        scrolled
          ? "border-b border-border-subtle bg-header-bg shadow-[0_8px_32px_var(--theme-header-shadow)]"
          : "border-b border-transparent bg-transparent shadow-none",
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-7xl items-center px-4 sm:px-6">
        <nav className="flex w-full items-center justify-between gap-3">
          <FrydaiLogoLink
            markClassName={cx(
              "transition-[width,height] duration-500 ease-out",
              expanded ? "h-14 w-14 sm:h-16 sm:w-16" : "h-7 w-7 sm:h-8 sm:w-8",
            )}
            wordmarkClassName={cx(
              "transition-[font-size] duration-500 ease-out",
              expanded ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl",
            )}
            className={cx(
              "transition-[gap] duration-500 ease-out",
              expanded ? "gap-3 sm:gap-3.5" : "gap-2.5",
            )}
          />

          <div className="hidden h-full items-center gap-6 md:flex">
            <Link
              href="#capabilities"
              className="inline-flex items-center text-sm font-medium leading-none text-muted-strong transition-colors hover:text-foreground"
            >
              {nav.features}
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center text-sm font-medium leading-none text-muted-strong transition-colors hover:text-foreground"
            >
              {nav.howItWorks}
            </Link>
            <Link
              href="#pricing"
              className="inline-flex items-center text-sm font-medium leading-none text-muted-strong transition-colors hover:text-foreground"
            >
              {nav.pricing}
            </Link>
            <Link
              href="#faq"
              className="inline-flex items-center text-sm font-medium leading-none text-muted-strong transition-colors hover:text-foreground"
            >
              {nav.faq}
            </Link>
            <Link
              href={site.loginUrl}
              className="inline-flex items-center rounded-full border border-border-subtle px-4 py-2 text-sm font-medium leading-none text-foreground transition-colors hover:bg-fill-muted"
            >
              {nav.login}
            </Link>
          </div>

          <HeroMobileNav
            menuLabel={nav.menu}
            closeLabel={nav.closeMenu}
            features={nav.features}
            howItWorks={nav.howItWorks}
            pricing={nav.pricing}
            faq={nav.faq}
            login={nav.login}
            loginUrl={site.loginUrl}
          />
        </nav>
      </div>
    </header>
  );
}
