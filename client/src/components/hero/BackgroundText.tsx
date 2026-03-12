import { motion } from "motion/react";

const BackgroundText = () => {
	return (
		<motion.div
			initial={{ opacity: 0, x: 50 }}
			animate={{
				opacity: 0.013,
				x: [0, -20, 0],
				y: [0, 10, 0],
			}}
			transition={{
				opacity: { duration: 1.5, ease: "easeOut", delay: 1 },
				x: { duration: 20, repeat: Infinity, ease: "linear" },
				y: { duration: 15, repeat: Infinity, ease: "easeInOut" },
			}}
			className="pointer-events-none absolute top-1/2 -right-10 -translate-y-1/2 text-[15vw] font-black tracking-tighter text-white uppercase select-none"
		>
			Engineer
		</motion.div>
	);
};

export default BackgroundText;
