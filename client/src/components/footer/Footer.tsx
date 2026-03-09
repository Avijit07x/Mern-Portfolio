import Socials from "../socials/Socials";
import { motion } from "motion/react";

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
			<div className="mx-auto w-full max-w-screen-2xl px-6 py-8 md:px-14 lg:px-20">
				<div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
					<motion.span
						variants={itemVariants(-10)}
						className="text-sm text-white/50"
					>
						© {new Date().getFullYear()} Avijit Dey. All rights reserved.
					</motion.span>
					<motion.div
						variants={itemVariants(10)}
						className="opacity-70 transition-opacity hover:opacity-100"
					>
						<Socials />
					</motion.div>
				</div>
			</div>
		</motion.footer>
	);
};

export default Footer;
