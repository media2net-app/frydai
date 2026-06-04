"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { copy } from "@/lib/copy";
import { cx } from "@/lib/cx";
import {
  FOUNDING_FEATURES,
  FRYDAI_PERIOD,
  FRYDAI_PRICE,
} from "@/lib/pricing-data";
import Link from "next/link";

type DemoCheckoutModalProps = {
  open: boolean;
  onClose: () => void;
};

type Step = "form" | "processing" | "success";

const DEMO_CARD = {
  number: "4242 4242 4242 4242",
  expiry: "12 / 28",
  cvc: "123",
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function DemoCheckoutModal({ open, onClose }: DemoCheckoutModalProps) {
  const t = copy.checkoutModal;
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<Step>("form");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setStep("form");
    setEmail("");
    setName("");
    setTerms(false);
    setError(null);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && step !== "processing") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, step]);

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError(t.errorEmail);
      return;
    }
    if (!terms) {
      setError(t.errorTerms);
      return;
    }

    setError(null);
    setStep("processing");
    window.setTimeout(() => setStep("success"), 1400);
  };

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[250] flex items-end justify-center sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-checkout-title"
    >
      <button
        type="button"
        aria-label={t.close}
        onClick={() => {
          if (step !== "processing") onClose();
        }}
        disabled={step === "processing"}
        className="absolute inset-0 bg-surface/80 backdrop-blur-md disabled:cursor-wait"
      />

      <div
        className={cx(
          "relative z-10 flex w-full max-w-md flex-col overflow-hidden",
          "max-h-[92dvh] rounded-t-2xl border border-border-subtle bg-surface-elevated shadow-[0_24px_80px_rgba(0,0,0,0.65)]",
          "sm:max-h-[90vh] sm:rounded-2xl",
        )}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border-subtle px-4 py-3.5">
          <p id="demo-checkout-title" className="text-sm font-semibold text-foreground">
            {t.title}
          </p>
          <button
            type="button"
            onClick={onClose}
            disabled={step === "processing"}
            aria-label={t.close}
            className="rounded-lg p-1.5 text-muted-strong transition-colors hover:bg-fill-muted hover:text-foreground disabled:opacity-40"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5 sm:py-5">
          {step === "success" ? (
            <div className="flex flex-col items-center py-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-2xl text-emerald-400">
                ✓
              </div>
              <h3 className="mt-4 text-lg font-bold text-foreground">{t.successTitle}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{t.successBody}</p>
              <Link
                href="/login"
                className="mt-6 inline-flex w-full justify-center rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-500 px-6 py-3 text-sm font-semibold text-foreground shadow-lg shadow-violet-500/25 transition-all hover:brightness-110"
              >
                {t.successCta} →
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 text-sm text-muted transition-colors hover:text-foreground/70"
              >
                {t.successClose}
              </button>
            </div>
          ) : (
            <>
              <div className="rounded-xl border border-amber-400/25 bg-amber-500/10 px-3 py-2.5">
                <p className="text-[10px] font-bold uppercase tracking-wide text-amber-200">
                  {t.demoBadge}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-amber-100/70">{t.demoNote}</p>
              </div>

              <div className="mt-4 rounded-xl border border-border-subtle bg-inset p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">{t.planName}</p>
                    <p className="mt-0.5 text-xs text-muted">{t.planPeriod}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold tabular-nums text-foreground">{FRYDAI_PRICE}</p>
                    <p className="text-xs text-muted">{FRYDAI_PERIOD}</p>
                  </div>
                </div>
                <ul className="mt-3 space-y-1.5 border-t border-border-subtle pt-3">
                  {FOUNDING_FEATURES.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-xs text-muted">
                      <span className="text-emerald-400/90">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div>
                  <label htmlFor="checkout-email" className="text-xs font-medium text-muted-strong">
                    {t.emailLabel}
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    disabled={step === "processing"}
                    className="mt-1.5 w-full rounded-xl border border-border-subtle bg-fill-subtle px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 disabled:opacity-60"
                  />
                </div>

                <div>
                  <label htmlFor="checkout-name" className="text-xs font-medium text-muted-strong">
                    {t.nameLabel}
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    disabled={step === "processing"}
                    className="mt-1.5 w-full rounded-xl border border-border-subtle bg-fill-subtle px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 disabled:opacity-60"
                  />
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-strong">{t.paymentTitle}</p>
                  <div className="mt-1.5 space-y-2 rounded-xl border border-border-subtle bg-inset p-3">
                    <div>
                      <label htmlFor="checkout-card" className="sr-only">
                        {t.cardNumber}
                      </label>
                      <input
                        id="checkout-card"
                        readOnly
                        value={DEMO_CARD.number}
                        className="w-full rounded-lg border border-border-subtle bg-surface px-3 py-2 font-mono text-sm text-muted-strong outline-none"
                        aria-readonly
                      />
                      <p className="mt-1 text-[10px] text-muted">{t.cardNumber}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        readOnly
                        value={DEMO_CARD.expiry}
                        aria-label={t.cardExpiry}
                        className="rounded-lg border border-border-subtle bg-surface px-3 py-2 font-mono text-sm text-muted-strong outline-none"
                      />
                      <input
                        readOnly
                        value={DEMO_CARD.cvc}
                        aria-label={t.cardCvc}
                        className="rounded-lg border border-border-subtle bg-surface px-3 py-2 font-mono text-sm text-muted-strong outline-none"
                      />
                    </div>
                  </div>
                </div>

                <label className="flex cursor-pointer items-start gap-2.5">
                  <input
                    type="checkbox"
                    checked={terms}
                    onChange={(e) => setTerms(e.target.checked)}
                    disabled={step === "processing"}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-border-subtle bg-fill-subtle accent-violet-600"
                  />
                  <span className="text-xs leading-relaxed text-muted">{t.terms}</span>
                </label>

                {error ? (
                  <p className="text-xs text-rose-400" role="alert">
                    {error}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={step === "processing"}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-500 px-6 py-3 text-sm font-semibold text-foreground shadow-lg shadow-violet-500/25 transition-all hover:brightness-110 disabled:cursor-wait disabled:opacity-80"
                >
                  {step === "processing" ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      {t.processing}
                    </>
                  ) : (
                    t.submit
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
