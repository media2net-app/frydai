"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { DashboardActivityProvider } from "@/components/dashboard/DashboardActivityProvider";
import { DashboardOperatorProvider } from "@/components/dashboard/DashboardOperatorProvider";
import {
  ActivitySidebarPanel,
  DashboardActivitySidebar,
} from "@/components/dashboard/DashboardActivitySidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { copy } from "@/lib/copy";
import { cx } from "@/lib/cx";

type DashboardShellProps = {
  children: React.ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  const { activitySidebar: t } = copy.dashboard;
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activityMobileOpen, setActivityMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen || activityMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen, activityMobileOpen]);

  const mobileNav = mounted
    ? createPortal(
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileNavOpen(false)}
            className={cx(
              "fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity lg:hidden",
              mobileNavOpen ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          />
          <div
            className={cx(
              "fixed inset-y-0 left-0 z-[61] transition-transform duration-300 ease-out lg:hidden",
              mobileNavOpen ? "translate-x-0" : "pointer-events-none -translate-x-full",
            )}
          >
            <DashboardSidebar onNavigate={() => setMobileNavOpen(false)} className="h-full shadow-2xl" />
          </div>
        </>,
        document.body,
      )
    : null;

  const mobileActivity = mounted
    ? createPortal(
        <>
          <button
            type="button"
            aria-label={t.collapse}
            onClick={() => setActivityMobileOpen(false)}
            className={cx(
              "fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity lg:hidden",
              activityMobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          />
          <div
            className={cx(
              "fixed inset-y-0 right-0 z-[61] transition-transform duration-300 ease-out lg:hidden",
              activityMobileOpen ? "translate-x-0" : "pointer-events-none translate-x-full",
            )}
          >
            <ActivitySidebarPanel
              expanded
              onToggleExpanded={() => setActivityMobileOpen(false)}
              onNavigate={() => setActivityMobileOpen(false)}
              className="h-full w-[17.5rem] shadow-2xl"
            />
          </div>
        </>,
        document.body,
      )
    : null;

  return (
    <DashboardOperatorProvider>
      <DashboardActivityProvider>
        <div className="flex h-screen overflow-hidden bg-[#08080f] text-white">
        <div className="hidden lg:flex">
          <DashboardSidebar />
        </div>

        <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
        <div className="pointer-events-none absolute left-4 top-4 z-20 flex gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            className="pointer-events-auto rounded-lg border border-white/15 bg-[#08080f]/90 p-2 text-white/80 backdrop-blur-sm transition-colors hover:bg-white/10"
            aria-label="Open menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setActivityMobileOpen(true)}
            className="pointer-events-auto rounded-lg border border-white/15 bg-[#08080f]/90 p-2 text-white/80 backdrop-blur-sm transition-colors hover:bg-white/10"
            aria-label={t.expand}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </button>
        </div>

        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="w-full min-w-0 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 max-lg:pt-14">
            {children}
          </div>
        </main>
      </div>

        <div className="hidden shrink-0 lg:flex">
          <DashboardActivitySidebar />
        </div>

        {mobileNav}
        {mobileActivity}
        </div>
      </DashboardActivityProvider>
    </DashboardOperatorProvider>
  );
}
