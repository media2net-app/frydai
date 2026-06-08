"use client";

import Link from "next/link";
import { DeployFrydaiButton } from "@/components/checkout/DeployFrydaiButton";
import { FrydaiLogoLink } from "@/components/brand/FrydaiLogo";
import { HeroMobileNav } from "@/components/layout/HeroMobileNav";
import { FOUNDING_NOTICE_OFFSET } from "@/components/layout/FoundingNoticeBar";
import { useHomepageChrome } from "@/components/layout/HomepageChromeContext";
import { useTheme } from "@/components/theme/ThemeProvider";
import { copy } from "@/lib/copy";
import { cx } from "@/lib/cx";

/** Compact nav bar — sticky / scrolled */
export const SITE_HEADER_HEIGHT = "h-14 sm:h-16";

/** Tall nav bar — large logo on hero entry */
export const SITE_HEADER_HEIGHT_EXPANDED = "h-[4.75rem] sm:h-[5.5rem]";

const NAV_LINKS = [
  { href: "#capabilities", key: "features" as const },
  { href: "#integrations", key: "integrations" as const },
  { href: "#how-it-works", key: "howItWorks" as const },
  { href: "#pricing", key: "pricing" as const },
  { href: "#faq", key: "faq" as const },
];

export function SiteHeader() {
  const { nav } = copy;
  const { scrolled, pastHero, expanded } = useHomepageChrome();
  const { theme } = useTheme();

  return (
    <header
      className={cx(
        "site-header fixed inset-x-0 z-50 transition-[height,top,background-color,border-color,box-shadow] duration-500 ease-out",
        expanded ? SITE_HEADER_HEIGHT_EXPANDED : SITE_HEADER_HEIGHT,
        pastHero ? FOUNDING_NOTICE_OFFSET : "top-0",
        theme === "light" && "site-header--light-top",
        theme === "light" && scrolled && "site-header--scrolled",
        scrolled
          ? "border-b border-border-subtle bg-header-bg shadow-[0_8px_32px_var(--theme-header-shadow)]"
          : "border-b border-transparent bg-transparent shadow-none",
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-7xl items-center px-4 sm:px-6">
        <nav className="relative flex w-full items-center justify-between gap-3">
          <FrydaiLogoLink
            markVariant="purple"
            markClassName={cx(
              "transition-[width,height] duration-500 ease-out",
              expanded ? "h-14 w-14 sm:h-16 sm:w-16" : "h-7 w-7 sm:h-8 sm:w-8",
            )}
            wordmarkClassName={cx(
              "transition-[font-size] duration-500 ease-out",
              expanded ? "text-2xl sm:text-[1.75rem]" : "text-lg sm:text-xl",
            )}
            className={cx(
              "relative z-10 shrink-0 transition-[gap] duration-500 ease-out",
              expanded ? "gap-2.5 sm:gap-3" : "gap-2.5",
            )}
          />

          <div className="header-nav-glass radius-section absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 border border-border-subtle px-1.5 py-1 md:flex">
            {NAV_LINKS.map(({ href, key }) => (
              <Link
                key={href}
                href={href}
                className="radius-section-inner inline-flex items-center px-3.5 py-1.5 text-sm font-medium leading-none text-muted-strong transition-colors hover:bg-fill-muted hover:text-foreground"
              >
                {nav[key]}
              </Link>
            ))}
          </div>

          <div className="relative z-10 flex shrink-0 items-center gap-2">
            <DeployFrydaiButton
              variant="header"
              showArrow={false}
              className="hidden hover:!bg-white hover:!text-[#12101c] md:inline-flex"
            >
              {nav.getStarted}
            </DeployFrydaiButton>

            <HeroMobileNav
              menuLabel={nav.menu}
              closeLabel={nav.closeMenu}
              features={nav.features}
              integrations={nav.integrations}
              howItWorks={nav.howItWorks}
              pricing={nav.pricing}
              faq={nav.faq}
              getStarted={nav.getStarted}
            />
          </div>
        </nav>
      </div>
    </header>
  );
}
