import Link from "next/link";
import Image from "next/image";
import { cx } from "@/lib/cx";

type FrydaiMarkProps = {
  className?: string;
};

/** Brand mark from /public/frydai-mark-mask.png (white on transparent) */
export function FrydaiMark({ className }: FrydaiMarkProps) {
  return (
    <Image
      src="/frydai-mark-mask.png"
      alt=""
      width={32}
      height={32}
      className={cx("shrink-0 object-contain", className)}
      priority
    />
  );
}

type FrydaiLogoProps = {
  className?: string;
  wordmarkClassName?: string;
  markClassName?: string;
  showWordmark?: boolean;
};

export function FrydaiLogo({
  className,
  wordmarkClassName,
  markClassName = "h-7 w-7 sm:h-8 sm:w-8",
  showWordmark = true,
}: FrydaiLogoProps) {
  return (
    <span className={cx("inline-flex items-center gap-2.5", className)}>
      <FrydaiMark className={markClassName} />
      {showWordmark ? (
        <span className={cx("font-bold leading-none tracking-tight", wordmarkClassName)}>
          Frydai
        </span>
      ) : null}
    </span>
  );
}

type FrydaiLogoLinkProps = FrydaiLogoProps & {
  href?: string;
  onClick?: () => void;
};

export function FrydaiLogoLink({
  href = "/",
  onClick,
  className,
  wordmarkClassName = "text-lg sm:text-xl",
  markClassName,
  showWordmark = true,
}: FrydaiLogoLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cx(
        "inline-flex items-center text-white transition-opacity hover:opacity-90",
        className,
      )}
      aria-label="Frydai home"
    >
      <FrydaiLogo
        wordmarkClassName={wordmarkClassName}
        markClassName={markClassName}
        showWordmark={showWordmark}
      />
    </Link>
  );
}
