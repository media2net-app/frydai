import { FrydaiMark } from "@/components/brand/FrydaiLogo";

/** Purple tile with white Frydai beeldmerk — Viktor operator card style */
export function ViktorFrydaiMarkIcon({ size = "md" }: { size?: "sm" | "md" }) {
  const markSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <span className="viktor-frydai-mark-icon" aria-hidden>
      <FrydaiMark variant="white" className={markSize} />
    </span>
  );
}
