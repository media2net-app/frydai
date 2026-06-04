"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FrydaiLogoLink } from "@/components/brand/FrydaiLogo";
import { DashboardNavIcon } from "@/components/dashboard/DashboardNavIcon";
import { OperatorOsToggle } from "@/components/dashboard/OperatorOsToggle";
import { copy } from "@/lib/copy";
import { cx } from "@/lib/cx";
import { DASHBOARD_NAV_GROUPS, getDashboardNavId } from "@/lib/dashboard/nav";

type DashboardSidebarProps = {
  onNavigate?: () => void;
  className?: string;
};

export function DashboardSidebar({ onNavigate, className }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const activeId = getDashboardNavId(pathname);
  const { dashboard: t } = copy;
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    onNavigate?.();
    await fetch("/api/demo/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <aside
      className={cx(
        "flex h-full w-[17rem] shrink-0 flex-col border-r border-white/10 bg-[#06060c]",
        className,
      )}
    >
      <div className="flex h-14 shrink-0 items-center gap-2.5 border-b border-white/10 px-4">
        <FrydaiLogoLink
          href="/dashboard"
          onClick={onNavigate}
          wordmarkClassName="text-lg"
          markClassName="h-7 w-7"
          className="min-w-0 shrink"
        />
        <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-violet-300">
          {t.demoBadge}
        </span>
      </div>

      <p className="px-4 pt-4 text-[11px] font-medium uppercase tracking-wider text-white/35">
        {t.store}
      </p>

      <OperatorOsToggle />

      <nav
        className="mt-2 min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-2 pb-4"
        aria-label="Dashboard"
      >
        {DASHBOARD_NAV_GROUPS.map((group) => (
          <div key={group.id} className="mb-4 last:mb-0">
            <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-white/30">
              {t.navGroups[group.labelKey]}
            </p>
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const active = item.id === activeId;
                const label = t.nav[item.labelKey];

                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={cx(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        active
                          ? "bg-violet-500/15 text-white"
                          : "text-white/60 hover:bg-white/[0.04] hover:text-white",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      <DashboardNavIcon
                        id={item.id}
                        className={active ? "text-violet-300" : "text-white/45"}
                      />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-white/10 p-4">
        <p className="text-[11px] font-medium uppercase tracking-wider text-white/35">
          {t.account.label}
        </p>
        <p className="mt-2 truncate text-sm text-white/80">demo@frydai.ai</p>
        <div className="mt-3">
          <p className="text-[11px] font-medium uppercase tracking-wider text-white/35">
            {t.account.subscription}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-white/55">{t.account.plan}</p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className={cx(
            "mt-4 w-full rounded-lg border border-white/15 px-3 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white",
            loggingOut && "opacity-60",
          )}
        >
          {loggingOut ? t.loggingOut : t.logout}
        </button>
      </div>
    </aside>
  );
}
