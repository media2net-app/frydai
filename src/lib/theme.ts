export const THEME_STORAGE_KEY = "frydai-theme";

export const THEMES = [
  { id: "dark", label: "Donker", hint: "Wit · paars" },
  { id: "light", label: "Licht", hint: "Zwart · paars" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

export const DEFAULT_THEME: ThemeId = "light";

export function isThemeId(value: string): value is ThemeId {
  return THEMES.some((t) => t.id === value);
}
