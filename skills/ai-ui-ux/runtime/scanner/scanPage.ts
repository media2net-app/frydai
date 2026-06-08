import type {
  CtaSnapshot,
  HeadingSnapshot,
  PageSnapshot,
  SectionSnapshot,
} from "../types";
import {
  collectSectionInventory,
  summarizeContentItems,
} from "./collectSectionInventory";
import {
  gapBetweenBottomAndTop,
  inferCtaVariant,
  rectFromElement,
  truncateText,
} from "./measure";

const SECTION_SELECTORS =
  "section[id], header[id], footer[id], main[id], section, header, footer";

function sectionLabel(el: Element): string {
  const id = el.id;
  if (id) return id;
  const h2 = el.querySelector("h2");
  if (h2?.textContent) return truncateText(h2.textContent, 48);
  return el.tagName.toLowerCase();
}

function collectHeadings(root: ParentNode, sectionId?: string): HeadingSnapshot[] {
  const headings: HeadingSnapshot[] = [];
  root.querySelectorAll("h1, h2, h3").forEach((node) => {
    const text = node.textContent?.trim();
    if (!text) return;
    const style = window.getComputedStyle(node);
    const level = Number(node.tagName[1]);
    headings.push({
      level,
      text: truncateText(text, 120),
      fontSize: style.fontSize,
      lineHeight: style.lineHeight,
      sectionId,
    });
  });
  return headings;
}

function collectCtas(root: ParentNode, sectionId?: string): CtaSnapshot[] {
  const ctas: CtaSnapshot[] = [];
  const seen = new Set<string>();

  root.querySelectorAll("button, a[href]").forEach((node) => {
    const text = node.textContent?.replace(/\s+/g, " ").trim();
    if (!text || text.length < 2 || text.length > 80) return;
    const key = `${sectionId ?? "global"}:${text}`;
    if (seen.has(key)) return;
    seen.add(key);

    const tag = node.tagName.toLowerCase();
    const href = tag === "a" ? (node as HTMLAnchorElement).href : undefined;
    const variant = inferCtaVariant(node);

    ctas.push({ text, tag, href, variant, sectionId });
  });

  return ctas.slice(0, 12);
}

function textSampleFromSection(el: Element, hasRichContent: boolean): string {
  const clone = el.cloneNode(true) as HTMLElement;
  clone.querySelectorAll("script, style, noscript").forEach((n) => n.remove());
  return truncateText(clone.textContent ?? "", hasRichContent ? 500 : 200);
}

export function scanPage(): PageSnapshot {
  const sectionEls = Array.from(document.querySelectorAll(SECTION_SELECTORS)).filter(
    (el, i, arr) => {
      const rect = el.getBoundingClientRect();
      if (rect.height < 40) return false;
      return !arr.some(
        (other) => other !== el && other.contains(el) && other.tagName === el.tagName,
      );
    },
  );

  const sections: SectionSnapshot[] = sectionEls.map((el, index) => {
    const id = el.id || `section-${index}`;
    const label = sectionLabel(el);
    const headings = collectHeadings(el, id);
    const ctas = collectCtas(el, id);
    const contentItems = collectSectionInventory(el, id);
    const contentSummary = summarizeContentItems(contentItems);
    const rect = rectFromElement(el);
    const gapToNext =
      index < sectionEls.length - 1
        ? gapBetweenBottomAndTop(el, sectionEls[index + 1]!)
        : undefined;

    return {
      id,
      label,
      tag: el.tagName.toLowerCase(),
      rect,
      textSample: textSampleFromSection(el, contentItems.length > 0),
      contentItems,
      contentSummary,
      headings,
      ctas,
      gapToNext,
    };
  });

  const globalHeadings = collectHeadings(document.body);
  const allCtas = collectCtas(document.body);
  const h1Count = document.querySelectorAll("h1").length;
  const primaryCtaCount = allCtas.filter((c) => c.variant === "primary").length;

  return {
    url: window.location.href,
    pathname: window.location.pathname,
    scannedAt: new Date().toISOString(),
    theme: document.documentElement.dataset.theme ?? "unknown",
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    h1Count,
    primaryCtaCount,
    sections,
    globalHeadings: globalHeadings.slice(0, 20),
  };
}
