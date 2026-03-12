import { motion } from "motion/react";
import Socials from "../socials/Socials";

const Footer = () => {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = (x: number) => ({
		hidden: { opacity: 0, x },
		visible: {
			opacity: 1,
			x: 0,
			transition: { duration: 0.6 },
		},
	});

	return (
		<motion.footer
			variants={containerVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true }}
			className="relative z-10 border-t border-white/10 dark:bg-black"
		>
			<div className="relative mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-6 px-8 py-7 md:flex-row lg:px-20">
				<div className="pointer-events-none absolute top-0 left-0 z-50 hidden size-3 -translate-x-1/2 -translate-y-1/2 items-center justify-center xl:flex">
					<div className="size-1.5 rotate-45 border border-white/30 bg-black" />
				</div>
				<div className="pointer-events-none absolute top-0 right-0 z-50 hidden size-3 translate-x-1/2 -translate-y-1/2 items-center justify-center xl:flex">
					<div className="size-1.5 rotate-45 border border-white/30 bg-black" />
				</div>

				<div className="flex flex-col items-center gap-6 md:flex-row">
					<p className="text-xs font-light tracking-wider text-white/30">
						© {new Date().getFullYear()} Avijit Dey. All rights reserved.
					</p>
				</div>

				<motion.div
					variants={itemVariants(10)}
					className="opacity-70 transition-opacity hover:opacity-100"
				>
					<Socials />
				</motion.div>
			</div>
		</motion.footer>
	);
};

export default Footer;
