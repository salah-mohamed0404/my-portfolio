import { useEffect, useState } from "react";
import { isDark as checkIsDark, toggleTheme } from "@/lib/theme";
import ThemeIcon from "./ThemeIcon";
import { Button } from "@/components/ui/button";

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
		<Button
			onClick={toggle}
			variant="outline"
			size="icon"
			aria-label="Toggle theme"
			title="Toggle theme"
		>
			<ThemeIcon icon={isDark ? "sun" : "moon"} />
		</Button>
	);
}
