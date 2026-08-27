export const THEME_COLORS = {
  dark: "#0c0c0e",
  light: "#ffffff",
} as const;

export function applyThemeColor(theme: "light" | "dark") {
  const color = theme === "dark" ? THEME_COLORS.dark : THEME_COLORS.light;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", color);
}
