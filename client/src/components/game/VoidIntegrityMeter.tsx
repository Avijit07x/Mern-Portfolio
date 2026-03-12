import { AnimatePresence, motion, MotionValue } from "motion/react";
import { useEffect, useState } from "react";
import GhostEye from "./GhostEye";
import { gameAudio } from "./audio";

interface VoidIntegrityMeterProps {
	isGameActive: boolean;
	isCombat: boolean;
	onTrigger: () => void;
	mouseX: MotionValue<number>;
	mouseY: MotionValue<number>;
}

const MESSAGES = [
	"DARE_TO_CLICK?_",
	"TAP_TO_START_HUNT_",
	"ARE_YOU_AFRAID?_",
	"CHALLENGE_THE_VOID_",
	"CLICK_TO_DIE?_",
];

const VoidIntegrityMeter = ({
	isGameActive,
	isCombat,
	onTrigger,
	mouseX,
	mouseY,
}: VoidIntegrityMeterProps) => {
	const [msgIndex, setMsgIndex] = useState(0);

	useEffect(() => {
		if (isGameActive || isCombat) return;
		const interval = setInterval(() => {
			setMsgIndex((prev) => (prev + 1) % MESSAGES.length);
		}, 3000);
		return () => clearInterval(interval);
	}, [isGameActive, isCombat]);

	const ghostX = window.innerWidth - 60;
	const ghostY = window.innerHeight;

	return (
		<AnimatePresence>
			{!isGameActive && !isCombat && (
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 50 }}
					className="pointer-events-auto fixed right-10 bottom-0 z-210"
				>
					<motion.button
						whileHover={{ y: -8 }}
						whileTap={{ scale: 0.98 }}
						onClick={() => {
							gameAudio.playTrigger();
							onTrigger();
						}}
						className="group relative flex translate-y-10 flex-col items-center transition-transform duration-700 ease-out hover:translate-y-5"
					>
						<div className="absolute -top-12 flex flex-col items-center transition-all duration-300 group-hover:-top-14">
							<div className="rounded-lg border border-white/5 bg-zinc-900/40 px-3 py-1.5 whitespace-nowrap shadow-2xl backdrop-blur-xl">
								<div className="flex items-center gap-2">
									<div className="h-1 w-1 animate-pulse bg-white/40" />
									<AnimatePresence mode="wait">
										<motion.span
											key={msgIndex}
											initial={{ opacity: 0, x: 5 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: -5 }}
											transition={{ duration: 0.4, ease: "circOut" }}
											className="block text-[8.5px] font-bold tracking-[0.2em] text-white/50 uppercase"
										>
											{MESSAGES[msgIndex]}
										</motion.span>
									</AnimatePresence>
								</div>
								<div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-r border-b border-white/5 bg-zinc-900/40" />
							</div>
						</div>

						<svg
							width="85"
							height="85"
							viewBox="0 0 40 40"
							className="fill-white/60 transition-all duration-300 group-hover:fill-white/70"
						>
							<path d="M10 20 Q10 5 20 5 Q30 5 30 20 L30 35 L26 31 L22 35 L18 31 L14 35 L10 31 Z" />
							<GhostEye
								mouseX={mouseX}
								mouseY={mouseY}
								ghostX={ghostX}
								ghostY={ghostY}
								eyeOffsetX={16}
								eyeOffsetY={18}
							/>
							<GhostEye
								mouseX={mouseX}
								mouseY={mouseY}
								ghostX={ghostX}
								ghostY={ghostY}
								eyeOffsetX={24}
								eyeOffsetY={18}
							/>
						</svg>
					</motion.button>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default VoidIntegrityMeter;
