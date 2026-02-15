import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
	const theme = "dark";

	return (
		<button
			className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary"
			aria-label="Toggle theme"
		>
			{theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
		</button>
	);
}
