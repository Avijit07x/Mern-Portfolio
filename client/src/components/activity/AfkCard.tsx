import { motion } from "motion/react";
import React from "react";

const AfkCard: React.FC = () => {
	return (
		<motion.div
			whileHover="hover"
			className="group relative mt-10 flex w-full flex-col items-start gap-8 md:flex-row md:items-center"
		>
			{/* Background Sheen Effect */}
			<motion.div
				variants={{
					hover: { scale: 1, opacity: 1 },
				}}
				initial={{ scale: 0.95, opacity: 0 }}
				transition={{ duration: 0.7 }}
				className="blur-xlg absolute -inset-x-6 -inset-y-4 z-0 bg-white/2"
			/>

			<div className="relative z-10 size-28 shrink-0 drop-shadow-[0_0_20px_rgba(255,255,255,0.05)] md:size-32">
				<motion.img
					variants={{
						hover: { scale: 1.05, rotate: 2 },
					}}
					transition={{ duration: 0.7 }}
					className="size-full object-contain opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0"
					src="/afk.webp"
					alt="afk"
				/>
			</div>

			<div className="relative z-10 flex w-full flex-col space-y-4 text-left">
				<div className="relative space-y-1.5 pl-6 before:absolute before:inset-y-1 before:left-0 before:w-px before:bg-linear-to-b before:from-transparent before:via-white/20 before:to-transparent">
					<h3 className="bg-linear-to-r from-white via-white/90 to-white/40 bg-clip-text text-2xl font-bold tracking-tighter text-transparent md:text-3xl">
						Idling
					</h3>
					<p className="text-sm leading-relaxed font-medium tracking-tight text-white/40 md:text-base">
						Someone ping my brain, <br className="hidden md:block" /> it's
						currently AFK.
					</p>
				</div>
				<div className="flex pl-6">
					<div className="inline-flex items-center gap-3 rounded-full border border-white/5 bg-white/3 px-5 py-2.5 text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase backdrop-blur-sm transition-colors hover:border-white/10 hover:bg-white/5">
						<span className="relative flex size-2.5">
							<span className="relative inline-flex size-2.5 rounded-full bg-white/10"></span>
						</span>
						Sleeping / Away
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default AfkCard;
