import type { ScanLogFn } from "../log/types";
import type { PageSnapshot, SectionSnapshot } from "../types";
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
const HIGHLIGHT_CLASS = "ui-ux-scan-highlight";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sectionLabel(el: Element): string {
  const id = el.id;
  if (id) return id;
  const h2 = el.querySelector("h2");
  if (h2?.textContent) return truncateText(h2.textContent, 48);
  return el.tagName.toLowerCase();
}

function collectHeadings(root: ParentNode, sectionId?: string) {
  const headings: SectionSnapshot["headings"] = [];
  root.querySelectorAll("h1, h2, h3").forEach((node) => {
    const text = node.textContent?.replace(/\s+/g, " ").trim();
    if (!text) return;
    const style = window.getComputedStyle(node);
    headings.push({
      level: Number(node.tagName[1]),
      text: truncateText(text, 120),
      fontSize: style.fontSize,
      lineHeight: style.lineHeight,
      sectionId,
    });
  });
  return headings;
}

function collectCtas(root: ParentNode, sectionId?: string) {
  const ctas: SectionSnapshot["ctas"] = [];
  const seen = new Set<string>();
  root.querySelectorAll("button, a[href]").forEach((node) => {
    const text = node.textContent?.replace(/\s+/g, " ").trim();
    if (!text || text.length < 2 || text.length > 80) return;
    const key = `${sectionId ?? "global"}:${text}`;
    if (seen.has(key)) return;
    seen.add(key);
    const tag = node.tagName.toLowerCase();
    ctas.push({
      text,
      tag,
      href: tag === "a" ? (node as HTMLAnchorElement).href : undefined,
      variant: inferCtaVariant(node),
      sectionId,
    });
  });
  return ctas.slice(0, 12);
}

function textSampleFromSection(el: Element, hasRichContent: boolean): string {
  const clone = el.cloneNode(true) as HTMLElement;
  clone.querySelectorAll("script, style, noscript").forEach((n) => n.remove());
  return truncateText(clone.textContent ?? "", hasRichContent ? 500 : 200);
}

export function findSectionElements(): Element[] {
  return Array.from(document.querySelectorAll(SECTION_SELECTORS)).filter((el, i, arr) => {
    const rect = el.getBoundingClientRect();
    if (rect.height < 40) return false;
    return !arr.some(
      (other) => other !== el && other.contains(el) && other.tagName === el.tagName,
    );
  });
}

function buildSectionSnapshot(el: Element, index: number, sectionEls: Element[]): SectionSnapshot {
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
}

function logSectionDetails(section: SectionSnapshot, onLog: ScanLogFn) {
  onLog(
    `  ${section.rect.width}×${section.rect.height}px · ${section.headings.length} headings · ${section.ctas.length} CTAs`,
    "detail",
  );

  for (const h of section.headings) {
    onLog(`    H${h.level}: "${h.text}" (${h.fontSize})`, "detail");
  }

  for (const c of section.ctas) {
    onLog(`    CTA [${c.variant}]: "${c.text}"`, "detail");
  }

  if (
    section.contentSummary &&
    section.contentSummary !== "Geen gestructureerde content gedetecteerd"
  ) {
    onLog(`    Inventaris: ${section.contentSummary}`, "success");
  }

  for (const item of section.contentItems.slice(0, 6)) {
    const preview = item.preview ? ` — "${item.preview}"` : "";
    onLog(`    · ${item.type}: ${item.label}${preview}`, "detail");
  }

  if (section.gapToNext != null) {
    onLog(`    Gap naar volgende sectie: ${section.gapToNext}px`, "detail");
  }
}

export async function scanPageWithLog(onLog: ScanLogFn): Promise<PageSnapshot> {
  onLog("DOM scan gestart in browser…", "scan");
  onLog(`URL: ${window.location.href}`);
  onLog(
    `Theme: ${document.documentElement.dataset.theme ?? "unknown"} · viewport: ${window.innerWidth}×${window.innerHeight}`,
  );

  const sectionEls = findSectionElements();
  onLog(`${sectionEls.length} secties gevonden in DOM`, "success");

  const sections: SectionSnapshot[] = [];

  for (let index = 0; index < sectionEls.length; index++) {
    const el = sectionEls[index]!;
    const section = buildSectionSnapshot(el, index, sectionEls);
    sections.push(section);

    onLog(`Scannen: <${section.tag}> #${section.label}`, "scan");
    el.classList.add(HIGHLIGHT_CLASS);
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    await delay(350);

    logSectionDetails(section, onLog);
    el.classList.remove(HIGHLIGHT_CLASS);
    await delay(120);
  }

  const globalHeadings = collectHeadings(document.body);
  const allCtas = collectCtas(document.body);
  const h1Count = document.querySelectorAll("h1").length;
  const primaryCtaCount = allCtas.filter((c) => c.variant === "primary").length;

  onLog(`Globaal: ${h1Count}× H1 · ${primaryCtaCount} primaire CTA's`, "success");
  onLog("DOM snapshot compleet — broncode scan volgt op server…", "success");

  return {
    url: window.location.href,
    pathname: window.location.pathname,
    scannedAt: new Date().toISOString(),
    theme: document.documentElement.dataset.theme ?? "unknown",
    viewport: { width: window.innerWidth, height: window.innerHeight },
    h1Count,
    primaryCtaCount,
    sections,
    globalHeadings: globalHeadings.slice(0, 20),
  };
}
