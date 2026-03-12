import { motion } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router";
import { GithubIcon, GithubIconHandle } from "../ui/GithubIcon";
import {
	SquareArrowOutUpRightIcon,
	SquareArrowOutUpRightIconHandle,
} from "../ui/SquareArrowOutUpRightIcon";

type Props = {
	project: IProject;
	index: number;
};

const ProjectCard: React.FC<Props> = ({ project, index }) => {
	const linkRef = useRef<SquareArrowOutUpRightIconHandle>(null);
	const githubRef = useRef<GithubIconHandle>(null);
	const year = new Date(project.createdAt).getFullYear();

	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-50px" }}
			transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }}
			className="group flex w-full flex-col gap-6"
		>
			<div className="relative aspect-video w-full overflow-hidden bg-white/5">
				<div className="pointer-events-none absolute inset-0 z-20">
					<div className="absolute top-0 left-0 h-4 w-px bg-white/20" />
					<div className="absolute top-0 left-0 h-px w-4 bg-white/20" />
					<div className="absolute right-0 bottom-0 h-4 w-px bg-white/20" />
					<div className="absolute right-0 bottom-0 h-px w-4 bg-white/20" />
				</div>

				<div className="absolute top-4 right-4 z-20 text-[9px] font-bold tracking-[0.2em] text-white/40 uppercase opacity-0 transition-opacity duration-500 group-hover:opacity-100">
					[ ID: SERIAL_0{index + 1} ]
				</div>

				<div className="absolute inset-0 z-10 bg-black/20 transition-colors duration-500 group-hover:bg-transparent" />
				<motion.img
					whileHover={{ scale: 1.05 }}
					transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as any }}
					src={project.image.url}
					alt={project.title}
					className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
				/>
			</div>

			<div className="flex w-full flex-col justify-between">
				<div className="flex w-full items-start justify-between gap-4">
					<div className="flex flex-col gap-4">
						<div className="flex items-center gap-3">
							<span className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase">
								[ 0{index + 1} ]
							</span>
							<h3 className="bg-linear-to-b from-white to-white/70 bg-clip-text text-base font-bold tracking-tight text-transparent">
								{project.title}
							</h3>
							<span className="text-[10px] font-bold tracking-[0.2em] text-white/10">
								/ {year}
							</span>
						</div>

						<div className="flex flex-col gap-3">
							<div className="text-[8px] font-bold tracking-[0.2em] text-white/20 uppercase">
								Stack Analysis.
							</div>
							<div className="flex flex-wrap gap-2 text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">
								{project.tools.slice(0, 3).map((tool, idx) => (
									<span key={tool._id} className="flex items-center">
										{tool.text}
										{idx !== Math.min(project.tools.length, 3) - 1 && (
											<span className="mx-3 size-1 rounded-full bg-white/10" />
										)}
									</span>
								))}
								{project.tools.length > 3 && (
									<span className="truncate text-white/30">
										+ {project.tools.length - 3} more
									</span>
								)}
							</div>
						</div>
					</div>

					<div className="flex shrink-0 items-center justify-end gap-5">
						{project.github_link && (
							<Link
								to={project.github_link}
								target="_blank"
								rel="noopener noreferrer"
								className="text-white/30 transition-colors hover:text-white"
								onMouseEnter={() => githubRef.current?.startAnimation()}
								onMouseLeave={() => githubRef.current?.stopAnimation()}
								aria-label="GitHub Repository"
							>
								<GithubIcon ref={githubRef} size={18} />
							</Link>
						)}
						{project.live_link && (
							<Link
								to={project.live_link}
								target="_blank"
								rel="noopener noreferrer"
								className="text-white/50 transition-colors hover:text-white"
								onMouseEnter={() => linkRef.current?.startAnimation()}
								onMouseLeave={() => linkRef.current?.stopAnimation()}
								aria-label="Live Demo"
							>
								<SquareArrowOutUpRightIcon ref={linkRef} size={18} />
							</Link>
						)}
					</div>
				</div>

				<div className="mt-4 border-t border-white/5 pt-4">
					<p className="line-clamp-2 pr-12 text-sm leading-relaxed font-light text-white/40 transition-colors group-hover:text-white/60">
						{project.description}
					</p>
				</div>
			</div>
		</motion.div>
	);
};

export default ProjectCard;
