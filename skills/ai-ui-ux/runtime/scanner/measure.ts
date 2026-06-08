import type { RectSnapshot } from "../types";

export function rectFromElement(el: Element): RectSnapshot {
  const r = el.getBoundingClientRect();
  return {
    x: Math.round(r.x),
    y: Math.round(r.y),
    width: Math.round(r.width),
    height: Math.round(r.height),
    top: Math.round(r.top + window.scrollY),
    left: Math.round(r.left + window.scrollX),
  };
}

export function gapBetweenBottomAndTop(bottomEl: Element, topEl: Element): number {
  const a = bottomEl.getBoundingClientRect();
  const b = topEl.getBoundingClientRect();
  return Math.round(b.top - a.bottom);
}

export function truncateText(text: string, max = 200): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) return normalized;
  return `${normalized.slice(0, max)}…`;
}

export function inferCtaVariant(el: Element): "primary" | "secondary" | "unknown" {
  const className = el.className?.toString() ?? "";
  if (
    className.includes("from-violet") ||
    className.includes("bg-gradient") ||
    className.includes("DeployFrydai")
  ) {
    return "primary";
  }
  if (
    className.includes("btn-secondary") ||
    className.includes("border-border") ||
    className.includes("hero-glass-cta")
  ) {
    return "secondary";
  }
  const tag = el.tagName.toLowerCase();
  if (tag === "button" && !className.includes("border")) return "primary";
  return "unknown";
}
