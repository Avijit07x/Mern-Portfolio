"use client";

import { cn } from "@/lib/utils";
import type { HTMLMotionProps } from "motion/react";
import { motion, useAnimation } from "motion/react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

export interface GithubIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface GithubIconProps extends HTMLMotionProps<"div"> {
	size?: number;
}

const GithubIcon = forwardRef<GithubIconHandle, GithubIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter],
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave],
		);

		const bodyVariants = {
			normal: {
				pathLength: 1,
				pathOffset: 0,
				opacity: 1,
				transition: { duration: 0.3 },
			},
			animate: {
				pathLength: [1, 0.6, 1],
				pathOffset: [0, 0.4, 0],
				opacity: [1, 0.7, 1],
				transition: { duration: 1 },
			},
		};

		const handWave = {
			initial: { rotate: 0, originX: 0.9, originY: 0.5 },
			animate: {
				rotate: [0, 20, -15, 0],
				originX: 0.9,
				originY: 0.5,
				transition: { duration: 1, repeat: Infinity },
			},
		};

		return (
			<motion.div
				className={cn("inline-flex items-center justify-center", className)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
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
					variants={{
						normal: { scale: 1, transition: { duration: 0.3 } },
						animate: { scale: [1, 1.05, 1], transition: { duration: 1 } },
					}}
					animate={controls}
					initial="normal"
				>
					<motion.path
						d="M15 22v-4a4.8 4.8 0 0 0-1-3.5
               c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5
               .28-1.15.28-2.35 0-3.5
               0 0-1 0-3 1.5
               -2.64-.5-5.36-.5-8 0
               C6 2 5 2 5 2
               c-.3 1.15-.3 2.35 0 3.5
               A5.403 5.403 0 0 0 4 9
               c0 3.5 3 5.5 6 5.5
               -.39.49-.68 1.05-.85 1.65
               -.17.6-.22 1.23-.15 1.85v4"
						variants={bodyVariants}
					/>

					<motion.path
						d="M9 18c-4.51 2-5-2-7-2"
						variants={handWave}
						initial="initial"
						animate="animate"
					/>
				</motion.svg>
			</motion.div>
		);
	},
);

GithubIcon.displayName = "GithubIcon";
export { GithubIcon };
