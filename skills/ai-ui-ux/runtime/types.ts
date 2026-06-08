export type OverlayFlags = {
  grid: boolean;
  rulers: boolean;
  sections: boolean;
  measure: boolean;
};

export type RectSnapshot = {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  left: number;
};

export type HeadingSnapshot = {
  level: number;
  text: string;
  fontSize: string;
  lineHeight: string;
  sectionId?: string;
};

export type CtaSnapshot = {
  text: string;
  tag: string;
  href?: string;
  variant: "primary" | "secondary" | "unknown";
  sectionId?: string;
};

export type SectionContentType =
  | "testimonial"
  | "faq"
  | "pricing-tier"
  | "card"
  | "metric"
  | "image"
  | "list-item";

export type SectionContentItem = {
  type: SectionContentType;
  label: string;
  preview?: string;
  role?: string;
};

export type SectionSnapshot = {
  id: string;
  label: string;
  tag: string;
  rect: RectSnapshot;
  textSample: string;
  contentItems: SectionContentItem[];
  contentSummary: string;
  headings: HeadingSnapshot[];
  ctas: CtaSnapshot[];
  gapToNext?: number;
};

export type DesignGoal = "new" | "redesign" | "rebrand";

export type CompetitorRef = {
  name: string;
  url: string;
  notes?: string;
};

export type AuditProjectContext = {
  productName: string;
  productDescription: string;
  designGoal: DesignGoal;
  previousSiteUrl?: string;
  designNotes?: string;
  competitors: CompetitorRef[];
};

export type SourceFileSnapshot = {
  path: string;
  sectionIds: string[];
  lineCount: number;
  excerpt: string;
};

export type CodeContext = {
  componentFiles: SourceFileSnapshot[];
  styleFiles: SourceFileSnapshot[];
  copySource?: { path: string; excerpt: string };
  scannedAt: string;
};

export type PageSnapshot = {
  url: string;
  pathname: string;
  scannedAt: string;
  theme: string;
  viewport: { width: number; height: number };
  h1Count: number;
  primaryCtaCount: number;
  sections: SectionSnapshot[];
  globalHeadings: HeadingSnapshot[];
  codeContext?: CodeContext;
};

export type AuditRequestBody = {
  snapshot: PageSnapshot;
  context?: AuditProjectContext;
};

export type AuditCategory = {
  id: "clarity" | "hierarchy" | "visuals" | "cta" | "positioning";
  label: string;
  score: number;
  summary: string;
  findings: string[];
};

export type CursorPromptPriority = "critical" | "high" | "medium";

export type CursorPrompt = {
  id: string;
  title: string;
  sectionId?: string;
  elements: string[];
  priority: CursorPromptPriority;
  category: AuditCategory["id"];
  estimatedImpact: string;
  prompt: string;
};

export type AuditReport = {
  overallScore: number;
  categories: AuditCategory[];
  quickWins: string[];
  cursorPrompts?: CursorPrompt[];
  cursorPromptsGeneratedAt?: string;
  scannedAt: string;
};

export type UiUxAuditState = {
  enabled: boolean;
  overlays: OverlayFlags;
  snapshot: PageSnapshot | null;
  report: AuditReport | null;
  scanning: boolean;
  error: string | null;
};
