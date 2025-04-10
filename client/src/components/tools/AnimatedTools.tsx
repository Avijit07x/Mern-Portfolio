import { motion } from "motion/react";
import { Tool } from "./Tools";
const containerVariants = {
	hidden: { opacity: 0, transition: { staggerChildren: 0.02 } },
	visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
};

const itemVariants = {
	hidden: { opacity: 0, scale: 0.9 },
	visible: { opacity: 1, scale: 1 },
};

const AnimatedTools = ({ tools }: { tools: Tool[] }) => {
	return (
		<motion.div
			className="mx-auto mt-5 flex max-w-screen-2xl flex-wrap items-center justify-center gap-4 lg:mt-10 xl:px-36"
			variants={containerVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.2 }}
		>
			{tools.map((tool) => (
				<motion.div
					key={tool._id}
					className="grid size-20 cursor-pointer place-items-center rounded-md border border-white/[0.1] bg-[#0f132e] text-lg drop-shadow-md"
					title={tool.name}
					variants={itemVariants}
					whileHover={{ scale: 0.8, transition: { duration: 0.2 } }}
				>
					<img
						className="aspect-auto size-11.5 object-contain"
						src={tool.image.url}
						alt={tool.name}
					/>
				</motion.div>
			))}
		</motion.div>
	);
};

export default AnimatedTools;
