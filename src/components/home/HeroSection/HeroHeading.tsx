import { motion } from "motion/react";
import { Highlighter } from "@/components/ui/highlighter";

const BLUR_IN_UP = (delay: number) => ({
	hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
	show: {
		opacity: 1,
		filter: "blur(0px)",
		y: 0,
		transition: { duration: 0.4, delay, ease: [0.215, 0.61, 0.355, 1] },
	},
});

type Char = {
	char: string;
	key: string;
	variants: ReturnType<typeof BLUR_IN_UP>;
};

function toChars(text: string, prefix: string, startDelay: number): Char[] {
	return text.split("").map((char, i) => ({
		char,
		key: `${prefix}-${i}`,
		variants: BLUR_IN_UP(startDelay + i * 0.03),
	}));
}

const BUILDING_DIGITAL = toChars("Building Digital", "bd", 0.15);
const THAT_MATTER = toChars("that Matter", "tm", 0.85);

export function HeroHeading() {
	return (
		<motion.h1
			className="font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
			initial="hidden"
			whileInView="show"
			viewport={{ once: true }}
		>
			{/* "Building Digital" — char-by-char blurInUp */}
			<span aria-hidden>
				{BUILDING_DIGITAL.map(({ char, key, variants }) => (
					<motion.span
						key={key}
						variants={variants}
						className="inline-block whitespace-pre"
					>
						{char}
					</motion.span>
				))}
			</span>{" "}
			{/* "Experiences" — blurInUp, then rough-notation underline draws */}
			<motion.span variants={BLUR_IN_UP(0.55)} className="inline-block">
				<Highlighter
					action="underline"
					color="var(--primary-500)"
					className="text-gradient glow-text"
					delay={1500}
				>
					Experiences
				</Highlighter>
			</motion.span>{" "}
			{/* "that Matter" — char-by-char blurInUp */}
			<span aria-hidden>
				{THAT_MATTER.map(({ char, key, variants }) => (
					<motion.span
						key={key}
						variants={variants}
						className="inline-block whitespace-pre"
					>
						{char}
					</motion.span>
				))}
			</span>
			{/* Screen reader text */}
			<span className="sr-only">Building Digital Experiences that Matter</span>
		</motion.h1>
	);
}
