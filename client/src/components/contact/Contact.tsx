import RefContext, { IRefContext } from "@/context/RefContext";
import { ArrowRight } from "lucide-react";
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

	const fadeUp = {
		hidden: { opacity: 0, y: 24 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
		},
	};

	return (
		<motion.section
			ref={contactRef}
			variants={containerVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.3 }}
			className="relative z-10 border-t border-white/10 px-8 py-24 text-white lg:px-20"
		>
			{/* Diamonds */}
			<div className="pointer-events-none absolute top-[-6.5px] left-6 z-50 flex size-3 -translate-x-1/2 items-center justify-center lg:left-12">
				<div className="size-1.5 rotate-45 border border-white/30 bg-black" />
			</div>
			<div className="pointer-events-none absolute top-[-6.5px] right-6 z-50 flex size-3 translate-x-1/2 items-center justify-center lg:right-12">
				<div className="size-1.5 rotate-45 border border-white/30 bg-black" />
			</div>

			{/* Mesh bg */}
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

			{/* Text bg */}
			<div className="pointer-events-none absolute top-1/2 -left-10 -translate-y-1/2 text-[18vw] font-black tracking-tighter text-white/1 select-none">
				CONTACT
			</div>

			<div className="relative z-10 mx-auto w-full">
				<div className="mb-16 flex flex-col items-start gap-8">
					<div className="flex flex-col space-y-4">
						<motion.h2
							variants={titleVariants}
							className="bg-linear-to-b from-white to-white/60 bg-clip-text text-4xl font-bold tracking-tighter text-transparent md:text-5xl lg:text-7xl"
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
						<motion.div variants={fadeUp} className="w-full sm:w-auto">
							<motion.button
								whileTap={{ scale: 0.97 }}
								onClick={() => setOpen(true)}
								className="group relative inline-flex w-full items-center justify-center gap-4 overflow-hidden border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold tracking-[0.15em] text-white uppercase backdrop-blur-sm transition-all duration-500 hover:border-white/25 hover:bg-white/10 sm:w-auto"
							>
								<span className="relative z-10">Send a Message</span>
								<motion.div className="relative z-10 flex h-5 w-5 items-center justify-center overflow-hidden">
									<ArrowRight
										size={14}
										className="transition-transform duration-300 group-hover:translate-x-5"
									/>
									<ArrowRight
										size={14}
										className="absolute -translate-x-5 transition-transform duration-300 group-hover:translate-x-0"
									/>
								</motion.div>

								{/* Shine sweep on hover */}
								<span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
							</motion.button>
						</motion.div>
					</motion.div>
				</div>
				<ContactSheet open={open} setOpen={setOpen} />
			</div>
		</motion.section>
	);
};

export default Contact;
