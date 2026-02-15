import { useEffect, useState } from "react";
import { isDark as checkIsDark, toggleTheme } from "@/lib/theme";
import ThemeIcon from "./ThemeIcon";

export default function ThemeToggle() {
	const [isDark, setIsDark] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setIsDark(checkIsDark());
		setMounted(true);
	}, []);

	function toggle() {
		const next = toggleTheme();
		setIsDark(next === "dark");
	}

	if (!mounted) return null;

	return (
		<button
			onClick={toggle}
			className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border text-foreground transition-colors hover:bg-secondary"
			aria-label="Toggle theme"
		>
			<ThemeIcon icon={isDark ? "moon" : "sun"} />
		</button>
	);
}
