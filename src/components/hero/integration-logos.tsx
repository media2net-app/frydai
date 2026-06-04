import Image from "next/image";
import { cx } from "@/lib/cx";

export type IntegrationLogo = {
  id: string;
  name: string;
  src: string;
  /** Square icon size in px */
  iconSize?: number;
};

/** Frydai stack: frydai.ai + channel partners (icons styled like ecomclaw.co) */
export const HERO_INTEGRATION_LOGOS: IntegrationLogo[] = [
  { id: "claude", name: "Claude", src: "/platforms/claude.svg", iconSize: 24 },
  { id: "hermes", name: "Hermes", src: "/platforms/hermes.png", iconSize: 24 },
  { id: "gemini", name: "Gemini", src: "/platforms/gemini.png", iconSize: 24 },
  { id: "telegram", name: "Telegram", src: "/platforms/telegram.svg", iconSize: 24 },
  { id: "whatsapp", name: "WhatsApp", src: "/platforms/whatsapp.svg", iconSize: 24 },
];

export function IntegrationLogoMark({
  logo,
  plain = false,
}: {
  logo: IntegrationLogo;
  /** No icon backdrop — for logo marquees */
  plain?: boolean;
}) {
  const size = logo.iconSize ?? 24;

  return (
    <div
      className={cx(
        "flex shrink-0 items-center gap-2.5 px-1 py-1",
        !plain && "rounded-lg border border-transparent transition-colors hover:border-white/10 hover:bg-white/[0.03]",
      )}
      title={logo.name}
    >
      <span
        className={cx(
          "relative flex shrink-0 items-center justify-center overflow-hidden",
          !plain && "rounded-md bg-white/[0.06]",
        )}
        style={{ width: size + 8, height: size + 8 }}
      >
        <Image
          src={logo.src}
          alt=""
          width={size}
          height={size}
          className="h-auto max-h-[22px] w-auto max-w-[22px] object-contain"
          aria-hidden
        />
      </span>
      <span className="whitespace-nowrap text-sm font-semibold tracking-tight text-white/55 sm:text-[15px]">
        {logo.name}
      </span>
    </div>
  );
}
