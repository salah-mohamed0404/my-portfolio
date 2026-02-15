const STORAGE_KEY = "theme";

export type Theme = "light" | "dark";

export function getSavedTheme(): Theme | null {
	const saved = localStorage.getItem(STORAGE_KEY);
	if (saved === "dark" || saved === "light") return saved;
	return null;
}

export function getSystemTheme(): Theme {
	return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function getTheme(): Theme {
	return getSavedTheme() ?? getSystemTheme();
}

export function isDark(): boolean {
	return document.documentElement.classList.contains("dark");
}

export function applyTheme(theme: Theme) {
	document.documentElement.classList.toggle("dark", theme === "dark");
}

export function saveTheme(theme: Theme) {
	localStorage.setItem(STORAGE_KEY, theme);
}

export function toggleTheme(): Theme {
	const next: Theme = isDark() ? "light" : "dark";
	applyTheme(next);
	saveTheme(next);
	return next;
}
