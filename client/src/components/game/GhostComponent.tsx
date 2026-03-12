import { AnimatePresence, motion, MotionValue } from "motion/react";
import { gameAudio } from "./audio";
import GhostEye from "./GhostEye";
import { Ghost } from "./types";

interface GhostComponentProps {
	ghost: Ghost;
	mouseX: MotionValue<number>;
	mouseY: MotionValue<number>;
	isCombat: boolean;
	onKill: (id: number) => void;
}

const GhostComponent = ({
	ghost,
	mouseX,
	mouseY,
	isCombat,
	onKill,
}: GhostComponentProps) => {
	return (
		<motion.div
			key={ghost.id}
			initial={{ opacity: 0, scale: 0 }}
			animate={
				ghost.state === "LUNGING"
					? { x: ghost.targetX, y: ghost.targetY, scale: 2.2, opacity: 1 }
					: {
							x: ghost.x,
							y: ghost.y,
							scale: 1,
							opacity: ghost.revealed ? 0.9 : 0.2,
						}
			}
			exit={{ opacity: 0, scale: 0, rotate: 180 }}
			transition={{
				type: ghost.state === "LUNGING" ? "spring" : "tween",
				duration: ghost.state === "LUNGING" ? 0.25 : 0.5,
				damping: 10,
				stiffness: 100,
			}}
			className={`group pointer-events-auto absolute ${isCombat ? "cursor-none" : "cursor-auto"}`}
			onClick={(e) => {
				e.stopPropagation();
				if (ghost.state === "DYING") return;
				gameAudio.playKill();
				onKill(ghost.id);
			}}
		>
			<div className="absolute inset-x-[-15px] inset-y-[-15px] z-10" />

			<div className="relative">
				<svg
					width="40"
					height="40"
					viewBox="0 0 40 40"
					className={`transition-all duration-300 ${ghost.state === "LUNGING" ? "fill-red-400 drop-shadow-[0_0_25px_red]" : "fill-white/80 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"}`}
				>
					<motion.path
						d="M10 20 Q10 5 20 5 Q30 5 30 20 L30 35 L26 31 L22 35 L18 31 L14 35 L10 31 Z"
						animate={ghost.state === "PROWLING" ? { y: [0, -3, 0] } : {}}
						transition={{
							repeat: Infinity,
							duration: 1.5 + Math.random(),
						}}
					/>
					<GhostEye
						mouseX={mouseX}
						mouseY={mouseY}
						ghostX={ghost.x}
						ghostY={ghost.y}
						eyeOffsetX={16}
						eyeOffsetY={18}
					/>
					<GhostEye
						mouseX={mouseX}
						mouseY={mouseY}
						ghostX={ghost.x}
						ghostY={ghost.y}
						eyeOffsetX={24}
						eyeOffsetY={18}
					/>
				</svg>

				<AnimatePresence mode="wait">
					{ghost.dialogue && (
						<motion.div
							initial={{ opacity: 0, y: 10, scale: 0.5 }}
							animate={{
								opacity: 1,
								y: -85,
								scale: 0.7,
								transition: {
									type: "spring",
									stiffness: 300,
									damping: 20,
								},
							}}
							exit={{ opacity: 0, scale: 0.5 }}
							className="absolute left-1/2 -translate-x-1/2 rounded-full border border-white/30 bg-black/60 px-3 py-1 whitespace-nowrap backdrop-blur-sm"
						>
							<span className="text-[12px] font-medium tracking-tight text-white/95">
								{ghost.dialogue}
							</span>

							<div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-r border-b border-white/30 bg-black/60" />
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.div>
	);
};

export default GhostComponent;
