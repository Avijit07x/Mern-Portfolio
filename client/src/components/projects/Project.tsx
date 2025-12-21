import RefContext, { IRefContext } from "@/context/RefContext";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import React, { lazy, Suspense, useContext } from "react";
import ProjectSkeleton from "./ProjectSkeleton";

const ProjectCard = lazy(() => import("./ProjectCard"));

const fetchProjects = async (): Promise<IProject[]> => {
	const res = await api("admin/project/get-projects");
	return res.data.projects;
};

const Projects: React.FC = () => {
	const { projectRef } = useContext<IRefContext>(RefContext);

	const {
		data: projects = [],
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["projects"],
		queryFn: fetchProjects,
	});

	return (
		<section
			ref={projectRef}
			className="scroll-mt-[30px] px-4 pt-5 pb-10 text-white"
		>
			<div className="mx-auto max-w-6xl">
				<div className="mx-auto mb-10 flex flex-col items-center justify-center text-center md:w-[70%]">
					<h2 className="mb-5 text-center text-2xl font-semibold lg:text-3xl">
						My Projects
					</h2>
					<p className="text-gray-20 max-lg:text-sm">
						Each of these projects highlights a unique aspect of what I can do,
						from problem-solving to creative design. I am always eager to take
						on new challenges and expand my horizons.
					</p>
				</div>

				<div className="flex flex-wrap items-center justify-center gap-8">
					<Suspense fallback={<ProjectSkeleton />}>
						{isLoading && <ProjectSkeleton />}

						{isError && <p className="text-red-400">Failed to load projects</p>}

						{!isLoading &&
							!isError &&
							projects.map((project) => (
								<ProjectCard project={project} key={project._id} />
							))}
					</Suspense>
				</div>
			</div>
		</section>
	);
};

export default Projects;
