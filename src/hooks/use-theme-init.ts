import { useEffect, useState } from "react";

export type SiteTheme = "light" | "dark";

const STORAGE_KEY = "site-theme";

export function useThemeInit() {
  const [theme, setThemeState] = useState<SiteTheme>("dark");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as SiteTheme | null;
    const initial = saved === "light" || saved === "dark" ? saved : "dark";

    document.documentElement.dataset.theme = initial;
    setThemeState(initial);
  }, []);

  const setTheme = (next: SiteTheme) => {
    document.documentElement.dataset.theme = next;
    localStorage.setItem(STORAGE_KEY, next);
    setThemeState(next);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return { theme, setTheme, toggleTheme };
}