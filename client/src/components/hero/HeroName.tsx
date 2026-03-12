import { motion } from "motion/react";
import { useState } from "react";

interface HeroNameProps {
	variants: any;
}

const HeroName = ({ variants: parentVariants }: HeroNameProps) => {
	const [isFlipped, setIsFlipped] = useState(false);

	const frontVariants = {
		initial: { y: 0, rotateX: 0, opacity: 1 },
		flipped: { y: "-100%", rotateX: 90, opacity: 0 },
	};

	const backVariants = {
		initial: { y: "100%", rotateX: -90, opacity: 0 },
		flipped: { y: 0, rotateX: 0, opacity: 1 },
	};

	return (
		<motion.div
			variants={parentVariants}
			className="group relative cursor-default"
			style={{ perspective: "1000px" }}
		>
			<div
				className="absolute inset-x-0 top-1/2 z-50 h-full -translate-y-1/2"
				onMouseEnter={() => setIsFlipped(true)}
				onMouseLeave={() => setIsFlipped(false)}
			/>

			<motion.div
				variants={frontVariants}
				initial="initial"
				animate={isFlipped ? "flipped" : "initial"}
				transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
				className="pointer-events-none relative z-10 transform-3d"
			>
				<h1 className="bg-linear-to-r from-white via-white/90 to-white/40 bg-clip-text py-4 text-6xl font-bold tracking-tighter text-transparent md:text-8xl lg:text-9xl lg:leading-[1.1]">
					Avijit Dey<span className="text-white/30">.</span>
				</h1>
			</motion.div>

			<motion.div
				variants={backVariants}
				initial="initial"
				animate={isFlipped ? "flipped" : "initial"}
				transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
				className="pointer-events-none absolute inset-0 z-0 flex items-center transform-3d"
			>
				<h2 className="bg-linear-to-r from-white via-white/90 to-white/40 bg-clip-text py-4 text-6xl font-bold tracking-tighter text-transparent md:text-8xl lg:text-9xl lg:leading-[1.1]">
					Avijit07x<span className="text-white/20">.</span>
				</h2>
			</motion.div>

			<div className="pointer-events-none absolute -inset-4 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
				<div className="absolute top-0 left-0 h-4 w-px bg-white/20" />
				<div className="absolute top-0 left-0 h-px w-4 bg-white/20" />
				<div className="absolute right-0 bottom-0 h-4 w-px bg-white/20" />
				<div className="absolute right-0 bottom-0 h-px w-4 bg-white/20" />
			</div>
		</motion.div>
	);
};

export default HeroName;
