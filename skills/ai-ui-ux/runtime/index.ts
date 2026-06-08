export type {
  AuditCategory,
  AuditProjectContext,
  AuditReport,
  AuditRequestBody,
  CompetitorRef,
  CursorPrompt,
  CursorPromptPriority,
  DesignGoal,
  OverlayFlags,
  PageSnapshot,
  SectionSnapshot,
} from "./types";

export { auditProjectConfig } from "../project.config";
export {
  designGoalLabel,
  getDefaultAuditContext,
  mergeAuditContext,
  resolveAuditContext,
  readContextOverrides,
  writeContextOverrides,
} from "./context";

export type {
  AuditApiResponse,
  AuditRecordSummary,
  StoredAuditRecord,
} from "./db/types";

export { scanPage } from "./scanner/scanPage";
export { scanPageWithLog } from "./scanner/scanPageWithLog";
export { scanSourceCode } from "./scanner/scanSourceCode";
export { SECTION_SOURCE_MAP, resolveFilesForSection } from "./scanner/sectionSourceMap";
export type { CodeContext, SourceFileSnapshot } from "./types";
export { runAudit } from "./scoring/runAudit";
export type { ScanLogEntry, ScanLogFn, LogLevel } from "./log/types";
export { ScanLogSidebar } from "./panel/ScanLogSidebar";
export { UI_UX_AUDIT_STORAGE_KEY } from "./storage";
export { buildAuditPrompt } from "./scoring/buildPrompt";
export {
  buildCursorPromptsRequest,
  parseCursorPromptsResponse,
} from "./scoring/buildCursorPrompts";
export { buildMasterCursorPrompt } from "./scoring/buildMasterCursorPrompt";
export type { MasterPromptMeta } from "./scoring/buildMasterCursorPrompt";
export { generateCursorPrompts } from "./scoring/generateCursorPrompts";
export type { GenerateLogFn } from "./scoring/generateCursorPrompts";

export { UiUxAuditProvider, useUiUxAudit } from "./panel/UiUxAuditProvider";
export { UiUxAuditSwitcher } from "./panel/UiUxAuditSwitcher";
export { AuditReportPanel } from "./panel/AuditReportPanel";
export { AuditOverlayLayer } from "./overlays/AuditOverlayLayer";
