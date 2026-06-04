"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { copy } from "@/lib/copy";
import { cx } from "@/lib/cx";
import type { DashboardConnector } from "@/lib/dashboard/connectors-data";

type ConnectorConnectModalProps = {
  connector: DashboardConnector;
  open: boolean;
  onClose: () => void;
  onConnected: () => void;
};

export function ConnectorConnectModal({
  connector,
  open,
  onClose,
  onConnected,
}: ConnectorConnectModalProps) {
  const { connectModal: t } = copy.dashboard.connectors;
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"idle" | "connecting" | "success">("idle");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      setPhase("idle");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && phase !== "connecting") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose, phase]);

  async function handleAuthorize() {
    setPhase("connecting");
    await new Promise((resolve) => setTimeout(resolve, 1600));
    setPhase("success");
    onConnected();
    await new Promise((resolve) => setTimeout(resolve, 1100));
    onClose();
  }

  if (!mounted || !open) return null;

  const title = t.title.replace("{name}", connector.name);
  const successBody = t.successBody.replace("{name}", connector.name);

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label={t.cancel}
        onClick={phase === "connecting" ? undefined : onClose}
        className={cx(
          "absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity",
          phase === "connecting" && "pointer-events-none",
        )}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="connector-connect-title"
        className="relative z-10 w-full max-w-md"
      >
        <DashboardPanel className="overflow-hidden p-0 shadow-2xl shadow-black/50">
          {phase === "success" ? (
            <div className="px-6 py-10 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <h2 id="connector-connect-title" className="mt-4 text-lg font-semibold text-white">
                {t.successTitle}
              </h2>
              <p className="mt-2 text-sm text-white/55">{successBody}</p>
            </div>
          ) : (
            <>
              <div className="border-b border-white/[0.06] px-5 py-4 sm:px-6">
                <h2 id="connector-connect-title" className="text-lg font-semibold text-white">
                  {title}
                </h2>
                <p className="mt-1.5 text-sm text-white/50">{t.subtitle}</p>
              </div>

              <div className="space-y-4 px-5 py-5 sm:px-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                  {t.permissionsTitle}
                </p>
                <ul className="space-y-2">
                  {t.permissions.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-white/70">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="rounded-lg border border-amber-500/20 bg-amber-500/[0.06] px-3 py-2 text-xs text-amber-200/80">
                  {t.demoNote}
                </p>
              </div>

              <div className="flex flex-col-reverse gap-2 border-t border-white/[0.06] px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={phase === "connecting"}
                  className="rounded-lg border border-white/15 px-4 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/[0.06] disabled:opacity-50"
                >
                  {t.cancel}
                </button>
                <button
                  type="button"
                  onClick={handleAuthorize}
                  disabled={phase === "connecting"}
                  className="rounded-lg bg-gradient-to-r from-violet-600 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-70"
                >
                  {phase === "connecting" ? t.connecting : t.authorize}
                </button>
              </div>
            </>
          )}
        </DashboardPanel>
      </div>
    </div>,
    document.body,
  );
}
