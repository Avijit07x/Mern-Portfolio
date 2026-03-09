import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";

const Hero = () => {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.15,
				delayChildren: 0.3,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any },
		},
	};

	return (
		<motion.section
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			className="relative flex h-full w-full flex-col justify-center overflow-hidden px-8 lg:px-20"
		>
			{/* Premium CSS Grid Background */}
			<div
				className="absolute inset-0 z-0 opacity-[0.15]"
				style={{
					backgroundImage: `
						repeating-linear-gradient(0deg, transparent, transparent 38px, rgba(255,255,255,0.2) 39px, rgba(255,255,255,0.2) 40px),
						repeating-linear-gradient(90deg, transparent, transparent 38px, rgba(255,255,255,0.2) 39px, rgba(255,255,255,0.2) 40px)
					`,
					maskImage:
						"radial-gradient(circle at 30% 50%, black, transparent 100%)",
					WebkitMaskImage:
						"radial-gradient(circle at 30% 50%, black, transparent 100%)",
				}}
			/>

			{/* Suble Background Watermark */}
			<motion.div
				initial={{ opacity: 0, x: 50 }}
				animate={{ opacity: 0.013, x: 0 }}
				transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
				className="pointer-events-none absolute top-1/2 -right-10 -translate-y-1/2 text-[15vw] font-black tracking-tighter text-white uppercase select-none"
			>
				Engineer
			</motion.div>

			<div className="relative z-10 flex w-full flex-col items-start gap-6">
				<motion.div
					variants={itemVariants}
					className="inline-flex items-center gap-2 border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase"
				>
					<span className="relative flex size-1.5">
						<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500/40 opacity-75"></span>
						<span className="relative inline-flex size-1.5 rounded-full bg-green-500"></span>
					</span>
					Available for work
				</motion.div>

				<motion.h1
					variants={itemVariants}
					className="bg-linear-to-r from-white via-white/90 to-white/40 bg-clip-text py-4 text-6xl font-bold tracking-tighter text-transparent md:text-8xl lg:text-[11rem] lg:leading-[1.1]"
				>
					Avijit Dey<span className="text-white/30">.</span>
				</motion.h1>

				<motion.div
					variants={itemVariants}
					className="relative pl-8 before:absolute before:inset-y-1 before:left-0 before:w-px before:bg-linear-to-b before:from-transparent before:via-white/20 before:to-transparent"
				>
					<p className="max-w-2xl text-lg leading-relaxed font-light tracking-tight text-white/50 md:text-xl lg:text-2xl">
						Software Engineer building robust and scalable web applications.
						Passionate about{" "}
						<span className="text-white/80">clean architecture</span> and{" "}
						<span className="text-white/80">minimalist design</span>.
					</p>
				</motion.div>
			</div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.5, duration: 1 }}
				className="absolute bottom-12 left-8 flex items-center gap-4 text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase lg:left-20"
			>
				<div className="relative flex flex-col items-center">
					<motion.div
						animate={{ y: [0, 4, 0] }}
						transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
					>
						<ChevronDown className="size-4" />
					</motion.div>
					<div className="h-12 w-px bg-linear-to-b from-white/20 to-transparent" />
				</div>
				<span className="mb-8">Explore</span>
			</motion.div>
		</motion.section>
	);
};

export default Hero;
