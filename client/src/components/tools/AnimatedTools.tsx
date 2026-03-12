import { motion } from "motion/react";

const AnimatedTools = ({ tools }: { tools: ITool[] }) => {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.05,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, scale: 0.8, y: 20 },
		visible: {
			opacity: 1,
			scale: 1,
			y: 0,
			transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as any },
		},
	};

	return (
		<motion.div
			variants={containerVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "-100px" }}
			className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10"
		>
			{tools.map((tool, idx) => (
				<motion.div
					key={tool._id}
					variants={itemVariants}
					whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
					className="group relative flex aspect-square cursor-pointer flex-col items-center justify-center border border-white/5 bg-white/2 transition-all duration-300 hover:border-white/10"
				>
					<div className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
						<div className="absolute top-0 left-0 h-2 w-px bg-white/20" />
						<div className="absolute top-0 left-0 h-px w-2 bg-white/20" />
						<div className="absolute right-0 bottom-0 h-2 w-px bg-white/20" />
						<div className="absolute right-0 bottom-0 h-px w-2 bg-white/20" />
					</div>

					<div className="absolute top-2 left-2 text-[8px] font-bold tracking-widest text-white/10 uppercase transition-colors group-hover:text-white/30">
						{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
					</div>

					<img
						className="size-8 object-contain opacity-40 grayscale transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0 md:size-10"
						src={tool.image.url}
						alt={tool.name}
						onError={(e) => (e.currentTarget.src = "/fallback.svg")}
					/>

					<div className="absolute bottom-2 left-0 w-full px-1 text-center opacity-0 transition-all duration-300 group-hover:bottom-3 group-hover:opacity-100">
						<span className="text-[8px] font-bold tracking-[0.2em] whitespace-nowrap text-white/40 uppercase">
							{tool.name}
						</span>
					</div>
				</motion.div>
			))}
		</motion.div>
	);
};

export default AnimatedTools;
