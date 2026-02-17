import { motion } from "motion/react";
import { cn } from "@/lib/shadcnUtils";
import type { ReactNode } from "react";

type AOSAnimation =
	| "fade"
	| "fade-up"
	| "fade-down"
	| "fade-left"
	| "fade-right"
	| "fade-up-right"
	| "fade-up-left"
	| "fade-down-right"
	| "fade-down-left"
	| "flip-up"
	| "flip-down"
	| "flip-left"
	| "flip-right"
	| "zoom-in"
	| "zoom-in-up"
	| "zoom-in-down"
	| "zoom-in-left"
	| "zoom-in-right"
	| "zoom-out"
	| "zoom-out-up"
	| "zoom-out-down"
	| "zoom-out-left"
	| "zoom-out-right"
	| "slide-up"
	| "slide-down"
	| "slide-left"
	| "slide-right";

interface AnimateOnViewProps {
	children: ReactNode;
	animation?: AOSAnimation;
	delay?: number; // milliseconds (same as data-aos-delay)
	duration?: number; // milliseconds (same as data-aos-duration)
	once?: boolean;
	easing?: string; // AOS easing names (e.g. "ease-out-cubic")
	offset?: number; // px into viewport before triggering
	className?: string;
}

// AOS easing names → Framer Motion easing values
const easingMap: Record<string, string | number[]> = {
	linear: "linear",
	ease: "easeInOut",
	"ease-in": "easeIn",
	"ease-out": "easeOut",
	"ease-in-out": "easeInOut",
	"ease-out-cubic": [0.215, 0.61, 0.355, 1],
	"ease-in-cubic": [0.55, 0.055, 0.675, 0.19],
	"ease-in-out-cubic": [0.645, 0.045, 0.355, 1],
	"ease-out-back": [0.175, 0.885, 0.32, 1.275],
	"ease-out-quart": [0.165, 0.84, 0.44, 1],
};

// AOS animation name → { hidden, show } variants
const animationVariants: Record<AOSAnimation, { hidden: object; show: object }> = {
	// Fade
	fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
	"fade-up": { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } },
	"fade-down": { hidden: { opacity: 0, y: -40 }, show: { opacity: 1, y: 0 } },
	"fade-left": { hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0 } },
	"fade-right": { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0 } },
	"fade-up-right": { hidden: { opacity: 0, y: 40, x: 40 }, show: { opacity: 1, y: 0, x: 0 } },
	"fade-up-left": { hidden: { opacity: 0, y: 40, x: -40 }, show: { opacity: 1, y: 0, x: 0 } },
	"fade-down-right": { hidden: { opacity: 0, y: -40, x: 40 }, show: { opacity: 1, y: 0, x: 0 } },
	"fade-down-left": { hidden: { opacity: 0, y: -40, x: -40 }, show: { opacity: 1, y: 0, x: 0 } },
	// Flip
	"flip-up": { hidden: { opacity: 0, rotateX: 90 }, show: { opacity: 1, rotateX: 0 } },
	"flip-down": { hidden: { opacity: 0, rotateX: -90 }, show: { opacity: 1, rotateX: 0 } },
	"flip-left": { hidden: { opacity: 0, rotateY: 90 }, show: { opacity: 1, rotateY: 0 } },
	"flip-right": { hidden: { opacity: 0, rotateY: -90 }, show: { opacity: 1, rotateY: 0 } },
	// Zoom in
	"zoom-in": { hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1 } },
	"zoom-in-up": { hidden: { opacity: 0, scale: 0.6, y: 40 }, show: { opacity: 1, scale: 1, y: 0 } },
	"zoom-in-down": { hidden: { opacity: 0, scale: 0.6, y: -40 }, show: { opacity: 1, scale: 1, y: 0 } },
	"zoom-in-left": { hidden: { opacity: 0, scale: 0.6, x: 40 }, show: { opacity: 1, scale: 1, x: 0 } },
	"zoom-in-right": { hidden: { opacity: 0, scale: 0.6, x: -40 }, show: { opacity: 1, scale: 1, x: 0 } },
	// Zoom out
	"zoom-out": { hidden: { opacity: 0, scale: 1.2 }, show: { opacity: 1, scale: 1 } },
	"zoom-out-up": { hidden: { opacity: 0, scale: 1.2, y: -40 }, show: { opacity: 1, scale: 1, y: 0 } },
	"zoom-out-down": { hidden: { opacity: 0, scale: 1.2, y: 40 }, show: { opacity: 1, scale: 1, y: 0 } },
	"zoom-out-left": { hidden: { opacity: 0, scale: 1.2, x: -40 }, show: { opacity: 1, scale: 1, x: 0 } },
	"zoom-out-right": { hidden: { opacity: 0, scale: 1.2, x: 40 }, show: { opacity: 1, scale: 1, x: 0 } },
	// Slide (full-element translate, no opacity)
	"slide-up": { hidden: { y: "100%", opacity: 0 }, show: { y: 0, opacity: 1 } },
	"slide-down": { hidden: { y: "-100%", opacity: 0 }, show: { y: 0, opacity: 1 } },
	"slide-left": { hidden: { x: "100%", opacity: 0 }, show: { x: 0, opacity: 1 } },
	"slide-right": { hidden: { x: "-100%", opacity: 0 }, show: { x: 0, opacity: 1 } },
};

// Flip animations need perspective to look 3D
const needsPerspective = new Set<AOSAnimation>(["flip-up", "flip-down", "flip-left", "flip-right"]);

export function AnimateOnView({
	children,
	animation = "fade-up",
	delay = 0,
	duration = 400,
	once = false,
	easing = "ease",
	offset = 0,
	className,
}: AnimateOnViewProps) {
	const { hidden, show } = animationVariants[animation];
	const ease = easingMap[easing] ?? "easeOut";

	return (
		<motion.div
			initial="hidden"
			whileInView="show"
			viewport={{
				once,
				margin: offset > 0 ? `0px 0px -${offset}px 0px` : "0px",
			}}
			variants={{
				hidden,
				show: {
					...show,
					transition: {
						duration: duration / 1000,
						delay: delay / 1000,
						ease,
					},
				},
			}}
			style={needsPerspective.has(animation) ? { perspective: 1200 } : undefined}
			className={cn(className)}
		>
			{children}
		</motion.div>
	);
}
