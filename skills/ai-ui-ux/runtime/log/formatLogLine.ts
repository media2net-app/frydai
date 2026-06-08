/** Collapse whitespace/newlines so each log entry renders as a single clean line. */
export function formatLogLine(message: string): string {
  return message.replace(/\s+/g, " ").trim();
}
