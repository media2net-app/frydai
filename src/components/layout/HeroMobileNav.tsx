"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { FrydaiLogo } from "@/components/brand/FrydaiLogo";

type HeroMobileNavProps = {
  menuLabel: string;
  closeLabel: string;
  features: string;
  howItWorks: string;
  pricing: string;
  faq: string;
  login: string;
  loginUrl: string;
};

export function HeroMobileNav({
  menuLabel,
  closeLabel,
  features,
  howItWorks,
  pricing,
  faq,
  login,
  loginUrl,
}: HeroMobileNavProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const links = [
    { href: "#capabilities", label: features },
    { href: "#how-it-works", label: howItWorks },
    { href: "#pricing", label: pricing },
    { href: "#faq", label: faq },
  ];

  const overlay = mounted
    ? createPortal(
        <>
          <button
            type="button"
            aria-label={closeLabel}
            onClick={() => setOpen(false)}
            className={`fixed inset-0 z-[200] bg-[#101828]/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
              open ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          />
          <aside
            id="hero-mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label={menuLabel}
            aria-hidden={!open}
            className={`fixed right-0 top-0 z-[201] flex h-full w-[min(100vw,20rem)] flex-col border-l border-white/10 bg-[#12101f] shadow-2xl transition-transform duration-300 ease-out md:hidden ${
              open ? "translate-x-0" : "pointer-events-none translate-x-full"
            }`}
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-4">
              <FrydaiLogo
                markClassName="h-7 w-7"
                wordmarkClassName="text-base font-semibold"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                aria-label={closeLabel}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 p-4">
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {label}
                </Link>
              ))}
              <a
                href={loginUrl}
                className="mt-4 rounded-full border border-white/20 px-4 py-3 text-center text-base font-medium text-white/90 transition-colors hover:bg-white/10"
              >
                {login}
              </a>
            </nav>
          </aside>
        </>,
        document.body,
      )
    : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative z-20 inline-flex items-center rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium leading-none text-white transition-colors hover:bg-white/20 md:hidden"
        aria-expanded={open}
        aria-controls="hero-mobile-nav"
      >
        {menuLabel}
      </button>
      {overlay}
    </>
  );
}
