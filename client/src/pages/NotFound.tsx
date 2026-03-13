import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Link } from "react-router";
import { useEffect, useState } from "react";

const DigitalDust = () => {
	const particles = Array.from({ length: 40 });
	return (
		<div className="absolute inset-0 pointer-events-none z-10">
			{particles.map((_, i) => (
				<motion.div
					key={i}
					initial={{ 
						x: Math.random() * window.innerWidth, 
						y: Math.random() * window.innerHeight,
						opacity: Math.random() * 0.3 
					}}
					animate={{
						y: [null, Math.random() * -100],
						opacity: [null, 0],
						scale: [0.5, 1, 0.5]
					}}
					transition={{
						duration: 2 + Math.random() * 5,
						repeat: Infinity,
						ease: "linear"
					}}
					style={{
						width: Math.random() * 2 + 0.5,
						height: Math.random() * 2 + 0.5,
						backgroundColor: "#ffffff"
					}}
					className="absolute blur-[1px] opacity-20"
				/>
			))}
		</div>
	);
};

const NotFound = () => {
	const mouseX = useMotionValue(window.innerWidth / 2);
	const mouseY = useMotionValue(window.innerHeight / 2);
	const [glitchActive, setGlitchActive] = useState(false);

	const rotateX = useSpring(useTransform(mouseY, [0, window.innerHeight], [8, -8]), { stiffness: 80, damping: 25 });
	const rotateY = useSpring(useTransform(mouseX, [0, window.innerWidth], [-8, 8]), { stiffness: 80, damping: 25 });

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			mouseX.set(e.clientX);
			mouseY.set(e.clientY);
		};
		
		const glitchInterval = setInterval(() => {
			setGlitchActive(true);
			setTimeout(() => setGlitchActive(false), 200);
		}, 4000);

		window.addEventListener("mousemove", handleMouseMove);
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			clearInterval(glitchInterval);
		};
	}, [mouseX, mouseY]);

	const ghostPath = "M10 20 Q10 5 20 5 Q30 5 30 20 L30 35 L26 31 L22 35 L18 31 L14 35 L10 31 Z";

	return (
		<div className={`relative flex h-svh w-full flex-col items-center justify-center overflow-hidden bg-[#000000] font-mono text-white transition-opacity duration-75 ${glitchActive ? "opacity-90" : "opacity-100"}`}>
			{/* High-Fidelity Background: Pulsing Corrupted Void */}
			<motion.div 
				animate={{ 
					scale: [1, 1.05, 1],
					opacity: [0.2, 0.3, 0.2]
				}}
				transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
				className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0)_70%)]"
			/>

			{/* Static Noise Overlay */}
			<div className="pointer-events-none absolute inset-0 z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-[0.02] contrast-150" />
			<DigitalDust />

			{/* Depth-Mapped Phantoms */}
			<div className="absolute inset-0 z-0">
				{[...Array(4)].map((_, i) => (
					<motion.div
						key={`back-${i}`}
						animate={{ 
							x: [Math.random() * 100, Math.random() * -100, Math.random() * 100],
							y: [Math.random() * 100, Math.random() * -100, Math.random() * 100],
							opacity: [0.03, 0.08, 0.03]
						}}
						transition={{ duration: 25 + i * 5, repeat: Infinity, ease: "linear" }}
						className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 filter blur-3xl"
					>
						<svg viewBox="0 0 40 40" className="w-[250px] h-[250px] fill-white/10 md:w-[400px] md:h-[400px]">
							<path d={ghostPath} />
						</svg>
					</motion.div>
				))}
			</div>

			{/* Central Module */}
			<motion.div 
				style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
				className="relative z-20 flex flex-col items-center px-6 text-center"
			>
				{/* The Glitch Core (404) */}
				<div className="relative mb-6 cursor-default select-none group md:mb-8">
					<motion.h1
						animate={glitchActive ? { x: [-10, 10, -5, 0], skewX: [10, -10, 0] } : {}}
						className="text-6xl font-black italic tracking-tighter text-white/10 mix-blend-screen filter blur-[1px] md:text-8xl"
					>
						404
					</motion.h1>
					<motion.h1
						animate={glitchActive ? { x: [10, -10, 5, 0], skewX: [-10, 10, 0] } : {}}
						className="absolute inset-0 text-6xl font-black italic tracking-tighter text-white/20 mix-blend-screen filter blur-[2px] md:text-8xl"
					>
						404
					</motion.h1>
					<h1 className="absolute inset-0 text-6xl font-black italic tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] md:text-8xl">
						404
					</h1>
					
					{/* Horizontal Glitch Bar */}
					<motion.div 
						animate={glitchActive ? { top: ["20%", "70%", "40%"], opacity: [0, 0.5, 0] } : { opacity: 0 }}
						className="absolute left-0 w-full h-px bg-white z-30 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
					/>
				</div>

				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8 }}
					className="flex flex-col items-center gap-3 md:gap-4"
				>
					<div className="relative">
						<h2 className="text-xl font-black tracking-[0.4em] uppercase text-white md:text-3xl md:tracking-[0.5em]">
							Lost in Void
						</h2>
						<div className="absolute -bottom-2 left-0 h-px w-full bg-linear-to-r from-transparent via-white/20 to-transparent" />
					</div>
					<p className="max-w-[250px] text-center text-[9px] font-bold tracking-[0.15em] text-white/30 uppercase leading-relaxed md:max-w-[300px] md:text-[10px] md:tracking-[0.2em]">
						Sector corrupted. The phantoms have claimed this territory.
					</p>
				</motion.div>

				{/* Return Trigger */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1, type: "spring" }}
					className="mt-12 md:mt-16"
				>
					<Link to="/">
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="group relative overflow-hidden bg-white px-8 py-4 text-[9px] font-black tracking-[0.5em] text-black uppercase transition-all duration-500 hover:bg-white/90 md:px-12 md:py-5 md:text-[11px] md:tracking-[0.6em]"
						>
							<span className="relative z-10">
								Escape Now
							</span>
							
							{/* Scanning Layer */}
							<motion.div
								animate={{ top: ["-100%", "200%"] }}
								transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
								className="absolute left-0 h-10 w-full bg-linear-to-b from-transparent via-black/10 to-transparent"
							/>
						</motion.button>
					</Link>
				</motion.div>
			</motion.div>

			{/* Decorative Meta Grid */}
			<div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-size-[40px_40px]" />

			{/* System Log Footer */}
			<div className="absolute bottom-12 w-full px-12 flex justify-between items-end invisible lg:visible">
				<div className="flex flex-col gap-2 font-mono text-[9px] tracking-[0.4em] text-white/20 uppercase">
					<span>Location: 0x00FE404</span>
					<span>Reality: De-Synchronized</span>
				</div>
				<div className="flex flex-col items-end gap-2 font-mono text-[9px] tracking-[0.4em] text-white/40 uppercase text-right">
					<span className="animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.1)] uppercase tracking-[0.22em]">
						Secure Connection: Failed
					</span>
					<span className="text-white/10">Attempting Recovery...</span>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
