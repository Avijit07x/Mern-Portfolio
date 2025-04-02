import axios from "axios"; import { motion } from "motion/react"; import { useEffect, useState } from "react";

type Tool = { _id: string; name: string; image: { url: string; public_id: string; }; public_id: string; __v: number; };

const containerVariants = { hidden: { opacity: 0, transition: { staggerChildren: 0.08 } }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } }, };

const itemVariants = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 }, };

const Tools = () => { const [tools, setTools] = useState<Tool[]>([]);

useEffect(() => {
	const fetchTools = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_SERVER_URL}admin/tool/get-tools`
			);
			const data = response.data.tools;
			setTools(data);
		} catch (error) {
			console.error("Error fetching tools:", error);
		}
	};
	fetchTools();
}, []);

return (
	<div className="min-h-[400px] py-10">
		<div className="flex w-full flex-col items-center gap-5 overflow-hidden">
			<div className="px-3 text-center lg:w-1/2">
				<h2 className="w-full text-center text-2xl font-semibold lg:text-3xl">
					<span className="text-primary"></span>Languages &amp; Tools
					<span className="text-primary"></span>
				</h2>
				<p className="mt-5 text-sm">
					I am skilled in various languages and tools and have a strong drive
					to learn new technologies and stay updated with the latest industry
					trends. Currently, my focus is on deepening my expertise in backend
					development, exploring new frameworks and technologies to enhance my
					capabilities.
				</p>
			</div>
		</div>

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
					className="grid size-20 cursor-pointer place-items-center rounded-md border border-white/[0.1] bg-[#0f132e] text-lg drop-shadow-md will-change-transform"
					title={tool.name}
					variants={itemVariants}
					whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
					whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
				>
					<img
						className="aspect-auto size-11.5 object-contain"
						src={tool.image.url}
						alt={tool.name}
					/>
				</motion.div>
			))}
		</motion.div>
	</div>
);

};

export default Tools;

