import { cn } from "@/lib/shadcnUtils";
import type { ComponentProps } from "react";

export function QabilahIcon({
	size = 24,
	className,
	...props
}: ComponentProps<"svg"> & { size?: number }) {
	return (
		<svg
			viewBox="0 0 280.83 360.62"
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			className={cn("grayscale", className)}
			{...props}
		>
			<defs>
				<linearGradient
					gradientUnits="userSpaceOnUse"
					gradientTransform="translate(0 362) scale(1 -1)"
					y2="237"
					x2="277.2"
					y1="138.9"
					x1="16.3"
					id="qabilah-gradient"
				>
					<stop stopColor="#ff544f" offset="0" />
					<stop stopColor="#ff594e" offset=".2" />
					<stop stopColor="#ff664a" offset=".4" />
					<stop stopColor="#ff7d44" offset=".6" />
					<stop stopColor="#ff9c3c" offset=".8" />
					<stop stopColor="#ffbf33" offset="1" />
				</linearGradient>
			</defs>
			<path
				d="M153.7,359.2c-19.1,2.1-34.1-4-44.6-11.8-10.4-7.9-15.7-18.9-15.7-33.1s1.1-14.2,3.2-20.9l27.8-105.8c-16.6,17.4-36.3,26.1-59,26.1s-23.1-2.9-33.1-8.6c-10-5.8-17.9-14.3-23.7-25.7-5.8-11.4-8.6-25-8.6-40.8s1.6-25.7,4.8-37.7c5.6-22.2,14.4-40.9,26.3-56,11.9-15.1,25.7-26.4,41.4-33.7C88.1,3.7,104.4,0,121.2,0s29.1,2.3,39.9,6.8c10.8,4.6,20.5,11.5,29.1,20.9l26.8-22.1c1.2-1,2.7-1.5,4.3-1.5h50.6c4.5,0,7.7,4.3,6.5,8.6l-77.4,270.3c-2.1,7.8-3.2,13.1-3.2,16.1s.9,5.9,2.6,7.2c1.7,1.3,4.6,2,8.6,2s3.7-.1,5.8-.4c3.4-.4,6.8-1,10.2-1.9l14.3-3.5c3.1-.8,5.6,2.6,3.9,5.4,0,0-35.9,45.3-89.6,51.4Z"
				fill="url(#qabilah-gradient)"
			/>
		</svg>
	);
}
