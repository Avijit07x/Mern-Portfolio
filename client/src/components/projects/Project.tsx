import api from "@/lib/api";
import { motion } from "motion/react";
import React, { lazy, Suspense, useEffect, useState } from "react";
import ProjectSkeleton from "./ProjectSkeleton";

const ProjectCard = lazy(() => import("./ProjectCard"));

const container = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { staggerChildren: 0.2 },
	},
};

const item = {
	hidden: { opacity: 0, y: 30 },
	show: { opacity: 1, y: 0 },
};

const Projects: React.FC = () => {
	const [projects, setProjects] = useState<IProject[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const res = await api("admin/project/get-projects");
				const data = res.data.projects;
				setProjects(data);
			} catch (error) {
				console.error("Failed to fetch projects:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchProjects();
	}, []);

	return (
		<section id="projects" className="px-6 py-10 text-white">
			<motion.div
				variants={container}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, amount: 0.2 }}
				className="mx-auto max-w-6xl"
			>
				<div className="mx-auto mb-10 flex flex-col items-center justify-center text-center md:w-[70%]">
					<motion.h2
						variants={item}
						className="mb-5 text-center text-2xl font-semibold lg:text-3xl"
					>
						My Projects
					</motion.h2>
					<p>
						Each of these projects highlights a unique aspect of what I can do,
						from problem-solving to creative design. I am always eager to take
						on new challenges and expand my horizons.
					</p>
				</div>

				<div className="flex flex-wrap items-center justify-center gap-8">
					<Suspense fallback={<ProjectSkeleton />}>
						{loading ? (
							<ProjectSkeleton />
						) : (
							projects.map((project) => (
								<ProjectCard project={project} key={project._id} />
							))
						)}
					</Suspense>
				</div>
			</motion.div>
		</section>
	);
};

export default Projects;
