import { motion } from "motion/react";

interface HeroNameProps {
	variants: any;
}

const HeroName = ({ variants }: HeroNameProps) => {
	return (
		<motion.div
			variants={variants}
			className="group relative cursor-default"
			style={{ perspective: "1000px" }}
		>
			{/* Front Face: Full Name */}
			<motion.div className="relative z-10 transition-all duration-500 transform-3d group-hover:-translate-y-full group-hover:transform-[rotateX(90deg)]">
				<h1 className="bg-linear-to-r from-white via-white/90 to-white/40 bg-clip-text py-4 text-6xl font-bold tracking-tighter text-transparent md:text-8xl lg:text-9xl lg:leading-[1.1]">
					Avijit Dey<span className="text-white/30">.</span>
				</h1>
			</motion.div>

			{/* Bottom Face: Username */}
			<div className="absolute inset-0 z-0 flex translate-y-full transform-[rotateX(-90deg)] items-center opacity-0 transition-all duration-500 transform-3d group-hover:translate-y-0 group-hover:transform-[rotateX(0deg)] group-hover:opacity-100">
				<h2 className="bg-linear-to-r from-white via-white/90 to-white/40 bg-clip-text py-4 text-6xl font-bold tracking-tighter text-transparent md:text-8xl lg:text-9xl lg:leading-[1.1]">
					Avijit07x<span className="text-white/20">.</span>
				</h2>
			</div>

			{/* Header Corner Accents */}
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
