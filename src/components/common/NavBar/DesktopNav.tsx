import { useState, useCallback } from "react";
import { NAV_LINKS } from "@/constants/nav-links";
import { useActiveSection } from "./useActiveSection";
import { DesktopNavLink } from "./DesktopNavLink";

export default function DesktopNav() {
	const activeSection = useActiveSection();
	const [hoveredLink, setHoveredLink] = useState<string | null>(null);

	const handleMouseEnter = useCallback((href: string) => {
		setHoveredLink(href);
	}, []);

	const handleMouseLeave = useCallback(() => {
		setHoveredLink(null);
	}, []);

	return (
		<div className="hidden items-center md:flex">
			{NAV_LINKS.map((link) => {
				const isActive = activeSection === link.href.slice(1);
				// Show pill on hovered link if hovering, otherwise on active link
				const showIndicator = hoveredLink
					? hoveredLink === link.href
					: isActive;

				return (
					<DesktopNavLink
						key={link.href}
						href={link.href}
						label={link.label}
						showIndicator={showIndicator}
						onMouseEnter={() => handleMouseEnter(link.href)}
						onMouseLeave={handleMouseLeave}
					/>
				);
			})}
		</div>
	);
}
