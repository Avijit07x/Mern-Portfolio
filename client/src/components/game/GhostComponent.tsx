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

const DeathParticles = ({ isLunging }: { isLunging: boolean }) => {
	const particleCount = 28;
	const particles = Array.from({ length: particleCount });

	return (
		<div className="absolute inset-0 flex items-center justify-center">
			<motion.div
				initial={{ scale: 0, opacity: 1 }}
				animate={{ scale: 4, opacity: 0 }}
				transition={{ duration: 0.3, ease: "easeOut" }}
				className={`absolute h-4 w-4 rounded-full blur-xl ${isLunging ? "bg-red-500" : "bg-cyan-400"}`}
			/>

			{particles.map((_, i) => {
				const angle =
					(i / particleCount) * Math.PI * 2 + (Math.random() - 0.5) * 1.5;
				const velocity = 50 + Math.random() * 90;
				const tx = Math.cos(angle) * velocity;
				const ty = Math.sin(angle) * velocity;
				const isBar = Math.random() > 0.6;
				const size = Math.random() * 3 + 1;
				const delay = Math.random() * 0.1;

				return (
					<motion.div
						key={i}
						initial={{ x: 0, y: 0, opacity: 1, scale: 2 }}
						animate={{
							x: [0, tx * 0.2, tx],
							y: [0, ty * 0.2, ty],
							opacity: [1, 1, 0],
							scale: [2, 1.5, 0],
							rotate: Math.random() * 720,
						}}
						transition={{
							duration: 0.6 + Math.random() * 0.3,
							ease: [0.16, 1, 0.3, 1],
							delay: delay,
						}}
						style={{
							width: isBar ? size * 4 : size,
							height: isBar ? size / 2 : size,
							left: "50%",
							top: "50%",
						}}
						className={`absolute -translate-x-1/2 -translate-y-1/2 transform ${
							isLunging
								? i % 3 === 0
									? "bg-white shadow-[0_0_10px_white]"
									: "bg-red-500 shadow-[0_0_15px_red]"
								: i % 4 === 0
									? "bg-cyan-300 shadow-[0_0_10px_cyan]"
									: "bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
						}`}
					/>
				);
			})}
		</div>
	);
};

const GhostComponent = ({
	ghost,
	mouseX,
	mouseY,
	isCombat,
	onKill,
}: GhostComponentProps) => {
	const isDying = ghost.state === "DYING";

	return (
		<motion.div
			key={ghost.id}
			initial={{ opacity: 0, scale: 0 }}
			animate={
				isDying
					? {
							x: ghost.state === "LUNGING" ? ghost.targetX : ghost.x,
							y:
								(ghost.state === "LUNGING" ? (ghost.targetY ?? 0) : ghost.y) -
								50,
							opacity: [1, 0],
							scale: [1, 1.2],
						}
					: ghost.state === "LUNGING"
						? { x: ghost.targetX, y: ghost.targetY, scale: 2.2, opacity: 1 }
						: {
								x: ghost.x,
								y: ghost.y,
								scale: 1,
								opacity: ghost.revealed ? 0.9 : 0.2,
							}
			}
			exit={{ opacity: 0, scale: 0 }}
			transition={{
				type: ghost.state === "LUNGING" ? "spring" : "tween",
				duration: isDying ? 0.8 : ghost.state === "LUNGING" ? 0.25 : 0.4,
				damping: 15,
				stiffness: 100,
			}}
			className={`group pointer-events-auto absolute ${isCombat ? "cursor-none" : "cursor-crosshair"}`}
			onClick={(e) => {
				e.stopPropagation();
				if (isDying) return;
				gameAudio.playKill();
				onKill(ghost.id);
			}}
		>
			<div className="absolute inset-x-[-15px] inset-y-[-15px] z-10" />

			<div className="relative">
				{!isDying ? (
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
				) : (
					<DeathParticles isLunging={ghost.state === "LUNGING"} />
				)}

				<AnimatePresence mode="wait">
					{ghost.dialogue && !isDying && (
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
