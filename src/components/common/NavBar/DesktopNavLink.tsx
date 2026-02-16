import { memo } from "react";
import { motion } from "motion/react";

const transition = {
	type: "spring",
	bounce: 0.2,
	duration: 0.6,
} as const;

interface DesktopNavLinkProps {
	href: string;
	label: string;
	showIndicator: boolean;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
}

export const DesktopNavLink = memo(function DesktopNavLink({
	href,
	label,
	showIndicator,
	onMouseEnter,
	onMouseLeave,
}: DesktopNavLinkProps) {
	return (
		<a
			href={href}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
				showIndicator
					? "text-primary-foreground"
					: "text-muted-foreground hover:text-foreground"
			}`}
		>
			{showIndicator && (
				<motion.span
					layoutId="pill-indicator"
					className="absolute inset-0 rounded-full bg-primary"
					transition={transition}
				/>
			)}
			<span className="relative z-10">{label}</span>
		</a>
	);
});
