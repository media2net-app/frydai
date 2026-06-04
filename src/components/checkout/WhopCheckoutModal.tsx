"use client";

import {
  EMBEDDED_CHECKOUT_IFRAME_ALLOW_STRING,
  EMBEDDED_CHECKOUT_IFRAME_SANDBOX_LIST,
  getEmbeddedCheckoutIframeUrl,
} from "@whop/checkout/util";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { copy, site } from "@/lib/copy";
import { cx } from "@/lib/cx";

const IFRAME_SANDBOX = EMBEDDED_CHECKOUT_IFRAME_SANDBOX_LIST.join(" ");

type WhopCheckoutModalProps = {
  open: boolean;
  onClose: () => void;
};

function isWhopCheckoutComplete(data: unknown): boolean {
  return (
    typeof data === "object" &&
    data !== null &&
    "event" in data &&
    (data as { event: string }).event === "complete" &&
    "__scope" in data &&
    (data as { __scope: string }).__scope === "whop-embedded-checkout"
  );
}

export function WhopCheckoutModal({ open, onClose }: WhopCheckoutModalProps) {
  const t = copy.checkoutModal;
  const [mounted, setMounted] = useState(false);
  const [iframeSrc, setIframeSrc] = useState<string | null>(null);
  const [iframeHeight, setIframeHeight] = useState(520);

  const handleComplete = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      setIframeSrc(null);
      document.body.style.overflow = "";
      return;
    }

    const returnUrl = `${window.location.origin}${window.location.pathname}`;
    setIframeSrc(
      getEmbeddedCheckoutIframeUrl(
        site.whopPlanId,
        "dark",
        undefined,
        window.location.origin,
        false,
        true,
        undefined,
        undefined,
        undefined,
        { accentColor: "violet", highContrast: false },
        false,
        false,
        false,
        false,
        false,
        undefined,
        undefined,
        returnUrl,
        undefined,
        undefined,
        undefined,
        undefined,
        true,
      ),
    );
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const onMessage = (e: MessageEvent) => {
      if (isWhopCheckoutComplete(e.data)) handleComplete();
      if (
        typeof e.data === "object" &&
        e.data !== null &&
        "event" in e.data &&
        (e.data as { event: string }).event === "resize" &&
        "height" in e.data &&
        typeof (e.data as { height: number }).height === "number"
      ) {
        setIframeHeight((e.data as { height: number }).height);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("message", onMessage);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("message", onMessage);
    };
  }, [open, onClose, handleComplete]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[250] flex items-end justify-center sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="whop-checkout-title"
    >
      <button
        type="button"
        aria-label={t.close}
        onClick={onClose}
        className="absolute inset-0 bg-[#08080f]/80 backdrop-blur-md"
      />

      <div
        className={cx(
          "relative z-10 flex w-full max-w-md flex-col overflow-hidden",
          "max-h-[92dvh] rounded-t-2xl border border-white/10 bg-[#0c0c14] shadow-[0_24px_80px_rgba(0,0,0,0.65)]",
          "sm:max-h-[90vh] sm:rounded-2xl",
        )}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3.5">
          <p id="whop-checkout-title" className="text-sm font-semibold text-white">
            {t.title}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.close}
            className="rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {iframeSrc ? (
            <iframe
              key={iframeSrc}
              src={iframeSrc}
              title="Whop checkout"
              allow={EMBEDDED_CHECKOUT_IFRAME_ALLOW_STRING}
              sandbox={IFRAME_SANDBOX}
              className="w-full border-0"
              style={{ height: iframeHeight, minHeight: 480 }}
            />
          ) : (
            <div className="flex min-h-[420px] items-center justify-center">
              <p className="text-sm text-white/50">{t.loading}</p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
