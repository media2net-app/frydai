import type { AuditProjectContext, AuditReport, PageSnapshot } from "../types";

export type StoredAuditRecord = {
  id: string;
  createdAt: string;
  pathname: string;
  theme: string;
  viewportWidth: number;
  viewportHeight: number;
  overallScore: number;
  designGoal: string;
  snapshot: PageSnapshot;
  report: AuditReport;
  context: AuditProjectContext;
};

export type AuditRecordSummary = {
  id: string;
  createdAt: string;
  pathname: string;
  theme: string;
  overallScore: number;
  viewportWidth: number;
  viewportHeight: number;
  designGoal: string;
};

export type AuditApiResponse = {
  id: string;
  report: AuditReport;
};
