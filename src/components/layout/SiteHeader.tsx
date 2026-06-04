"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HeroMobileNav } from "@/components/layout/HeroMobileNav";
import { FOUNDING_NOTICE_OFFSET } from "@/components/layout/FoundingNoticeBar";
import { copy, site } from "@/lib/copy";
import { cx } from "@/lib/cx";

const SCROLL_THRESHOLD = 12;

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
        withNotice ? FOUNDING_NOTICE_OFFSET : "top-0",
        scrolled
          ? "border-b border-white/10 bg-[#08080f] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          : "border-b border-transparent bg-transparent shadow-none",
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <nav className="flex items-center justify-between gap-3 py-3 sm:py-4">
          <Link href="/" className="text-lg font-bold tracking-tight text-white sm:text-xl">
            Frydai
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="#capabilities"
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {nav.features}
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {nav.howItWorks}
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {nav.pricing}
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {nav.faq}
            </Link>
            <Link
              href={site.loginUrl}
              className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10"
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
