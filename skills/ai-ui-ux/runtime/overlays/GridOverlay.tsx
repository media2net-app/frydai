"use client";

export function GridOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(124, 58, 237, 0.12) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(124, 58, 237, 0.12) 1px, transparent 1px),
          linear-gradient(to right, rgba(124, 58, 237, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(124, 58, 237, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: "8px 8px, 8px 8px, 4px 4px, 4px 4px",
      }}
    />
  );
}
