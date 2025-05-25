import { motion } from "motion/react";

const item = {
	hidden: { opacity: 0, y: 30 },
	show: { opacity: 1, y: 0 },
};

const ProjectSkeleton: React.FC = () => {
	return (
		<>
			{Array.from({ length: 2 }).map((_, i) => (
				<motion.div
					variants={item}
					key={i}
					className="h-[430px] w-[340px] rounded-2xl border border-slate-700 bg-[#0f132e] p-6 shadow-lg"
				>
					<div className="animate-pulse">
						<div className="mb-4 h-52 w-full rounded-md bg-slate-700" />
						<div className="mb-2 h-4 w-3/4 rounded bg-slate-600" />
						<div className="mb-3 h-3 w-full rounded bg-slate-700" />
						<div className="mb-4 h-3 w-[85%] rounded bg-slate-700" />
						<div className="mb-4 flex gap-2">
							<span className="h-5 w-16 rounded-full bg-slate-600" />
							<span className="h-5 w-14 rounded-full bg-slate-600" />
							<span className="h-5 w-12 rounded-full bg-slate-600" />
						</div>
						<div className="h-4 w-1/2 rounded bg-slate-600" />
					</div>
				</motion.div>
			))}
		</>
	);
};

export default ProjectSkeleton;
