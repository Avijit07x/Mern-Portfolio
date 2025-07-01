import { ExternalLink, Github } from "lucide-react";

type Props = {
	project: IProject;
};

const ProjectCard: React.FC<Props> = ({ project }) => {
	return (
		<div className="flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0f132e] shadow-lg transition-all duration-300 hover:scale-[1.01] lg:flex-row-reverse">
			{/* Image Section */}
			<div className="h-52 w-full lg:w-[45%] lg:h-60">
				<img
					src={project.image.url}
					alt={project.title}
					className="h-full w-full object-cover"
				/>
			</div>

			{/* Content Section */}
			<div className="flex w-full flex-col justify-between p-6 lg:w-[55%]">
				<div>
					<h3 className="mb-2 line-clamp-1 text-lg font-semibold text-white capitalize lg:text-xl">
						{project.title}
					</h3>
					<p className="mb-4 line-clamp-3 text-sm text-gray-300">
						{project.description}
					</p>
					<div className="mb-4 flex flex-wrap gap-2">
						{project.tools.map((tool) => (
							<span
								key={tool._id}
								className="rounded-full bg-indigo-600/20 px-2 py-1 text-xs text-indigo-300"
							>
								{tool.text}
							</span>
						))}
					</div>
				</div>

				<div className="mt-2 flex items-center gap-4">
					{project.live_link && (
						<a
							href={project.live_link}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300"
						>
							Live <ExternalLink size={14} />
						</a>
					)}
					{project.github_link && (
						<a
							href={project.github_link}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-1 text-sm text-gray-400 hover:text-white"
						>
							GitHub <Github size={14} />
						</a>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;
