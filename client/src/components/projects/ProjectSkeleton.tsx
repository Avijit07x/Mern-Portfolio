const ProjectSkeleton: React.FC = () => {
	return (
		<>
			{Array.from({ length: 2 }).map((_, i) => (
				<div
					key={i}
					className="flex w-full max-w-3xl animate-pulse flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f132e5d] shadow-lg md:flex-row-reverse"
				>
					{/* Image Skeleton */}
					<div className="h-52 w-full bg-gray-700/30 md:h-auto md:w-[45%] lg:h-60" />

					{/* Content Skeleton */}
					<div className="flex w-full flex-col justify-between p-6 md:w-[55%]">
						<div>
							<div className="mb-2 h-5 w-2/3 rounded bg-gray-600/30" />
							<div className="mb-2 h-4 w-full rounded bg-gray-700/30" />
							<div className="mb-2 h-4 w-5/6 rounded bg-gray-700/30" />
							<div className="mb-4 h-4 w-4/6 rounded bg-gray-700/30" />

							{/* Tools Tags Skeleton */}
							<div className="mb-4 flex flex-wrap gap-2">
								{Array(3)
									.fill(0)
									.map((_, i) => (
										<span
											key={i}
											className="h-5 w-14 rounded-full bg-indigo-500/10"
										/>
									))}
							</div>
						</div>

						{/* Links Skeleton */}
						<div className="mt-2 flex items-center gap-4">
							<div className="h-4 w-16 rounded bg-indigo-400/20" />
							<div className="h-4 w-16 rounded bg-gray-500/20" />
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default ProjectSkeleton;
