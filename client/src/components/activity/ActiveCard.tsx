import { motion } from "motion/react";
import React from "react";
import Duration from "./Duration";

type Props = {
	activity: IActivity;
};

const ActiveCard: React.FC<Props> = ({ activity }) => {
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

			<div className="relative z-10 size-28 shrink-0 drop-shadow-[0_0_20px_rgba(255,255,255,0.05)] md:size-30">
				<motion.img
					variants={{
						hover: { scale: 1.05 },
					}}
					transition={{ duration: 0.7 }}
					className="size-full object-cover"
					src={`https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets?.large_image}.png?size=512`}
					alt={activity.name}
				/>
				<motion.div
					variants={{
						hover: { scale: 1.1, x: 5, y: 5 },
					}}
					transition={{ duration: 0.7 }}
					className="absolute -right-3 -bottom-3 z-20 size-9 overflow-hidden border-4 border-[#020202] bg-[#020202] shadow-2xl"
				>
					<img
						className="size-full object-cover"
						src={`https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets?.small_image}.png?size=128`}
						alt={activity.name}
					/>
				</motion.div>
			</div>

			<div className="relative z-10 flex w-full flex-col space-y-4 text-left">
				<div className="relative space-y-1.5 pl-6 before:absolute before:inset-y-1 before:left-0 before:w-px before:bg-linear-to-b before:from-transparent before:via-white/20 before:to-transparent">
					<h3 className="bg-linear-to-r from-white via-white/90 to-white/40 bg-clip-text text-lg font-bold tracking-tighter text-transparent md:text-xl">
						{activity.name}
					</h3>
					{activity.details && (
						<p className="text-sm font-medium tracking-tight text-white/80">
							{activity.details}
						</p>
					)}
					{activity.state && (
						<p className="text-xs leading-relaxed font-light tracking-wide text-white/40">
							{activity.state}
						</p>
					)}
				</div>

				<div className="flex lg:pl-6">
					<div className="inline-flex items-center gap-3 border border-white/5 bg-white/3 px-5 py-2.5 text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase backdrop-blur-sm transition-colors hover:border-white/10 hover:bg-white/5">
						<span className="relative flex size-2.5">
							<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500/40 opacity-75"></span>
							<span className="absolute inline-flex h-full w-full scale-150 animate-pulse rounded-full bg-green-500/10"></span>
							<span className="relative inline-flex size-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
						</span>
						<Duration activity={activity} />
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default ActiveCard;
