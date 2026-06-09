import { cx } from "@/lib/cx";

type IllustrativeDisclaimerProps = {
  children: React.ReactNode;
  className?: string;
};

/** Visually distinct footnote for illustrative metrics and demo content. */
export function IllustrativeDisclaimer({ children, className }: IllustrativeDisclaimerProps) {
  return <p className={cx("illustrative-disclaimer", className)}>{children}</p>;
}
