import Link from "next/link";
import { copy, site } from "@/lib/copy";

const PRODUCT_LINKS = [
  { href: "#capabilities", labelKey: "features" as const },
  { href: "#creatives", labelKey: "creatives" as const },
  { href: "#demo", labelKey: "demo" as const },
  { href: "#how-it-works", labelKey: "howItWorks" as const },
];

const COMPANY_LINKS = [
  { href: "#pricing", labelKey: "pricing" as const },
  { href: "#faq", labelKey: "faq" as const },
  { href: site.loginUrl, labelKey: "login" as const, external: false },
];

export function SiteFooter() {
  const { nav, footer: t } = copy;
  const year = new Date().getFullYear();

  const productLabels: Record<(typeof PRODUCT_LINKS)[number]["labelKey"], string> = {
    features: nav.features,
    creatives: t.creatives,
    demo: t.demo,
    howItWorks: nav.howItWorks,
  };

  const companyLabels: Record<(typeof COMPANY_LINKS)[number]["labelKey"], string> = {
    pricing: nav.pricing,
    faq: nav.faq,
    login: nav.login,
  };

  return (
    <footer className="border-t border-white/10 bg-[#08080f]">
      <div className="border-b border-white/10 bg-gradient-to-b from-violet-950/30 to-transparent">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-16 md:py-20">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            {t.ctaTitle}
          </h2>
          <p className="mt-3 text-base text-white/55 sm:text-lg">{t.ctaSubtitle}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={site.whopCheckout}
              className="inline-flex w-full justify-center rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-500/30 transition-all hover:brightness-110 sm:w-auto"
            >
              {t.ctaPrimary} →
            </a>
            <a
              href={site.demoUrl}
              className="inline-flex w-full justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-base font-semibold text-white/90 backdrop-blur-sm transition-colors hover:bg-white/10 sm:w-auto"
            >
              {t.ctaSecondary}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="text-xl font-bold tracking-tight text-white">
              Frydai
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50">{t.tagline}</p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-teal-300/70">
              {t.channels}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
              {t.product}
            </p>
            <ul className="mt-4 space-y-2.5">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {productLabels[link.labelKey]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
              {t.company}
            </p>
            <ul className="mt-4 space-y-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {companyLabels[link.labelKey]}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {companyLabels[link.labelKey]}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
              {t.legal}
            </p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={t.privacyUrl}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {t.privacy}
                </a>
              </li>
              <li>
                <a
                  href={t.termsUrl}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {t.terms}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 py-6 text-center sm:px-6">
          <p className="text-xs text-white/35">
            {t.copyright.replace("{year}", String(year))}
          </p>
          <p className="max-w-2xl text-[10px] leading-relaxed text-white/30">{t.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
