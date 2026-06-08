import type { SectionContentItem } from "../types";
import { truncateText } from "./measure";

function pushUnique(items: SectionContentItem[], item: SectionContentItem) {
  const key = `${item.type}:${item.label}`;
  if (items.some((i) => `${i.type}:${i.label}` === key)) return;
  items.push(item);
}

function collectTestimonials(root: Element, items: SectionContentItem[]) {
  const cards = root.querySelectorAll(
    '[class*="testimonial"], [class*="glass-card"], article, [class*="card"]',
  );

  cards.forEach((card, index) => {
    const paragraphs = Array.from(card.querySelectorAll("p")).map((p) =>
      p.textContent?.trim(),
    );
    const quote = paragraphs.find((t) => t && t.length > 40);
    const author = paragraphs.find(
      (t) => t && t.length < 30 && t !== quote && !t.includes("·") && /^[A-Z]/.test(t),
    );
    const role = paragraphs.find((t) => t && t.includes("·"));

    if (quote && (author || role)) {
      pushUnique(items, {
        type: "testimonial",
        label: author ?? `Testimonial ${index + 1}`,
        preview: truncateText(quote, 100),
        role: role ?? undefined,
      });
    }
  });
}

function collectFaqItems(root: Element, items: SectionContentItem[]) {
  root.querySelectorAll("details").forEach((detail) => {
    const question = detail.querySelector("summary")?.textContent?.trim();
    if (question) {
      pushUnique(items, {
        type: "faq",
        label: truncateText(question, 80),
      });
    }
  });

  root.querySelectorAll('[class*="faq"] h3, [class*="faq"] button').forEach((node) => {
    const text = node.textContent?.trim();
    if (text && text.length > 5) {
      pushUnique(items, { type: "faq", label: truncateText(text, 80) });
    }
  });
}

function collectPricingTiers(root: Element, items: SectionContentItem[]) {
  const id = root.id?.toLowerCase() ?? "";
  if (!id.includes("pricing") && !root.querySelector('[class*="pricing"]')) return;

  root.querySelectorAll('[class*="pricing"] h3, [class*="plan"] h3, h3').forEach((h3) => {
    const label = h3.textContent?.trim();
    if (label && label.length < 60) {
      pushUnique(items, { type: "pricing-tier", label });
    }
  });
}

function collectMetrics(root: Element, items: SectionContentItem[]) {
  root.querySelectorAll(
    '[class*="metric"], [class*="stat"], [class*="rounded-full"][class*="border"]',
  ).forEach((node) => {
    const text = node.textContent?.trim();
    if (text && text.length >= 2 && text.length <= 40) {
      pushUnique(items, { type: "metric", label: text });
    }
  });
}

function collectImages(root: Element, items: SectionContentItem[]) {
  root.querySelectorAll("img[alt]").forEach((img) => {
    const alt = img.getAttribute("alt")?.trim();
    if (alt && alt.length > 1) {
      pushUnique(items, { type: "image", label: truncateText(alt, 60) });
    }
  });
}

export function summarizeContentItems(items: SectionContentItem[]): string {
  if (items.length === 0) return "Geen gestructureerde content gedetecteerd";

  const groups = new Map<string, SectionContentItem[]>();
  for (const item of items) {
    const list = groups.get(item.type) ?? [];
    list.push(item);
    groups.set(item.type, list);
  }

  const parts: string[] = [];
  for (const [type, group] of groups) {
    const labels = group.map((g) => g.label).join(", ");
    parts.push(`${group.length}× ${type}: ${labels}`);
  }
  return parts.join(" · ");
}

export function collectSectionInventory(el: Element, sectionId: string): SectionContentItem[] {
  const items: SectionContentItem[] = [];

  if (sectionId.includes("testimonial") || el.querySelector('[class*="testimonial"]')) {
    collectTestimonials(el, items);
  }

  collectFaqItems(el, items);
  collectPricingTiers(el, items);
  collectMetrics(el, items);
  collectImages(el, items);

  return items.slice(0, 20);
}
