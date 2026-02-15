import { motion } from "motion/react";

const RAYS = [0, 45, 90, 135, 180, 225, 270, 315];
const CENTER = 12;
const RAY_START = 7;
const RAY_END = 10;

const spring = { type: "spring", stiffness: 200, damping: 20 } as const;

interface ThemeIconProps {
	icon: "sun" | "moon";
}

export default function ThemeIcon({ icon }: ThemeIconProps) {
	return (
		<motion.svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width={16}
			height={16}
			fill="none"
			strokeWidth={2}
			strokeLinecap="round"
			stroke="currentColor"
		>
			<defs>
				<mask id="theme-toggle-mask">
					<rect x="0" y="0" width="24" height="24" fill="white" />
					<motion.circle
						r="7"
						fill="black"
						animate={icon === "moon" ? { cx: 18, cy: 6 } : { cx: 30, cy: 0 }}
						transition={spring}
					/>
				</mask>
			</defs>

			{/* Body — filled circle, masked into a crescent in moon mode */}
			<motion.circle
				cx={CENTER}
				cy={CENTER}
				fill="currentColor"
				stroke="none"
				mask="url(#theme-toggle-mask)"
				animate={{ r: icon === "moon" ? 8 : 5 }}
				transition={spring}
			/>

			{/* Rays — lines that scale/rotate out in moon mode */}
			<motion.g
				stroke="currentColor"
				animate={
					icon === "moon"
						? { scale: 0, rotate: 45, opacity: 0 }
						: { scale: 1, rotate: 0, opacity: 1 }
				}
				transition={spring}
				style={{ transformOrigin: "12px 12px" }}
			>
				{RAYS.map((angle) => {
					const rad = (angle * Math.PI) / 180;
					return (
						<line
							key={angle}
							x1={CENTER + RAY_START * Math.cos(rad)}
							y1={CENTER + RAY_START * Math.sin(rad)}
							x2={CENTER + RAY_END * Math.cos(rad)}
							y2={CENTER + RAY_END * Math.sin(rad)}
						/>
					);
				})}
			</motion.g>
		</motion.svg>
	);
}
