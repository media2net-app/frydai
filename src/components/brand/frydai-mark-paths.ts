/**
 * Frydai beeldmerk — smooth Bézier paths (viewBox 0 0 226 226).
 * Keep in sync with public/frydai-mark-white.svg
 */
export const FRYDAI_MARK_VIEWBOX = "0 0 226 226";

/**
 * Two shapes: top bar + lower swoosh.
 * Curves use cubic Bézier (C/S) — no polygonal line chains.
 */
export const FRYDAI_MARK_PATHS =
  [
    /* Top bar */
    "M48 54H181",
    "C181 55 181 68 176 80",
    "C152 93 102 94 48 79",
    "V54H48Z",
    /* Lower swoosh */
    "M145 110",
    "C118 104 90 108 74 120",
    "C52 138 46 160 48 180",
    "C74 166 112 130 138 115",
    "C145 110 145 110 145 110Z",
  ].join(" ");
