import { motion } from "motion/react";

const HeroBackground = () => {
	// Grid alignment
	const animatedBoxes = [
		{ x: 120, y: 80, delay: 0, duration: 4 },
		{ x: 280, y: 200, delay: 1.5, duration: 5 },
		{ x: 440, y: 120, delay: 0.5, duration: 4.5 },
		{ x: 80, y: 320, delay: 2, duration: 5 },
		{ x: 600, y: 240, delay: 1, duration: 6 },
		{ x: 720, y: 80, delay: 3, duration: 4 },
		{ x: 880, y: 280, delay: 0.8, duration: 5.5 },
		{ x: 1040, y: 160, delay: 2.5, duration: 4.5 },
		{ x: 1200, y: 360, delay: 1.2, duration: 6 },
		{ x: 1400, y: 120, delay: 3.5, duration: 5 },
		{ x: 200, y: 440, delay: 0.3, duration: 4.5 },
		{ x: 480, y: 520, delay: 2.8, duration: 5 },
		{ x: 800, y: 480, delay: 1.7, duration: 4 },
		{ x: 1120, y: 560, delay: 0.6, duration: 6 },
		{ x: 1360, y: 400, delay: 2.2, duration: 5 },
	];

	return (
		<>
			{/* Grid bg */}
			<div
				className="absolute inset-0 z-0 opacity-[0.15]"
				style={{
					backgroundImage: `
						repeating-linear-gradient(0deg, transparent, transparent 38px, rgba(255,255,255,0.2) 39px, rgba(255,255,255,0.2) 40px),
						repeating-linear-gradient(90deg, transparent, transparent 38px, rgba(255,255,255,0.2) 39px, rgba(255,255,255,0.2) 40px)
					`,
					maskImage:
						"radial-gradient(circle at 30% 50%, black, transparent 100%)",
					WebkitMaskImage:
						"radial-gradient(circle at 30% 50%, black, transparent 100%)",
				}}
			/>

			{/* Animated boxes */}
			<div
				className="pointer-events-none absolute inset-0 z-0"
				style={{
					maskImage:
						"radial-gradient(circle at 30% 50%, black, transparent 100%)",
					WebkitMaskImage:
						"radial-gradient(circle at 30% 50%, black, transparent 100%)",
				}}
			>
				<svg width="100%" height="100%" className="absolute inset-0">
					{animatedBoxes.map((box, i) => (
						<motion.rect
							key={i}
							x={box.x}
							y={box.y}
							width="40"
							height="40"
							fill="rgba(255,255,255,0.02)"
							stroke="rgba(255,255,255,0.10)"
							strokeWidth="1"
							initial={{
								strokeDasharray: "160",
								strokeDashoffset: "160",
								opacity: 0,
							}}
							animate={{
								strokeDashoffset: [160, 0, -160],
								opacity: [0, 1, 1, 0],
							}}
							transition={{
								duration: box.duration,
								repeat: Infinity,
								ease: "easeInOut",
								delay: box.delay,
								times: [0, 0.4, 0.6, 1],
							}}
						/>
					))}
				</svg>
			</div>

			{/* Scanning Line Animation */}
			<div className="pointer-events-none absolute inset-0 z-0">
				<motion.div
					animate={{ top: ["-10%", "110%"] }}
					transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
					className="absolute left-0 h-px w-full bg-linear-to-r from-transparent via-white/5 to-transparent blur-sm"
				/>
			</div>
		</>
	);
};

export default HeroBackground;
