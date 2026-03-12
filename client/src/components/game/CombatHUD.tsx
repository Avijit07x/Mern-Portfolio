import { AnimatePresence, motion } from "motion/react";

interface CombatHUDProps {
	isCombat: boolean;
	corruptionLevel: number;
}

const CombatHUD = ({ isCombat, corruptionLevel }: CombatHUDProps) => {
	return (
		<AnimatePresence>
			{isCombat && (
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					className="fixed top-6 right-6 z-2147483647 flex flex-col items-end gap-2"
				>
					<div className="relative border border-white/20 bg-black/80 p-5 shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-md">
						<div className="mb-4 flex items-center gap-3 border-b border-white/20 pb-3">
							<div className="h-1.5 w-1.5 bg-white shadow-[0_0_8px_white]" />
							<span className="text-[10px] font-bold tracking-[4px] text-white/50 uppercase">
								Combat Protocol
							</span>
						</div>

						<div className="flex flex-col gap-3">
							<h3 className="text-[14px] font-black tracking-widest text-white uppercase">
								System Alert
							</h3>
							<div className="flex flex-col gap-1.5">
								<p className="text-[11px] leading-relaxed font-bold tracking-wide text-white/40">
									MISSION: <span className="text-white/90">PURGE THE VOID</span>
								</p>
								<p className="text-[11px] leading-relaxed font-bold tracking-wide text-white/40 uppercase">
									ACTION:{" "}
									<span className="text-white">Click Ghosts to Kill</span>
								</p>
							</div>

							<div className="mt-2 flex justify-between gap-6 border-t border-white/10 pt-3">
								<div className="flex flex-col">
									<span className="text-[8px] font-bold text-white/30 uppercase">
										Site Status
									</span>
									<span className="font-mono text-[11px] font-bold text-white/60">
										Corrupt: {corruptionLevel * 5}%
									</span>
								</div>
								<div className="flex flex-col text-right">
									<span className="text-[8px] font-bold text-white/30 uppercase">
										Target
									</span>
									<span className="font-mono text-[11px] font-bold text-white/60">
										Phantom
									</span>
								</div>
							</div>
						</div>

						<div className="absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-white/40" />
						<div className="absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2 border-white/40" />
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default CombatHUD;
