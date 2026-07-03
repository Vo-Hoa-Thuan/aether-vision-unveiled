import { useEffect, useState, useCallback } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "aether-theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === "dark" || stored === "light") return stored;
  } catch {}
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "light") {
    root.classList.remove("dark");
    root.classList.add("light");
  } else {
    root.classList.remove("light");
    root.classList.add("dark");
  }
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {}
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  // Apply on mount (SSR-safe)
  useEffect(() => {
    applyTheme(theme);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    applyTheme(next);
  }, []);

  const toggle = useCallback(() => {
    setThemeState((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      applyTheme(next);
      return next;
    });
  }, []);

  return { theme, setTheme, toggle };
}
