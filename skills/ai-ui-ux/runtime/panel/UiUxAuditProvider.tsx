"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { resolveAuditContext } from "../context";
import type { AuditApiResponse } from "../db/types";
import { formatLogLine } from "../log/formatLogLine";
import type { ScanLogEntry, LogLevel } from "../log/types";
import { consumeSseStream } from "./parseSseStream";
import { ScanLogSidebar } from "./ScanLogSidebar";
import { scanPageWithLog } from "../scanner/scanPageWithLog";
import { scanPage } from "../scanner/scanPage";
import {
  readStoredPrefs,
  writeStoredPrefs,
  type StoredUiUxAuditPrefs,
} from "../storage";
import type { AuditReport, OverlayFlags, PageSnapshot } from "../types";

type UiUxAuditContextValue = {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  overlays: OverlayFlags;
  setOverlay: (key: keyof OverlayFlags, value: boolean) => void;
  snapshot: PageSnapshot | null;
  report: AuditReport | null;
  scanning: boolean;
  error: string | null;
  runScan: () => Promise<void>;
  refreshLayoutSnapshot: () => void;
  clearReport: () => void;
};

const UiUxAuditContext = createContext<UiUxAuditContextValue | null>(null);

function persist(prefs: StoredUiUxAuditPrefs) {
  writeStoredPrefs(prefs);
}

export function UiUxAuditProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [enabled, setEnabledState] = useState(() => readStoredPrefs().enabled);
  const [overlays, setOverlays] = useState<OverlayFlags>(() => readStoredPrefs().overlays);
  const [snapshot, setSnapshot] = useState<PageSnapshot | null>(null);
  const [report, setReport] = useState<AuditReport | null>(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scanLogOpen, setScanLogOpen] = useState(false);
  const [scanLogs, setScanLogs] = useState<ScanLogEntry[]>([]);
  const [scanStatus, setScanStatus] = useState<"idle" | "scanning" | "done" | "error">("idle");
  const logIdRef = useRef(0);

  const skipPersistRef = useRef(true);
  useEffect(() => {
    if (skipPersistRef.current) {
      skipPersistRef.current = false;
      return;
    }
    persist({ enabled, overlays });
  }, [enabled, overlays]);

  const showScanLog = scanLogOpen && !pathname.startsWith("/dev/ui-ux");

  const appendLog = useCallback((message: string, level: LogLevel = "info") => {
    const line = formatLogLine(message);
    if (!line) return;
    logIdRef.current += 1;
    setScanLogs((prev) => [
      ...prev,
      { id: logIdRef.current, ts: new Date().toISOString(), message: line, level },
    ]);
  }, []);

  const setEnabled = useCallback((v: boolean) => {
    setEnabledState(v);
    if (!v) setError(null);
  }, []);

  const refreshLayoutSnapshot = useCallback(() => {
    setSnapshot(scanPage());
  }, []);

  const setOverlay = useCallback((key: keyof OverlayFlags, value: boolean) => {
    setOverlays((prev) => ({ ...prev, [key]: value }));
  }, []);

  const runScan = useCallback(async () => {
    setScanning(true);
    setScanLogOpen(true);
    setScanStatus("scanning");
    setScanLogs([]);
    setSnapshot(null);
    setError(null);
    logIdRef.current = 0;

    try {
      const pageSnapshot = await scanPageWithLog(appendLog);
      setSnapshot(pageSnapshot);

      const context = resolveAuditContext();
      appendLog("Snapshot verstuurd naar server voor AI scoring…");

      const res = await fetch("/api/ui-ux/audit?stream=1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ snapshot: pageSnapshot, context }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? `Audit failed (${res.status})`);
      }

      const payload = await consumeSseStream<AuditApiResponse>(res, {
        onLog: appendLog,
      });

      setReport(payload.report);
      setScanStatus("done");

      if (payload.id) {
        await new Promise((r) => setTimeout(r, 800));
        router.push(`/dev/ui-ux?id=${payload.id}`);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Scan mislukt";
      setError(msg);
      setReport(null);
      setScanStatus("error");
      appendLog(`FOUT: ${msg}`, "warn");
    } finally {
      setScanning(false);
    }
  }, [router, appendLog]);

  const clearReport = useCallback(() => {
    setReport(null);
    setError(null);
  }, []);

  const value = useMemo(
    (): UiUxAuditContextValue => ({
      enabled,
      setEnabled,
      overlays,
      setOverlay,
      snapshot,
      report,
      scanning,
      error,
      runScan,
      refreshLayoutSnapshot,
      clearReport,
    }),
    [
      enabled,
      setEnabled,
      overlays,
      setOverlay,
      snapshot,
      report,
      scanning,
      error,
      runScan,
      refreshLayoutSnapshot,
      clearReport,
    ],
  );

  return (
    <UiUxAuditContext.Provider value={value}>
      {children}
      <ScanLogSidebar
        open={showScanLog}
        logs={scanLogs}
        status={scanStatus}
        error={error}
      />
    </UiUxAuditContext.Provider>
  );
}

export function useUiUxAudit() {
  const ctx = useContext(UiUxAuditContext);
  if (!ctx) {
    throw new Error("useUiUxAudit must be used within UiUxAuditProvider");
  }
  return ctx;
}
