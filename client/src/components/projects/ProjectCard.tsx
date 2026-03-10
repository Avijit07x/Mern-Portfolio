import { useRef } from "react";
import { Link } from "react-router";
import { GithubIcon, GithubIconHandle } from "../ui/GithubIcon";
import {
	SquareArrowOutUpRightIcon,
	SquareArrowOutUpRightIconHandle,
} from "../ui/SquareArrowOutUpRightIcon";
import { motion } from "motion/react";

type Props = {
	project: IProject;
};

const ProjectCard: React.FC<Props> = ({ project }) => {
	const linkRef = useRef<SquareArrowOutUpRightIconHandle>(null);
	const githubRef = useRef<GithubIconHandle>(null);

	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-50px" }}
			transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }}
			className="group flex w-full flex-col gap-6"
		>
			<div className="relative aspect-video w-full overflow-hidden bg-white/5">
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
					<div className="flex flex-col gap-3">
						<h3 className="bg-linear-to-b from-white to-white/70 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
							{project.title}
						</h3>
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

					<div className="flex shrink-0 items-center justify-end gap-5">
						{project.github_link && (
							<Link
								to={project.github_link}
								target="_blank"
								rel="noopener noreferrer"
								className="text-white/50 transition-colors hover:text-white"
								onMouseEnter={() => githubRef.current?.startAnimation()}
								onMouseLeave={() => githubRef.current?.stopAnimation()}
								aria-label="GitHub Repository"
							>
								<GithubIcon ref={githubRef} size={20} />
							</Link>
						)}
						{project.live_link && (
							<Link
								to={project.live_link}
								target="_blank"
								rel="noopener noreferrer"
								className="text-white transition-colors hover:text-white/70"
								onMouseEnter={() => linkRef.current?.startAnimation()}
								onMouseLeave={() => linkRef.current?.stopAnimation()}
								aria-label="Live Demo"
							>
								<SquareArrowOutUpRightIcon ref={linkRef} size={20} />
							</Link>
						)}
					</div>
				</div>

				<div>
					<p className="line-clamp-2 pr-12 text-sm leading-relaxed font-light text-white/50 transition-colors group-hover:text-white/70">
						{project.description}
					</p>
				</div>
			</div>
		</motion.div>
	);
};

export default ProjectCard;
