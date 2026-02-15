import { FiArrowUp } from "react-icons/fi";

export default function ScrollToTop() {
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<button
			onClick={scrollToTop}
			aria-label="Scroll to top"
			className="ml-2 flex h-9 w-9 items-center justify-center rounded-lg border border-primary bg-primary/10 text-primary transition-all hover:bg-primary hover:text-primary-foreground"
		>
			<FiArrowUp className="size-4" />
		</button>
	);
}
