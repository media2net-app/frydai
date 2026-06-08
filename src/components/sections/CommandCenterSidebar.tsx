"use client";

import { FrydaiLogo } from "@/components/brand/FrydaiLogo";
import { CommandCenterNavIcon } from "@/components/sections/CommandCenterNavIcon";
import { copy } from "@/lib/copy";
import { cx } from "@/lib/cx";
import { COMMAND_CENTER_NAV_GROUPS, type CommandCenterViewId } from "@/lib/command-center/nav";

type CommandCenterSidebarProps = {
  activeId: CommandCenterViewId;
  onSelect: (id: CommandCenterViewId) => void;
};

/** Marketing command center — Frydai OS sidebar met interactieve navigatie */
export function CommandCenterSidebar({ activeId, onSelect }: CommandCenterSidebarProps) {
  const { dashboard: t } = copy;

  return (
    <aside className="command-center-sidebar hidden w-[13.5rem] shrink-0 flex-col border-r border-border-subtle md:flex lg:w-[15rem]">
      <div className="flex shrink-0 items-center gap-2 border-b border-border-subtle px-3 py-3">
        <FrydaiLogo
          markVariant="purple"
          markClassName="h-7 w-7"
          wordmarkClassName="text-base"
        />
        <span className="command-center-os-badge rounded-full border border-violet-500/25 bg-violet-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-600">
          OS
        </span>
      </div>

      <p className="shrink-0 px-3 pt-3 text-[10px] font-semibold uppercase tracking-wider text-muted">
        {t.store}
      </p>

      <div className="command-center-os-toggle mx-2 mt-2 shrink-0 rounded-lg border border-border-subtle px-2.5 py-2">
        <div className="flex items-center justify-between gap-2">
          <span className="flex min-w-0 items-center gap-1.5">
            <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="truncate text-[10px] font-semibold uppercase tracking-wider text-muted-strong">
              {t.os.label}
            </span>
          </span>
          <span className="command-center-os-on rounded-md bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white">
            {t.os.on}
          </span>
        </div>
      </div>

      <nav
        className="mt-2 min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-2 pb-3"
        aria-label="Frydai OS"
      >
        {COMMAND_CENTER_NAV_GROUPS.map((group) => (
          <div key={group.id} className="mb-3 last:mb-0">
            <p className="mb-1 px-2 text-[9px] font-semibold uppercase tracking-wider text-muted">
              {t.navGroups[group.labelKey]}
            </p>
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const active = item.id === activeId;
                const label = t.nav[item.labelKey];

                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => onSelect(item.id)}
                      className={cx(
                        "command-center-nav-item flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-[13px] font-medium transition-colors",
                        active
                          ? "command-center-nav-item--active bg-violet-500/12 text-foreground"
                          : "text-muted-strong hover:bg-fill-subtle hover:text-foreground",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      <CommandCenterNavIcon
                        id={item.id}
                        className={cx(
                          "h-4 w-4",
                          active ? "text-violet-600" : "text-muted",
                        )}
                      />
                      <span className="truncate">{label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="command-center-sidebar-footer shrink-0 border-t border-border-subtle p-3">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-muted">
          {t.account.subscription}
        </p>
        <p className="mt-1 text-[11px] leading-snug text-muted-strong">{t.account.plan}</p>
      </div>
    </aside>
  );
}
