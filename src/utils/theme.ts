export type ThemePref = "light" | "dark" | "auto";
export type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "theme";

export function resolveTheme(pref: ThemePref): ResolvedTheme {
  if (pref === "auto") {
    if (typeof window === "undefined" || !window.matchMedia) return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return pref;
}

export function applyTheme(pref: ThemePref): void {
  if (typeof document === "undefined") return;
  const resolved = resolveTheme(pref);
  document.documentElement.setAttribute("data-bs-theme", resolved);
  document.documentElement.setAttribute("data-theme-pref", pref);
}

export function readThemePref(): ThemePref {
  if (typeof window === "undefined") return "auto";
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === "light" || raw === "dark" || raw === "auto") return raw;
  return "auto";
}

export function writeThemePref(pref: ThemePref): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, pref);
}

export function cycleThemePref(current: ThemePref): ThemePref {
  if (current === "light") return "dark";
  if (current === "dark") return "auto";
  return "light";
}
