"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FrydaiLogoLink, FrydaiMark } from "@/components/brand/FrydaiLogo";
import { HERO_INTEGRATION_LOGOS } from "@/components/hero/integration-logos";
import { site } from "@/lib/copy";
import { FAQ_ITEMS } from "@/lib/faq-data";
import { platformLogos } from "@/lib/platform-logos";
import { TESTIMONIALS } from "@/lib/testimonials-data";
import { VIKTOR_LANDING } from "@/lib/viktor-landing-data";
import { ViktorHowItWorksSection } from "@/components/viktor/ViktorHowItWorksSection";
import { ViktorUseCasesSection } from "@/components/viktor/ViktorUseCasesSection";
import { ViktorValueCardsSection } from "@/components/viktor/ViktorValueCardsSection";
import { ViktorCta } from "@/components/viktor/viktor-shared";

const STACK_LOGOS = [
  { src: platformLogos.shopify, name: "Shopify" },
  { src: platformLogos.meta, name: "Meta" },
  { src: platformLogos.googleAds, name: "Google Ads" },
  { src: platformLogos.klaviyo, name: "Klaviyo" },
  { src: platformLogos.stripe, name: "Stripe" },
  { src: platformLogos.telegram, name: "Telegram" },
];

function TrustCheck() {
  return (
    <svg className="viktor-trust-check h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function NavChevron() {
  return (
    <svg className="viktor-nav-chevron" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ViktorHeader() {
  const { nav } = VIKTOR_LANDING;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`viktor-nav-shell ${scrolled ? "viktor-nav-shell--scrolled" : ""}`}>
      <div className="viktor-nav-pill">
        <div className="viktor-nav-pill-inner">
          <Link href="/viktor" className="viktor-nav-logo min-w-0 justify-self-start">
            <FrydaiMark variant="purple" className="viktor-nav-logo-mark shrink-0" />
            <span className="viktor-nav-logo-text">frydai</span>
          </Link>

          <nav className="viktor-nav-links hidden lg:flex">
            {nav.items.map((item) => (
              <Link key={item.label} href={item.href} className="viktor-nav-link group">
                {item.label}
                {item.hasDropdown ? <NavChevron /> : null}
              </Link>
            ))}
          </nav>

          <div className="viktor-nav-actions justify-self-end gap-2">
            <button type="button" className="viktor-nav-menu-btn lg:hidden" aria-label="Menu">
              Menu
            </button>
            <ViktorCta className="!h-10 shrink-0 !px-4 !text-[0.8125rem] sm:!px-6 sm:!text-sm">
              {nav.cta}
            </ViktorCta>
          </div>
        </div>
      </div>
    </header>
  );
}

export function ViktorLandingPage() {
  const t = VIKTOR_LANDING;
  const [openFaq, setOpenFaq] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  return (
    <div className="viktor-page min-h-screen">
      {/* Hero with gradient blob + fixed glass nav */}
      <div className="viktor-hero-wrap">
        <div className="viktor-hero-blob" aria-hidden />
        <ViktorHeader />
        <section className="viktor-hero-content px-4 pb-16 sm:px-6 sm:pb-20">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <p className="viktor-hero-stat">{t.hero.stat}</p>
            <h1 className="viktor-hero-title mt-4">
              {t.hero.title}
              <br />
              {t.hero.titleAccent}
            </h1>
            <p className="viktor-hero-subtitle mt-6">{t.hero.subtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ViktorCta className="px-6">{t.hero.ctaPrimary}</ViktorCta>
              <ViktorCta variant="secondary" href={site.demoUrl} className="!border-white/30 !bg-white/10 !text-white hover:!bg-white/20">
                {t.hero.ctaSecondary}
              </ViktorCta>
            </div>
            <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2">
              {t.hero.trust.map((item) => (
                <li key={item} className="viktor-trust-item flex items-center gap-1.5">
                  <TrustCheck />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mx-auto mt-12 max-w-4xl">
            <p className="viktor-trusted-label text-center">{t.hero.trustedByLabel}</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {t.hero.trustedBy.map((name) => (
                <span key={name} className="viktor-trusted-name">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>

      <ViktorValueCardsSection />

      {/* Logo strip */}
      <section className="viktor-logo-strip py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="viktor-marquee-mask overflow-hidden">
            <div className="flex w-max animate-hero-logo-marquee items-center gap-10">
              {[...STACK_LOGOS, ...STACK_LOGOS, ...HERO_INTEGRATION_LOGOS.map((l) => ({ src: l.src, name: l.name }))].map(
                (logo, i) => (
                  <div key={`${logo.name}-${i}`} className="flex shrink-0 items-center gap-2.5">
                    <Image src={logo.src} alt="" width={22} height={22} className="object-contain" unoptimized />
                    <span className="text-sm font-semibold" style={{ color: "var(--v-grey)" }}>
                      {logo.name}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section id="compare" className="scroll-mt-28 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <span className="viktor-eyebrow">{t.comparison.eyebrow}</span>
          <h2 className="viktor-section-title mt-4">
            {t.comparison.title}
            <br />
            {t.comparison.titleAccent}
          </h2>
          <p className="viktor-section-subtitle mx-auto mt-4 max-w-2xl">{t.comparison.subtitle}</p>
        </div>

        <div className="viktor-comparison-wrap mx-auto mt-10 max-w-5xl">
          <div className="viktor-comparison-header hidden grid-cols-[1fr_1.2fr_1.2fr] gap-4 px-5 py-3.5 sm:grid">
            <span>{t.comparison.columns.task}</span>
            <span>{t.comparison.columns.others}</span>
            <span className="viktor-comparison-frydai-header -my-3.5 -mr-5 flex items-center rounded-tr-[calc(var(--v-radius-section)-1px)] px-5 py-3.5">
              {t.comparison.columns.frydai}
            </span>
          </div>
          {t.comparison.rows.map((row) => (
            <div
              key={row.task}
              className="viktor-comparison-row grid gap-3 px-5 py-5 sm:grid-cols-[1fr_1.2fr_1.2fr] sm:gap-4 sm:py-6"
            >
              <p className="viktor-comparison-task">{row.task}</p>
              <p className="viktor-comparison-others">
                <span className="font-medium sm:hidden" style={{ color: "var(--v-purple-700)" }}>
                  {t.comparison.columns.others}:{" "}
                </span>
                {row.others}
              </p>
              <p className="viktor-comparison-frydai rounded-xl px-3 py-2 sm:-my-2 sm:px-4 sm:py-3">
                <span className="font-medium sm:hidden" style={{ color: "var(--v-purple-700)" }}>
                  {t.comparison.columns.frydai}:{" "}
                </span>
                {row.frydai}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="viktor-section-alt px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="viktor-section-title text-center">What our customers say</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {TESTIMONIALS.map((item) => (
              <article key={item.id} className="viktor-card-solid flex h-full flex-col p-6">
                <p className="viktor-testimonial-quote flex-1">&ldquo;{item.quote}&rdquo;</p>
                {item.metric ? (
                  <span className="viktor-metric-badge mt-4 inline-flex w-fit">{item.metric}</span>
                ) : null}
                <div className="mt-5 border-t pt-4" style={{ borderColor: "var(--v-border-subtle)" }}>
                  <p className="text-sm font-semibold">{item.author}</p>
                  <p className="text-xs" style={{ color: "var(--v-grey)" }}>
                    {item.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ViktorHowItWorksSection />

      <ViktorUseCasesSection />

      {/* FAQ */}
      <section id="faq" className="viktor-section-alt scroll-mt-28 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="viktor-section-title text-center">FAQ</h2>
          <div className="viktor-card-solid mt-10 divide-y">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openFaq === item.id;
              return (
                <div key={item.id} className="px-5 sm:px-6">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : item.id)}
                    className="flex w-full items-start justify-between gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="viktor-faq-q">{item.question}</span>
                    <span
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm ${isOpen ? "viktor-faq-toggle" : ""}`}
                      style={!isOpen ? { color: "var(--v-grey)" } : undefined}
                      aria-hidden
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="viktor-faq-a pb-5">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="pricing" className="viktor-final-cta scroll-mt-28 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="viktor-section-title">{t.finalCta.title}</h2>
          <p className="viktor-section-subtitle mt-4">{t.finalCta.subtitle}</p>
          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {t.finalCta.features.map((f) => (
              <li key={f} className="viktor-feature-check flex items-center gap-2">
                <TrustCheck />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ViktorCta className="px-6">{t.finalCta.ctaPrimary}</ViktorCta>
            <ViktorCta variant="secondary" href="/#pricing" className="px-6">
              {t.finalCta.ctaSecondary}
            </ViktorCta>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="viktor-footer px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <FrydaiLogoLink
            href="/viktor"
            markVariant="purple"
            markClassName="h-6 w-6"
            wordmarkClassName="viktor-wordmark text-base font-semibold"
          />
          <p className="max-w-md text-center text-sm sm:text-left">{t.footer.tagline}</p>
          <div className="flex gap-4 text-sm">
            <Link href="/">{t.footer.original}</Link>
            <Link href="/viktor" className="font-semibold" style={{ color: "var(--v-purple-500)" }}>
              {t.footer.viktor}
            </Link>
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-6xl text-center text-xs">
          {t.footer.copyright.replace("{year}", String(new Date().getFullYear()))}
        </p>
      </footer>
    </div>
  );
}
