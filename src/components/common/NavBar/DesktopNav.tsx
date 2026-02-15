import { motion } from "motion/react";
import { NAV_LINKS } from "@/constants/nav-links";
import { useActiveSection } from "./useActiveSection";

export default function DesktopNav() {
	const activeSection = useActiveSection();

	return (
		<div className="hidden items-center gap-1 md:flex">
			{NAV_LINKS.map((link) => {
				const isActive = activeSection === link.href.slice(1);
				return (
					<a
						key={link.href}
						href={link.href}
						className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
							isActive
								? "text-primary-foreground"
								: "text-muted-foreground hover:text-foreground"
						}`}
					>
						{isActive && (
							<motion.span
								layoutId="pill-indicator"
								className="absolute inset-0 rounded-full bg-primary"
								transition={{
									type: "spring",
									bounce: 0.2,
									duration: 0.6,
								}}
							/>
						)}
						<span className="relative z-10">{link.label}</span>
					</a>
				);
			})}
		</div>
	);
}
