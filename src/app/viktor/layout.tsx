import type { ReactNode } from "react";
import "./viktor-theme.css";

/** Isolated layout — Viktor preview uses its own token system via .viktor-page */
export default function ViktorLayout({ children }: { children: ReactNode }) {
  return <div data-viktor-preview>{children}</div>;
}
