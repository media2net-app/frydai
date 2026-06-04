"use client";

import Image from "next/image";
import { useState } from "react";
import { ConnectorConnectModal } from "@/components/dashboard/ConnectorConnectModal";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { copy } from "@/lib/copy";
import { cx } from "@/lib/cx";
import {
  CONNECTOR_CATEGORIES,
  DASHBOARD_CONNECTORS,
  type ConnectorCategory,
  type ConnectorStatus,
  type DashboardConnector,
} from "@/lib/dashboard/connectors-data";

function ConnectorIcon({ connector }: { connector: DashboardConnector }) {
  if (connector.iconSrc) {
    return (
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#0c0c14]">
        <Image
          src={connector.iconSrc}
          alt=""
          width={24}
          height={24}
          className="h-6 w-6 object-contain"
          aria-hidden
        />
      </span>
    );
  }

  return (
    <span
      className={cx(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold",
        connector.monogramClass,
      )}
    >
      {connector.monogram}
    </span>
  );
}

function ConnectorCard({
  connector,
  labels,
  onConnect,
}: {
  connector: DashboardConnector;
  labels: { connected: string; connect: string; comingSoon: string; manage: string };
  onConnect: () => void;
}) {
  const statusLabel =
    connector.status === "connected"
      ? labels.connected
      : connector.status === "available"
        ? labels.connect
        : labels.comingSoon;

  return (
    <DashboardPanel className="flex flex-col p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <ConnectorIcon connector={connector} />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-white">{connector.name}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-white/50">{connector.description}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/[0.06] pt-4">
        <span
          className={cx(
            "text-[11px] font-semibold uppercase tracking-wide",
            connector.status === "connected" && "text-emerald-300",
            connector.status === "available" && "text-white/45",
            connector.status === "coming_soon" && "text-white/30",
          )}
        >
          {statusLabel}
        </span>
        {connector.status === "connected" ? (
          <button
            type="button"
            className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-white/70 transition-colors hover:bg-white/10"
          >
            {labels.manage}
          </button>
        ) : connector.status === "available" ? (
          <button
            type="button"
            onClick={onConnect}
            className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 px-3 py-1 text-xs font-semibold text-white transition-opacity hover:opacity-90"
          >
            {labels.connect}
          </button>
        ) : null}
      </div>
    </DashboardPanel>
  );
}

export function DashboardConnectorsView() {
  const { connectors: t } = copy.dashboard;
  const [connectors, setConnectors] = useState(DASHBOARD_CONNECTORS);
  const [connectTarget, setConnectTarget] = useState<DashboardConnector | null>(null);

  const sectionTitles: Record<ConnectorCategory, string> = {
    channels: t.sections.channels,
    store: t.sections.store,
    ads: t.sections.ads,
    ai: t.sections.ai,
  };

  function setConnectorStatus(id: string, status: ConnectorStatus) {
    setConnectors((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c)),
    );
  }

  return (
    <>
      <div className="space-y-10">
        {CONNECTOR_CATEGORIES.map((category) => {
          const items = connectors.filter((c) => c.category === category);
          return (
            <section key={category}>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">
                {sectionTitles[category]}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {items.map((connector) => (
                  <ConnectorCard
                    key={connector.id}
                    connector={connector}
                    labels={{
                      connected: t.connected,
                      connect: t.connect,
                      comingSoon: t.comingSoon,
                      manage: t.manage,
                    }}
                    onConnect={() => setConnectTarget(connector)}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {connectTarget?.status === "available" ? (
        <ConnectorConnectModal
          connector={connectTarget}
          open
          onClose={() => setConnectTarget(null)}
          onConnected={() => setConnectorStatus(connectTarget.id, "connected")}
        />
      ) : null}
    </>
  );
}
