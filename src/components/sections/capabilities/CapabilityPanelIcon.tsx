import type { CapabilityId } from "@/lib/capabilities-data";

const stroke = { strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function CapabilityPanelIcon({ id }: { id: CapabilityId }) {
  const className = "h-5 w-5";

  switch (id) {
    case "research":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...stroke}>
          <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      );
    case "adCreative":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...stroke}>
          <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case "landingPages":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...stroke}>
          <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case "storeManagement":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...stroke}>
          <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      );
    case "marketing":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...stroke}>
          <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      );
    default:
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...stroke}>
          <path d="M12 6v12m6-6H6" />
        </svg>
      );
  }
}
