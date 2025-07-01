import { motion } from "motion/react";
import { Tool } from "./Tools";

const itemVariants = {
	hidden: { opacity: 0, scale: 0.9 },
	visible: { opacity: 1, scale: 1 },
};

const AnimatedTools = ({ tools }: { tools: Tool[] }) => {
	return (
		<div className="mx-auto mt-5 flex max-w-screen-2xl flex-wrap items-center px-4 justify-center gap-4 lg:mt-10 xl:px-36">
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
		</div>
	);
};

export default AnimatedTools;
