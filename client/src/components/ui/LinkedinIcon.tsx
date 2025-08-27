"use client";

import { cn } from "@/lib/utils";
import type { HTMLMotionProps, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

export interface LinkedInIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface LinkedInIconProps extends HTMLMotionProps<"div"> {
	size?: number;
}

const LinkedInIcon = forwardRef<LinkedInIconHandle, LinkedInIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlled = useRef(false);

		useImperativeHandle(ref, () => {
			isControlled.current = true;
			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleEnter = useCallback(() => {
			if (!isControlled.current) controls.start("animate");
		}, [controls]);

		const handleLeave = useCallback(() => {
			if (!isControlled.current) controls.start("normal");
		}, [controls]);

		const iconVariants: Variants = {
			normal: { scale: 1, rotate: 0 },
			animate: {
				scale: [1, 1.08, 0.95, 1],
				rotate: [0, -3, 3, 0],
				transition: { duration: 1.3, ease: "easeInOut", repeat: 0 },
			},
		};

		const drawVariants: Variants = {
			normal: { pathLength: 1, opacity: 1 },
			animate: {
				pathLength: [0, 1],
				opacity: [0.7, 1],
				transition: { duration: 1.5, ease: "easeInOut", repeat: 0 },
			},
		};

		return (
			<motion.div
				className={cn("inline-flex", className)}
				onMouseEnter={handleEnter}
				onMouseLeave={handleLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					animate={controls}
					initial="normal"
					variants={iconVariants}
				>
					<motion.path
						d="M16 8a6 6 0 0 1 6 6v7h-4v-7
              a2 2 0 0 0-2-2 
              2 2 0 0 0-2 2v7h-4v-7
              a6 6 0 0 1 6-6z"
						variants={drawVariants}
					/>
					<motion.rect
						width="4"
						height="12"
						x="2"
						y="9"
						variants={drawVariants}
					/>
					<motion.circle cx="4" cy="4" r="2" variants={drawVariants} />
				</motion.svg>
			</motion.div>
		);
	},
);

LinkedInIcon.displayName = "LinkedInIcon";
export { LinkedInIcon };
