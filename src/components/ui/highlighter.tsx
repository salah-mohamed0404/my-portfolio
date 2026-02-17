import { useEffect, useRef, useState } from "react";
import type React from "react";
import { useInView } from "motion/react";
import { annotate } from "rough-notation";
import { type RoughAnnotation } from "rough-notation/lib/model";
import { cn } from "@/lib/shadcnUtils";

type AnnotationAction =
	| "highlight"
	| "underline"
	| "box"
	| "circle"
	| "strike-through"
	| "crossed-off"
	| "bracket";

interface HighlighterProps {
	children: React.ReactNode;
	action?: AnnotationAction;
	color?: string;
	strokeWidth?: number;
	animationDuration?: number;
	iterations?: number;
	padding?: number;
	multiline?: boolean;
	isView?: boolean;
	delay?: number; // ms to wait before creating annotation (allows page animations to settle)
	className?: string;
}

export function Highlighter({
	children,
	action = "highlight",
	color = "#ffd1dc",
	strokeWidth = 1.5,
	animationDuration = 600,
	iterations = 2,
	padding = 2,
	multiline = true,
	isView = false,
	delay = 0,
	className = "",
}: HighlighterProps) {
	const elementRef = useRef<HTMLSpanElement>(null);
	const annotationRef = useRef<RoughAnnotation | null>(null);
	const [delayElapsed, setDelayElapsed] = useState(delay === 0);

	const isInView = useInView(elementRef, {
		once: true,
		margin: "-10%",
	});

	useEffect(() => {
		if (delay === 0) return;
		const timer = setTimeout(() => setDelayElapsed(true), delay);
		return () => clearTimeout(timer);
	}, [delay]);

	// If isView is false, always show (once delay elapses). If isView is true, also wait for inView
	const shouldShow = (!isView || isInView) && delayElapsed;

	useEffect(() => {
		if (!shouldShow) return;

		const element = elementRef.current;
		if (!element) return;

		const annotationConfig = {
			type: action,
			color,
			strokeWidth,
			animationDuration,
			iterations,
			padding,
			multiline,
		};

		const annotation = annotate(element, annotationConfig);

		annotationRef.current = annotation;
		annotationRef.current.show();

		const resizeObserver = new ResizeObserver(() => {
			annotation.hide();
			annotation.show();
		});

		resizeObserver.observe(element);
		resizeObserver.observe(document.body);

		return () => {
			if (element) {
				annotate(element, { type: action }).remove();
				resizeObserver.disconnect();
			}
		};
	}, [
		shouldShow,
		action,
		color,
		strokeWidth,
		animationDuration,
		iterations,
		padding,
		multiline,
	]);

	return (
		<span
			ref={elementRef}
			className={cn("relative inline-block bg-transparent", className)}
		>
			{children}
		</span>
	);
}
