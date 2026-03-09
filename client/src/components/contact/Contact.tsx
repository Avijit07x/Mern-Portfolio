import RefContext, { IRefContext } from "@/context/RefContext";
import { motion } from "motion/react";
import { useContext, useState } from "react";
import ContactSheet from "./ContactSheet";

const Contact: React.FC = () => {
	const { contactRef } = useContext<IRefContext>(RefContext);
	const [open, setOpen] = useState<boolean>(false);
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any },
		},
	};

	const titleVariants = {
		hidden: { opacity: 0, x: -20 },
		visible: {
			opacity: 1,
			x: 0,
			transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any },
		},
	};

	return (
		<motion.section
			ref={contactRef}
			variants={containerVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.3 }}
			className="relative z-10 overflow-hidden border-t border-white/10 px-8 py-24 text-white lg:px-20"
		>
			{/* Subtle Soft Mesh Background */}
			<div
				className="absolute inset-0 z-0 opacity-[0.12]"
				style={{
					backgroundImage: `
						radial-gradient(at 0% 0%, rgba(255,255,255,0.3) 0, transparent 50%),
						radial-gradient(at 100% 100%, rgba(255,255,255,0.2) 0, transparent 50%)
					`,
					filter: "blur(30px)",
				}}
			/>

			{/* Suble Background Watermark */}
			<div className="pointer-events-none absolute top-1/2 -left-10 -translate-y-1/2 text-[18vw] font-black tracking-tighter text-white/1 select-none">
				CONTACT
			</div>

			<div className="relative z-10 mx-auto w-full">
				<div className="mb-16 flex flex-col items-start gap-8">
					<div className="flex flex-col space-y-4">
						<motion.h2
							variants={titleVariants}
							className="text-4xl font-bold tracking-tighter text-white md:text-5xl lg:text-7xl"
						>
							Get in Touch<span className="text-white/30">.</span>
						</motion.h2>
						<motion.div
							variants={itemVariants}
							className="relative pl-6 before:absolute before:inset-y-1 before:left-0 before:w-px before:bg-linear-to-b before:from-transparent before:via-white/20 before:to-transparent"
						>
							<p className="max-w-2xl text-lg leading-relaxed font-light text-white/50 md:text-xl">
								Let's build something together. Whether you have a project in
								mind or just want to chat, my inbox is always open.
							</p>
						</motion.div>
					</div>

					<motion.div
						variants={{
							hidden: { opacity: 0, scale: 0.9 },
							visible: {
								opacity: 1,
								scale: 1,
								transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any },
							},
						}}
						className="flex w-full items-start lg:pl-6"
					>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.98 }}
							onClick={() => setOpen(true)}
							className="group relative inline-flex w-full items-center justify-center bg-white px-10 py-4 text-sm font-bold tracking-widest text-black uppercase shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] sm:w-auto"
						>
							Send a Message
						</motion.button>
					</motion.div>
				</div>
				<ContactSheet open={open} setOpen={setOpen} />
			</div>
		</motion.section>
	);
};

export default Contact;
