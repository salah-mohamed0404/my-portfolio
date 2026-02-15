import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/constants/nav-links";
import { useActiveSection } from "./useActiveSection";

export default function MobileNav() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const activeSection = useActiveSection();

	useEffect(() => {
		if (mobileOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [mobileOpen]);

	return (
		<>
			<button
				onClick={() => setMobileOpen(!mobileOpen)}
				className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground md:hidden"
				aria-label="Toggle menu"
			>
				{mobileOpen ? <X size={18} /> : <Menu size={18} />}
			</button>

			<AnimatePresence>
				{mobileOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3 }}
						className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-background/95 backdrop-blur-xl md:hidden"
					>
						{NAV_LINKS.map((link, i) => {
							const isActive = activeSection === link.href.slice(1);
							return (
								<motion.a
									key={link.href}
									href={link.href}
									onClick={() => setMobileOpen(false)}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: i * 0.05 }}
									className={`rounded-full px-6 py-2 font-heading text-2xl font-semibold transition-colors ${
										isActive
											? "bg-primary text-primary-foreground"
											: "text-foreground hover:text-primary"
									}`}
								>
									{link.label}
								</motion.a>
							);
						})}
						<a
							href="#contact"
							onClick={() => setMobileOpen(false)}
							className="mt-4 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
						>
							{"Let's Talk"}
						</a>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
