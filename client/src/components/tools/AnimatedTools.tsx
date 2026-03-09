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
			className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10"
		>
			{tools.map((tool) => (
				<motion.div
					key={tool._id}
					variants={itemVariants}
					whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
					className="group flex aspect-square cursor-pointer items-center justify-center border border-white/10 bg-white/5 transition-colors"
					title={tool.name}
				>
					<img
						className="size-8 object-contain opacity-50 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 md:size-10"
						src={tool.image.url}
						alt={tool.name}
						onError={(e) => (e.currentTarget.src = "/fallback.svg")}
					/>
				</motion.div>
			))}
		</motion.div>
	);
};

export default AnimatedTools;
