import RefContext, { IRefContext } from "@/context/RefContext";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import React, { lazy, Suspense, useContext } from "react";
import ProjectSkeleton from "./ProjectSkeleton";

const ProjectCard = lazy(() => import("./ProjectCard"));

const fetchProjects = async (): Promise<IProject[]> => {
	const res = await api.get("admin/project/get-projects");
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
			id="projects"
			ref={projectRef}
			className="relative z-10 scroll-mt-20 border-t border-white/10 px-8 py-24 text-white lg:px-20"
		>
			{/* Diamonds */}
			<div className="pointer-events-none absolute -top-1.5 left-6 z-50 flex size-3 -translate-x-1/2 items-center justify-center lg:left-12">
				<div className="size-1.5 rotate-45 border border-white/20 bg-black" />
			</div>
			<div className="pointer-events-none absolute -top-1.5 right-6 z-50 flex size-3 translate-x-1/2 items-center justify-center lg:right-12">
				<div className="size-1.5 rotate-45 border border-white/20 bg-black" />
			</div>

			{/* Hatch bg */}
			<div
				className="absolute inset-0 z-0 opacity-[0.05]"
				style={{
					backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 15px)`,
					maskImage:
						"radial-gradient(circle at 70% 30%, black, transparent 80%)",
					WebkitMaskImage:
						"radial-gradient(circle at 70% 30%, black, transparent 80%)",
				}}
			/>

			{/* Text bg */}
			<div className="pointer-events-none absolute top-1/2 -left-10 -translate-y-1/2 text-[20vw] font-black tracking-tighter text-white/1 uppercase select-none">
				Works
			</div>

			<div className="relative z-10 mx-auto w-full">
				<div className="mb-20 space-y-4">
					<h2 className="bg-clip-text text-4xl font-bold tracking-tighter text-white md:text-5xl lg:text-7xl">
						Projects<span className="text-white/30!">.</span>
					</h2>
					<div className="relative pl-6 before:absolute before:inset-y-1 before:left-0 before:w-px before:bg-linear-to-b before:from-transparent before:via-white/20 before:to-transparent">
						<p className="max-w-2xl text-lg leading-relaxed font-light text-white/50 md:text-xl">
							A selection of my recent works focusing on{" "}
							<span className="text-white/80">clean architecture</span>,
							performance, and minimalist design.
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2">
					<Suspense fallback={<ProjectSkeleton />}>
						{isLoading && <ProjectSkeleton />}

						{isError && <p className="text-red-400">Failed to load projects</p>}

						{!isLoading &&
							!isError &&
							projects.map((project, index) => (
								<div
									key={project._id}
									className={`group relative p-8 transition-colors hover:bg-white/2 ${
										index % 2 === 0 ? "border-white/10 md:border-r" : ""
									} ${
										index <
										projects.length - (projects.length % 2 === 0 ? 2 : 1)
											? "border-b border-white/10"
											: ""
									}`}
								>
									{/* Diamonds */}
									<div className="pointer-events-none absolute -right-1.5 -bottom-1.5 z-20 hidden size-3 items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 md:flex">
										<div className="size-1.5 rotate-45 border border-white/20 bg-black" />
									</div>

									<ProjectCard project={project} />
								</div>
							))}
					</Suspense>
				</div>
			</div>
		</section>
	);
};

export default Projects;
