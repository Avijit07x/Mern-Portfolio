import { AnimatePresence, motion, useTransform } from "motion/react";
import { useEffect } from "react";
import CombatHUD from "./CombatHUD";
import GhostComponent from "./GhostComponent";
import VoidIntegrityMeter from "./VoidIntegrityMeter";
import { SPOTLIGHT_RADIUS } from "./constants";
import { useGhostHunter } from "./useGhostHunter";

const GhostHunter = () => {
	const {
		mouseX,
		mouseY,
		isVisible,
		ghosts,
		isCombat,
		corruptionLevel,
		isHit,
		isGameActive,
		killGhost,
		startHunt,
		giveUp,
	} = useGhostHunter();

	const spotlightBg = useTransform(
		[mouseX, mouseY],
		([x, y]) =>
			`radial-gradient(circle ${SPOTLIGHT_RADIUS}px at ${x}px ${y}px, transparent 0%, rgba(0,0,0,0.12) 100%)`,
	);

	useEffect(() => {
		const styleId = "ghost-hunter-site-corruption";
		let style = document.getElementById(styleId);
		if (!style) {
			style = document.createElement("style");
			style.id = styleId;
			document.head.appendChild(style);
		}

		if (corruptionLevel === 0) {
			style.innerHTML = `#site-main { filter: none; transform: none; transition: all 1.2s ease-in-out; }`;
			return;
		}

		const brightness = Math.max(0, 100 - corruptionLevel * 5);
		const blur = corruptionLevel * 0.4;
		const skew = corruptionLevel * 0.3;
		const rotate = corruptionLevel * 0.2;
		const scale = 1 - corruptionLevel * 0.005;

		style.innerHTML = `
			#site-main {
				filter: brightness(${brightness}%) blur(${blur}px) contrast(${100 + corruptionLevel * 5}%);
				transform: skew(${skew}deg, ${skew / 2}deg) rotate(${rotate}deg) scale(${scale});
				transform-origin: center;
				transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
				pointer-events: ${corruptionLevel >= 8 ? "none" : "auto"};
			}
		`;

		return () => {
			if (!isVisible) document.getElementById(styleId)?.remove();
		};
	}, [corruptionLevel, isVisible]);

	useEffect(() => {
		const styleId = "ghost-hunter-cursor-hide";
		const active = isCombat && isVisible;

		window.dispatchEvent(
			new CustomEvent("ghost-combat-toggle", { detail: active }),
		);

		if (active) {
			if (!document.getElementById(styleId)) {
				const style = document.createElement("style");
				style.id = styleId;
				style.innerHTML = `* { cursor: none !important; }`;
				document.head.appendChild(style);
			}
		} else {
			document.getElementById(styleId)?.remove();
		}

		return () => {
			document.getElementById(styleId)?.remove();
		};
	}, [isCombat, isVisible]);

	useEffect(() => {
		const styleId = "ghost-hunter-global-hit-shake";
		if (!document.getElementById(styleId)) {
			const style = document.createElement("style");
			style.id = styleId;
			style.innerHTML = `
				@keyframes ghost-real-shake {
					0% { transform: translate(3px, 3px) rotate(0deg); }
					20% { transform: translate(-3px, -2px) rotate(-1deg); }
					40% { transform: translate(-5px, 0px) rotate(1deg); }
					60% { transform: translate(3px, 2px) rotate(0deg); }
					80% { transform: translate(1px, -1px) rotate(1deg); }
					100% { transform: translate(0, 0) rotate(0deg); }
				}
				.ghost-hit-active {
					animation: ghost-real-shake 0.2s cubic-bezier(.36,.07,.19,.97) both !important;
				}
			`;
			document.head.appendChild(style);
		}

		if (isHit) {
			document.documentElement.classList.add("ghost-hit-active");
		} else {
			document.documentElement.classList.remove("ghost-hit-active");
		}

		return () => {
			document.documentElement.classList.remove("ghost-hit-active");
		};
	}, [isHit]);

	return (
		<div className="pointer-events-none fixed inset-0 z-200 overflow-hidden select-none">
			<AnimatePresence>
				{isHit && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.6 }}
						exit={{ opacity: 0 }}
						className="pointer-events-none fixed inset-0 z-2147483647 bg-red-600/40 mix-blend-overlay"
					/>
				)}
			</AnimatePresence>
			<motion.div
				style={{ background: spotlightBg }}
				animate={{ opacity: isVisible ? 1 : 0 }}
				className="absolute inset-0 transition-opacity duration-500"
			/>

			<AnimatePresence>
				{ghosts.map((ghost) => (
					<GhostComponent
						key={ghost.id}
						ghost={ghost}
						mouseX={mouseX}
						mouseY={mouseY}
						isCombat={isCombat}
						onKill={killGhost}
					/>
				))}
			</AnimatePresence>

			<AnimatePresence>
				{isCombat && isVisible && (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.3 }}
							exit={{ opacity: 0 }}
							style={{
								x: mouseX as any,
								y: mouseY as any,
								translateX: -SPOTLIGHT_RADIUS - 10,
								translateY: -SPOTLIGHT_RADIUS - 10,
							}}
							className="absolute h-10 w-10 border-t border-l border-white/30"
						/>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.3 }}
							exit={{ opacity: 0 }}
							style={{
								x: mouseX as any,
								y: mouseY as any,
								translateX: SPOTLIGHT_RADIUS - 30,
								translateY: SPOTLIGHT_RADIUS - 30,
							}}
							className="absolute h-10 w-10 border-r border-b border-white/30"
						/>
					</>
				)}
			</AnimatePresence>

			<CombatHUD isCombat={isCombat} corruptionLevel={corruptionLevel} />

			<AnimatePresence>
				{isCombat && (
					<motion.button
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -50 }}
						whileHover={{
							scale: 1.05,
							backgroundColor: "rgba(255,255,255,0.15)",
						}}
						whileTap={{ scale: 0.95 }}
						onClick={giveUp}
						className="pointer-events-auto fixed top-6 left-6 z-2147483647 flex items-center gap-3 border border-white/20 bg-black/40 px-4 py-2 shadow-2xl backdrop-blur-md transition-all"
					>
						<div className="h-2 w-2 bg-white/40" />
						<span className="text-[10px] font-bold tracking-[3px] text-white/70 uppercase">
							Give Up
						</span>
						<div className="absolute top-0 left-0 h-1.5 w-1.5 border-t border-l border-white/30" />
						<div className="absolute right-0 bottom-0 h-1.5 w-1.5 border-r border-b border-white/30" />
					</motion.button>
				)}
			</AnimatePresence>

			<VoidIntegrityMeter
				isGameActive={isGameActive}
				isCombat={isCombat}
				onTrigger={startHunt}
				mouseX={mouseX}
				mouseY={mouseY}
			/>
		</div>
	);
};

export default GhostHunter;
