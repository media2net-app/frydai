import { cx } from "@/lib/cx";

type DashboardPageHeaderProps = {
  title?: string;
  welcome?: string;
  subtitle: string;
  className?: string;
};

export function DashboardPageHeader({
  title,
  welcome,
  subtitle,
  className,
}: DashboardPageHeaderProps) {
  return (
    <div className={cx("mb-6 sm:mb-8", className)}>
      {welcome ? (
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-teal-300/80 sm:text-xs">
          {welcome}
        </p>
      ) : null}
      {title && !welcome ? (
        <h1
          className={cx(
            "text-xl font-bold tracking-tight text-white sm:text-2xl",
            welcome ? "mt-2" : "",
          )}
        >
          {title}
        </h1>
      ) : null}
      <p
        className={cx(
          "text-sm text-white/55 sm:text-base",
          welcome || title ? "mt-2" : "",
        )}
      >
        {subtitle}
      </p>
    </div>
  );
}
