export function SectionPlaceholder({ minHeight = "40vh" }: { minHeight?: string }) {
  return (
    <div
      aria-hidden
      className="w-full border-t border-border-subtle bg-surface"
      style={{ minHeight }}
    />
  );
}
