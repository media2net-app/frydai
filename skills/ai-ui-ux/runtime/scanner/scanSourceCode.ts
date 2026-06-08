import { existsSync, readFileSync } from "fs";
import path from "path";
import type { ScanLogFn } from "../log/types";
import type { CodeContext, PageSnapshot, SourceFileSnapshot } from "../types";
import {
  COPY_SOURCE_FILE,
  GLOBAL_STYLE_FILES,
  resolveFilesForSection,
} from "./sectionSourceMap";

const MAX_FILE_CHARS = 3500;
const MAX_COMPONENT_FILES = 18;
const MAX_STYLE_FILES = 4;

function readSourceExcerpt(relPath: string): SourceFileSnapshot | null {
  const fullPath = path.join(process.cwd(), relPath);
  if (!existsSync(fullPath)) return null;

  const raw = readFileSync(fullPath, "utf8");
  const lines = raw.split("\n");

  return {
    path: relPath,
    sectionIds: [],
    lineCount: lines.length,
    excerpt:
      raw.length > MAX_FILE_CHARS
        ? `${raw.slice(0, MAX_FILE_CHARS)}\n/* … truncated (${raw.length} chars total) */`
        : raw,
  };
}

function extractRelevantCopy(snapshot: PageSnapshot): string | undefined {
  const fullPath = path.join(process.cwd(), COPY_SOURCE_FILE);
  if (!existsSync(fullPath)) return undefined;

  try {
    const copy = JSON.parse(readFileSync(fullPath, "utf8")) as Record<string, unknown>;
    const keys = new Set<string>(["hero", "nav", "footer", "pricing", "testimonials", "faq"]);
    for (const section of snapshot.sections) {
      keys.add(section.id);
      keys.add(section.label);
    }

    const subset: Record<string, unknown> = {};
    for (const key of keys) {
      if (copy[key]) subset[key] = copy[key];
    }
    return JSON.stringify(subset, null, 2);
  } catch {
    return undefined;
  }
}

export function scanSourceCode(snapshot: PageSnapshot, onLog?: ScanLogFn): CodeContext {
  onLog?.("Broncode scan gestart (server)…", "scan");

  const pathToSections = new Map<string, Set<string>>();

  for (const section of snapshot.sections) {
    const files = resolveFilesForSection(section.id, section.label);
    if (files.length === 0) {
      onLog?.(`  ⚠ geen bronmapping voor #${section.label} (${section.id})`, "detail");
      continue;
    }
    for (const relPath of files) {
      if (!pathToSections.has(relPath)) pathToSections.set(relPath, new Set());
      pathToSections.get(relPath)!.add(section.id);
    }
  }

  const componentFiles: SourceFileSnapshot[] = [];

  for (const [relPath, sectionIds] of pathToSections) {
    if (componentFiles.length >= MAX_COMPONENT_FILES) break;

    const file = readSourceExcerpt(relPath);
    if (!file) {
      onLog?.(`  ⚠ bestand niet gevonden: ${relPath}`, "warn");
      continue;
    }

    file.sectionIds = [...sectionIds];
    componentFiles.push(file);
    onLog?.(
      `  ▸ ${relPath} (${file.lineCount} regels) → #${file.sectionIds.join(", #")}`,
      "detail",
    );
  }

  const styleFiles: SourceFileSnapshot[] = [];
  for (const relPath of GLOBAL_STYLE_FILES) {
    if (styleFiles.length >= MAX_STYLE_FILES) break;
    const file = readSourceExcerpt(relPath);
    if (!file) continue;
    file.sectionIds = ["global"];
    styleFiles.push(file);
    onLog?.(`  ▸ ${relPath} (theme tokens / CSS)`, "detail");
  }

  const copyExcerpt = extractRelevantCopy(snapshot);
  if (copyExcerpt) {
    onLog?.(`  ▸ ${COPY_SOURCE_FILE} (copy strings voor secties)`, "detail");
  }

  onLog?.(
    `Broncode compleet: ${componentFiles.length} components · ${styleFiles.length} styles · copy ${copyExcerpt ? "ja" : "nee"}`,
    "success",
  );

  return {
    componentFiles,
    styleFiles,
    copySource: copyExcerpt
      ? { path: COPY_SOURCE_FILE, excerpt: copyExcerpt }
      : undefined,
    scannedAt: new Date().toISOString(),
  };
}
