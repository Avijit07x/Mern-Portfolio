import {
	AnimatePresence,
	motion,
	useMotionValue,
	useSpring,
	useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

const GamingHUDCursor = () => {
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const springConfig1 = { damping: 30, stiffness: 400, mass: 0.5 };
	const boxX1 = useSpring(mouseX, springConfig1);
	const boxY1 = useSpring(mouseY, springConfig1);

	const springConfig2 = { damping: 40, stiffness: 200, mass: 0.8 };
	const boxX2 = useSpring(mouseX, springConfig2);
	const boxY2 = useSpring(mouseY, springConfig2);

	const springConfig3 = { damping: 50, stiffness: 100, mass: 1.2 };
	const boxX3 = useSpring(mouseX, springConfig3);
	const boxY3 = useSpring(mouseY, springConfig3);

	const [isVisible, setIsVisible] = useState(false);
	const [isActive, setIsActive] = useState(false);
	const [isMoving, setIsMoving] = useState(false);
	const [rawCoords, setRawCoords] = useState({ x: 0, y: 0 });
	const [clicks, setClicks] = useState<number[]>([]);
	const timeoutRef = useRef<number | null>(null);

	useEffect(() => {
		const handleToggle = (e: any) => setIsActive(e.detail);
		window.addEventListener("ghost-combat-toggle", handleToggle);
		return () =>
			window.removeEventListener("ghost-combat-toggle", handleToggle);
	}, []);

	const [distance, setDistance] = useState(0);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			const x = e.clientX;
			const y = e.clientY;
			mouseX.set(x);
			mouseY.set(y);
			setRawCoords({ x, y });
			setIsVisible(true);
			setIsMoving(true);

			const dx = x - boxX1.get();
			const dy = y - boxY1.get();
			const d = Math.sqrt(dx * dx + dy * dy);
			setDistance(Math.min(d, 100));

			if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
			timeoutRef.current = window.setTimeout(() => {
				setIsMoving(false);
				setDistance(0);
			}, 150);
		};

		const handleMouseDown = () => {
			setClicks((prev) => [...prev, Date.now()]);
			setTimeout(() => setClicks((prev) => prev.slice(1)), 600);
		};

		const handleMouseLeave = () => setIsVisible(false);
		const handleMouseEnter = () => setIsVisible(true);

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mousedown", handleMouseDown);
		document.addEventListener("mouseleave", handleMouseLeave);
		document.addEventListener("mouseenter", handleMouseEnter);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mousedown", handleMouseDown);
			document.removeEventListener("mouseleave", handleMouseLeave);
			document.removeEventListener("mouseenter", handleMouseEnter);
		};
	}, [mouseX, mouseY, boxX1, boxY1]);

	const boxSize = 14 + ((distance * distance) / 10000) * 30;
	const rotate = useTransform(boxX1, (v) => v * 0.3);

	const ghostLayers = [
		{ x: boxX1, y: boxY1, opacity: 1, scale: 1 },
		{ x: boxX2, y: boxY2, opacity: 0.3, scale: 0.9 },
		{ x: boxX3, y: boxY3, opacity: 0.1, scale: 0.8 },
	];

	return (
		<AnimatePresence>
			{isActive && (
				<motion.div
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					style={{ opacity: "var(--cursor-health-opacity, 1)" }}
					className="pointer-events-none fixed inset-0 z-1000"
				>
					<motion.div
						style={{
							x: boxX1,
							y: boxY1,
							translateX: "-50%",
							translateY: "-50%",
						}}
						animate={{ rotate: 360 }}
						transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
						className="absolute h-16 w-16"
					>
						{[0, 120, 240].map((angle, i) => (
							<motion.div
								key={i}
								style={{
									transformOrigin: "center center",
									rotate: angle,
								}}
								className="absolute top-0 left-1/2 h-full w-px"
							>
								<div className="h-1 w-1 rounded-full bg-white opacity-40 shadow-[0_0_5px_white]" />
							</motion.div>
						))}
					</motion.div>

					{ghostLayers.map((layer, i) => (
						<motion.div
							key={i}
							style={{
								x: layer.x,
								y: layer.y,
								translateX: "-50%",
								translateY: "-50%",
								rotate: isMoving ? rotate : 0,
								width: boxSize * layer.scale,
								height: boxSize * layer.scale,
								opacity: isVisible ? layer.opacity : 0,
							}}
							className="absolute flex items-center justify-center border-white"
						>
							<div className="absolute inset-0 border border-white/40" />
							{i === 0 && isVisible && (
								<>
									<div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-white" />
									<div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-white" />
									<div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-white" />
									<div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-white" />
								</>
							)}
						</motion.div>
					))}

					<motion.div
						style={{ x: boxX1, y: boxY1, translateX: 30, translateY: -30 }}
						animate={{ opacity: isVisible && isMoving ? 1 : 0 }}
						className="absolute flex flex-col items-start gap-1 font-mono text-[8px] leading-none tracking-widest text-white/50 uppercase"
					>
						<div className="flex gap-2">
							<span className="text-white/20">LOC_X</span>
							<span>{Math.round(rawCoords.x)}</span>
						</div>
						<div className="flex gap-2">
							<span className="text-white/20">LOC_Y</span>
							<span>{Math.round(rawCoords.y)}</span>
						</div>
						<div className="mt-1 animate-pulse text-[6px] text-white/20">
							[ SYSTEM_ACTIVE ]
						</div>
					</motion.div>

					<AnimatePresence>
						{clicks.map((id) => (
							<motion.div
								key={id}
								initial={{
									x: mouseX.get(),
									y: mouseY.get(),
									scale: 0,
									opacity: 1,
								}}
								animate={{ scale: 3, opacity: 0 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.6, ease: "easeOut" }}
								className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white opacity-50"
							/>
						))}
					</AnimatePresence>

					<motion.div
						style={{
							x: mouseX,
							y: mouseY,
							translateX: "-50%",
							translateY: "-50%",
						}}
						animate={{ opacity: isVisible ? 1 : 0, scale: isMoving ? 0.6 : 1 }}
						className="absolute h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_white]"
					/>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default GamingHUDCursor;
