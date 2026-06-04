"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FrydaiLogoLink } from "@/components/brand/FrydaiLogo";
import { HeroMobileNav } from "@/components/layout/HeroMobileNav";
import { FOUNDING_NOTICE_OFFSET } from "@/components/layout/FoundingNoticeBar";
import { copy, site } from "@/lib/copy";
import { cx } from "@/lib/cx";

const SCROLL_THRESHOLD = 12;

/** Nav bar height — keep in sync with hero header spacer in HeroBlock */
export const SITE_HEADER_HEIGHT = "h-14 sm:h-16";

type SiteHeaderProps = {
  /** Offset below fixed founding notice bar */
  withNotice?: boolean;
};

export function SiteHeader({ withNotice = false }: SiteHeaderProps) {
  const { nav } = copy;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={cx(
        "fixed inset-x-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
        SITE_HEADER_HEIGHT,
        withNotice ? FOUNDING_NOTICE_OFFSET : "top-0",
        scrolled
          ? "border-b border-white/10 bg-[#08080f] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          : "border-b border-transparent bg-transparent shadow-none",
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-7xl items-center px-4 sm:px-6">
        <nav className="flex w-full items-center justify-between gap-3">
          <FrydaiLogoLink markClassName="h-7 w-7 sm:h-8 sm:w-8" />

          <div className="hidden h-full items-center gap-6 md:flex">
            <Link
              href="#capabilities"
              className="inline-flex items-center text-sm font-medium leading-none text-white/80 transition-colors hover:text-white"
            >
              {nav.features}
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center text-sm font-medium leading-none text-white/80 transition-colors hover:text-white"
            >
              {nav.howItWorks}
            </Link>
            <Link
              href="#pricing"
              className="inline-flex items-center text-sm font-medium leading-none text-white/80 transition-colors hover:text-white"
            >
              {nav.pricing}
            </Link>
            <Link
              href="#faq"
              className="inline-flex items-center text-sm font-medium leading-none text-white/80 transition-colors hover:text-white"
            >
              {nav.faq}
            </Link>
            <Link
              href={site.loginUrl}
              className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm font-medium leading-none text-white/90 transition-colors hover:bg-white/10"
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
