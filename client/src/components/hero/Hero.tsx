import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import BackgroundText from "./BackgroundText";
import HeroName from "./HeroName";
import HeroBackground from "./HeroBackground";

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
			className="relative flex h-full w-full flex-col justify-center overflow-hidden"
		>
			<div className="relative mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-8 lg:px-20">
				{/* Hero Background System */}
				<HeroBackground />

				{/* Text bg */}
				<BackgroundText />

				{/* Technical Side Metadata removed - moving to bottom right */}

				{/* Technical Top-Left Status */}
				<div className="pointer-events-none absolute top-12 left-8 hidden flex-col gap-2 text-[9px] font-bold tracking-[0.3em] text-white/10 uppercase lg:left-20 xl:flex">
					<div className="flex flex-col gap-2">
						<span className="text-white/20">[ AVAILABILITY ]</span>
						<div className="flex items-center gap-2 text-white/40">
							<span className="relative flex size-1.5">
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500/40 opacity-75"></span>
								<span className="relative inline-flex size-1.5 rounded-full bg-green-500"></span>
							</span>
							AVAILABLE_FOR_WORK
						</div>
					</div>
				</div>

				<div className="relative z-10 flex w-full flex-col items-start gap-6">
					<HeroName variants={itemVariants} />


					<motion.div
						variants={itemVariants}
						className="relative flex flex-col gap-6"
					>
						<div className="relative pl-8 before:absolute before:inset-y-1 before:left-0 before:w-px before:bg-linear-to-b before:from-transparent before:via-white/20 before:to-transparent">
							<p className="max-w-2xl text-lg leading-relaxed font-light tracking-tight text-white/50 md:text-xl">
								Software Engineer building robust and scalable web applications.
								Passionate about{" "}
								<span className="text-white/80">clean architecture</span> and{" "}
								<span className="text-white/80">minimalist design</span>.
							</p>
						</div>
					</motion.div>
				</div>


				{/* Technical Bottom-Right Metadata */}
				<div className="pointer-events-none absolute right-8 bottom-12 hidden flex-col gap-8 text-right text-[9px] font-bold tracking-[0.3em] text-white/10 uppercase lg:right-20 xl:flex">
					<div className="flex flex-col gap-1">
						<span className="text-white/20">[ LOCATION ]</span>
						<span>Kolkata, IN</span>
					</div>
					<div className="flex flex-col gap-1">
						<span className="text-white/20">[ TIMEZONE ]</span>
						<span>UTC +5:30</span>
					</div>
					<div className="flex flex-col gap-1">
						<span className="text-white/20">[ OS ]</span>
						<span>Linux_Mint_v23</span>
					</div>
				</div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1.5, duration: 1 }}
					className="absolute bottom-12 left-7 flex items-center gap-4 text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase lg:left-18"
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
					<div className="flex flex-col gap-1">
						<span className="mb-2 text-white/40">Explore</span>
						<span className="text-[8px] tracking-[0.5em] text-white/10">
							0.00°N 0.00°E
						</span>
					</div>
				</motion.div>
			</div>
		</motion.section>
	);
};

export default Hero;
