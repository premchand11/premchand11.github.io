"use client";

import { useEffect, useState } from "react";
import { applyThemeColor } from "@/lib/theme";

const STORAGE_KEY = "premchand.theme";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute(
    "data-theme",
    theme === "dark" ? "dark" : "default",
  );
  applyThemeColor(theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const next: Theme = stored === "light" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="text-sm text-[color:var(--ink-soft)] hover:text-[color:var(--accent)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 rounded-sm"
    >
      {theme === "light" ? "dark" : "light"}
    </button>
  );
}
