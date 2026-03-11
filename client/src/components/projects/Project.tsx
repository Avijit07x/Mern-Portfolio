import RefContext, { IRefContext } from "@/context/RefContext";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import React, { lazy, Suspense, useContext, useState } from "react";
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
	const [isExpanded, setIsExpanded] = useState(false);
	const displayedProjects = isExpanded ? projects : projects.slice(0, 2);

	return (
		<section
			id="projects"
			ref={projectRef}
			className="relative z-10 border-t border-white/10 py-24 text-white"
		>
			{/* Diamonds */}
			<div className="pointer-events-none absolute top-0 left-1/2 z-50 hidden w-full max-w-7xl -translate-x-1/2 xl:flex">
				<div className="absolute top-0 left-0 flex size-3 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
					<div className="size-1.5 rotate-45 border border-white/30 bg-black" />
				</div>
				<div className="absolute top-0 right-0 flex size-3 translate-x-1/2 -translate-y-1/2 items-center justify-center">
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
				<div className="pointer-events-none absolute top-1/2 -left-10 -translate-y-1/2 text-[20vw] font-black tracking-tighter text-white/1 uppercase select-none">
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

							<AnimatePresence mode="popLayout">
								{!isLoading &&
									!isError &&
									displayedProjects.map((project, idx) => (
										<motion.div
											layout
											key={project._id}
											initial={{ opacity: 0, y: 30, scale: 0.98 }}
											animate={{ opacity: 1, y: 0, scale: 1 }}
											exit={{
												opacity: 0,
												scale: 0.98,
												transition: { duration: 0.2 },
											}}
											transition={{
												type: "spring",
												stiffness: 150,
												damping: 25,
												mass: 1,
												delay: isExpanded && idx >= 2 ? (idx - 2) * 0.1 : 0,
											}}
											className="group relative transition-colors hover:bg-white/2"
										>
											<ProjectCard project={project} index={idx} />
										</motion.div>
									))}
							</AnimatePresence>
						</Suspense>
					</div>

					{/* Data Connector Node Expansion Control */}
					{!isLoading && !isError && projects.length > 2 && (
						<motion.div layout className="mt-24 flex flex-col items-center">
							<button
								onClick={() => setIsExpanded(!isExpanded)}
								className="group relative flex flex-col items-center"
							>
								<div className="relative flex h-12 items-center justify-center border border-white/20 bg-black px-10 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:border-white/40">
									<div className="relative z-10 flex items-center gap-4 overflow-hidden">
										<span className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase transition-colors group-hover:text-white/80">
											{isExpanded ? "COLLAPSE_SESSION" : "ACCESS_ARCHIVE"}
										</span>
									</div>
								</div>

								<div className="mt-4 flex flex-col items-center">
									<div className="h-4 w-px bg-white/10" />
									<motion.div
										animate={{
											y: [0, 6, 0],
											rotate: isExpanded ? 180 : 0,
										}}
										transition={{
											y: {
												duration: 2,
												repeat: Infinity,
												ease: "easeInOut",
											},
											rotate: {
												duration: 0.5,
												ease: "easeInOut",
											},
										}}
										className="mt-2 text-white/20 transition-colors group-hover:text-white/40"
									>
										<svg
											width="16"
											height="10"
											viewBox="0 0 16 10"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M2 2L8 8L14 2"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="square"
											/>
										</svg>
									</motion.div>
								</div>
							</button>
						</motion.div>
					)}
				</div>
			</div>
		</section>
	);
};

export default Projects;
