import { useRef } from "react";
import { Link } from "react-router";
import { GithubIcon, GithubIconHandle } from "../ui/GithubIcon";
import {
	SquareArrowOutUpRightIcon,
	SquareArrowOutUpRightIconHandle,
} from "../ui/SquareArrowOutUpRightIcon";

type Props = {
	project: IProject;
};

const ProjectCard: React.FC<Props> = ({ project }) => {
	const linkRef = useRef<SquareArrowOutUpRightIconHandle>(null);
	const githubRef = useRef<GithubIconHandle>(null);

	return (
		<div className="blur- flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f132e5d] shadow-lg transition-all duration-300 hover:scale-[1.01] lg:flex-row-reverse">
			{/* Image Section */}
			<div className="h-52 w-full lg:h-60 lg:w-[45%]">
				<img
					src={project.image.url}
					alt={project.title}
					className="h-full w-full object-cover"
				/>
			</div>

			{/* Content Section */}
			<div className="flex w-full flex-col justify-between p-6 backdrop-blur-3xl lg:w-[55%]">
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
						<Link
							to={project.live_link}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300"
							onMouseEnter={() => linkRef.current?.startAnimation()}
							onMouseLeave={() => linkRef.current?.stopAnimation()}
						>
							Live <SquareArrowOutUpRightIcon ref={linkRef} size={14} />
						</Link>
					)}
					{project.github_link && (
						<Link
							to={project.github_link}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-1 text-sm text-gray-400 hover:text-white"
							onMouseEnter={() => githubRef.current?.startAnimation()}
							onMouseLeave={() => githubRef.current?.stopAnimation()}
						>
							GitHub <GithubIcon ref={githubRef} size={14} />
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;
