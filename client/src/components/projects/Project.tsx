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
			className="relative z-10 border-t border-white/10 py-24 text-white"
		>
			{/* Diamonds */}
			<div className="pointer-events-none absolute top-0 left-1/2 z-50 hidden w-full max-w-7xl -translate-x-1/2 xl:flex">
				<div className="absolute top-0 left-0 size-3 -translate-x-1/2 -translate-y-1/2 items-center justify-center flex">
					<div className="size-1.5 rotate-45 border border-white/30 bg-black" />
				</div>
				<div className="absolute top-0 right-0 size-3 translate-x-1/2 -translate-y-1/2 items-center justify-center flex">
					<div className="size-1.5 rotate-45 border border-white/30 bg-black" />
				</div>
			</div>

			<div className="relative mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-8 lg:px-20">

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
				<div className="pointer-events-none absolute top-1/2 -right-10 -translate-y-1/2 text-[20vw] font-black tracking-tighter text-white/1 uppercase select-none">
					Works
				</div>

				<div className="relative z-10 mx-auto w-full">
					<div className="mb-20 space-y-4">
						<h2 className="3xl:text-6xl bg-linear-to-b from-white to-white/60 bg-clip-text text-4xl font-bold tracking-tighter text-transparent md:text-5xl">
							Projects<span className="text-white/30!">.</span>
						</h2>
						<div className="relative pl-6 before:absolute before:inset-y-1 before:left-0 before:w-px before:bg-linear-to-b before:from-transparent before:via-white/20 before:to-transparent">
							<p className="max-w-2xl text-base leading-relaxed font-light text-white/50">
								A selection of my recent works focusing on{" "}
								<span className="text-white/80">clean architecture</span>,
								performance, and minimalist design.
							</p>
						</div>
					</div>

					<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
						<Suspense fallback={<ProjectSkeleton />}>
							{isLoading && <ProjectSkeleton />}

							{isError && (
								<p className="text-red-400">Failed to load projects</p>
							)}

							{!isLoading &&
								!isError &&
								projects.map((project, idx) => (
									<div
										key={project._id}
										className="group relative transition-colors hover:bg-white/2"
									>
										<ProjectCard project={project} index={idx} />
									</div>
								))}
						</Suspense>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Projects;
