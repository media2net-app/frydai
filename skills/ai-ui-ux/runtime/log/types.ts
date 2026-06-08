export type LogLevel = "info" | "detail" | "success" | "warn" | "stream" | "scan";

export type ScanLogEntry = {
  id: number;
  ts: string;
  message: string;
  level: LogLevel;
};

export type ScanLogFn = (message: string, level?: LogLevel) => void;
