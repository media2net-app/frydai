import Database from "better-sqlite3";
import { mkdirSync } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import type { AuditProjectContext, AuditReport, PageSnapshot } from "../types";
import type { AuditRecordSummary, StoredAuditRecord } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "ui-ux-audits.db");

let db: Database.Database | null = null;

function getDb(): Database.Database {
  if (db) return db;
  mkdirSync(DATA_DIR, { recursive: true });
  db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS audits (
      id TEXT PRIMARY KEY,
      created_at TEXT NOT NULL,
      pathname TEXT NOT NULL,
      theme TEXT NOT NULL,
      viewport_width INTEGER NOT NULL,
      viewport_height INTEGER NOT NULL,
      overall_score INTEGER NOT NULL,
      design_goal TEXT NOT NULL DEFAULT 'new',
      snapshot_json TEXT NOT NULL,
      report_json TEXT NOT NULL,
      context_json TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_audits_created_at ON audits(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_audits_pathname ON audits(pathname);
  `);
  migrateDb(db);
  return db;
}

function migrateDb(database: Database.Database) {
  const columns = database.prepare("PRAGMA table_info(audits)").all() as { name: string }[];
  const names = new Set(columns.map((c) => c.name));
  if (!names.has("design_goal")) {
    database.exec("ALTER TABLE audits ADD COLUMN design_goal TEXT NOT NULL DEFAULT 'new'");
  }
  if (!names.has("context_json")) {
    database.exec("ALTER TABLE audits ADD COLUMN context_json TEXT");
  }
}

function rowToSummary(row: {
  id: string;
  created_at: string;
  pathname: string;
  theme: string;
  overall_score: number;
  viewport_width: number;
  viewport_height: number;
  design_goal: string;
}): AuditRecordSummary {
  return {
    id: row.id,
    createdAt: row.created_at,
    pathname: row.pathname,
    theme: row.theme,
    overallScore: row.overall_score,
    viewportWidth: row.viewport_width,
    viewportHeight: row.viewport_height,
    designGoal: row.design_goal,
  };
}

export function saveAuditRecord(
  snapshot: PageSnapshot,
  report: AuditReport,
  context: AuditProjectContext,
): StoredAuditRecord {
  const id = randomUUID();
  const createdAt = report.scannedAt || new Date().toISOString();
  const record: StoredAuditRecord = {
    id,
    createdAt,
    pathname: snapshot.pathname,
    theme: snapshot.theme,
    viewportWidth: snapshot.viewport.width,
    viewportHeight: snapshot.viewport.height,
    overallScore: report.overallScore,
    designGoal: context.designGoal,
    snapshot,
    report,
    context,
  };

  getDb()
    .prepare(
      `INSERT INTO audits (
        id, created_at, pathname, theme,
        viewport_width, viewport_height, overall_score,
        design_goal, snapshot_json, report_json, context_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      id,
      createdAt,
      snapshot.pathname,
      snapshot.theme,
      snapshot.viewport.width,
      snapshot.viewport.height,
      report.overallScore,
      context.designGoal,
      JSON.stringify(snapshot),
      JSON.stringify(report),
      JSON.stringify(context),
    );

  return record;
}

export function listAuditRecords(limit = 50): AuditRecordSummary[] {
  const rows = getDb()
    .prepare(
      `SELECT id, created_at, pathname, theme, overall_score, viewport_width, viewport_height, design_goal
       FROM audits ORDER BY created_at DESC LIMIT ?`,
    )
    .all(limit) as {
    id: string;
    created_at: string;
    pathname: string;
    theme: string;
    overall_score: number;
    viewport_width: number;
    viewport_height: number;
    design_goal: string;
  }[];

  return rows.map(rowToSummary);
}

export function getAuditRecord(id: string): StoredAuditRecord | null {
  const row = getDb()
    .prepare(`SELECT * FROM audits WHERE id = ?`)
    .get(id) as
    | {
        id: string;
        created_at: string;
        pathname: string;
        theme: string;
        viewport_width: number;
        viewport_height: number;
        overall_score: number;
        design_goal: string;
        snapshot_json: string;
        report_json: string;
        context_json: string | null;
      }
    | undefined;

  if (!row) return null;

  const context = row.context_json
    ? (JSON.parse(row.context_json) as AuditProjectContext)
    : {
        productName: "Unknown",
        productDescription: "",
        designGoal: (row.design_goal as AuditProjectContext["designGoal"]) || "new",
        competitors: [],
      };

  return {
    id: row.id,
    createdAt: row.created_at,
    pathname: row.pathname,
    theme: row.theme,
    viewportWidth: row.viewport_width,
    viewportHeight: row.viewport_height,
    overallScore: row.overall_score,
    designGoal: row.design_goal,
    snapshot: JSON.parse(row.snapshot_json) as PageSnapshot,
    report: JSON.parse(row.report_json) as AuditReport,
    context,
  };
}

export function updateAuditCursorPrompts(
  id: string,
  cursorPrompts: NonNullable<AuditReport["cursorPrompts"]>,
): StoredAuditRecord | null {
  const existing = getAuditRecord(id);
  if (!existing) return null;

  const report: AuditReport = {
    ...existing.report,
    cursorPrompts,
    cursorPromptsGeneratedAt: new Date().toISOString(),
  };

  getDb()
    .prepare(`UPDATE audits SET report_json = ? WHERE id = ?`)
    .run(JSON.stringify(report), id);

  return { ...existing, report };
}

export function getScoreTrend(pathname = "/", limit = 20): AuditRecordSummary[] {
  const rows = getDb()
    .prepare(
      `SELECT id, created_at, pathname, theme, overall_score, viewport_width, viewport_height, design_goal
       FROM audits WHERE pathname = ? ORDER BY created_at ASC LIMIT ?`,
    )
    .all(pathname, limit) as Parameters<typeof rowToSummary>[0][];

  return rows.map(rowToSummary);
}
