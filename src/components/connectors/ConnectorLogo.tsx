import Image from "next/image";
import { cx } from "@/lib/cx";
import type { DashboardConnector } from "@/lib/command-center/connectors-data";

type ConnectorLogoProps = {
  connector: DashboardConnector;
  size?: number;
  className?: string;
};

export function ConnectorLogo({ connector, size = 26, className }: ConnectorLogoProps) {
  if (connector.iconSrc) {
    return (
      <span
        className={cx(
          "connector-logo flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white p-1.5 shadow-[0_1px_2px_rgba(10,10,18,0.06)] ring-1 ring-border-subtle",
          className,
        )}
        style={{ width: size + 14, height: size + 14 }}
      >
        <Image
          src={connector.iconSrc}
          alt=""
          width={size}
          height={size}
          className="h-full w-full object-contain"
          aria-hidden
        />
      </span>
    );
  }

  return (
    <span
      className={cx(
        "flex shrink-0 items-center justify-center rounded-lg text-xs font-bold",
        connector.monogramClass,
        className,
      )}
      style={{ width: size + 14, height: size + 14 }}
    >
      {connector.monogram}
    </span>
  );
}
