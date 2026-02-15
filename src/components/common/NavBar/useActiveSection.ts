import { useState, useEffect } from "react";
import { NAV_LINKS } from "@/constants/nav-links";

export function useActiveSection(defaultSection = "home"): string {
	const [activeSection, setActiveSection] = useState(defaultSection);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id);
					}
				});
			},
			{ rootMargin: "-40% 0px -55% 0px" },
		);

		NAV_LINKS.forEach((link) => {
			const el = document.querySelector(link.href);
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	}, []);

	return activeSection;
}
