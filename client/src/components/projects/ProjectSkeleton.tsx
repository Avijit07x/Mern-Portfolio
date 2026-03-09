const ProjectSkeleton: React.FC = () => {
	return (
		<>
			{Array.from({ length: 4 }).map((_, i) => (
				<div key={i} className="group flex w-full animate-pulse flex-col gap-6">
					{/* Image Skeleton */}
					<div className="relative aspect-video w-full overflow-hidden bg-white/5" />

					{/* Content Skeleton */}
					<div className="flex w-full flex-col justify-between">
						<div className="flex w-full items-start justify-between gap-4">
							<div className="flex flex-col gap-3">
								<div className="h-6 w-32 rounded bg-white/10" />
								<div className="flex gap-2">
									<div className="h-4 w-16 rounded bg-white/5" />
									<div className="h-4 w-16 rounded bg-white/5" />
									<div className="h-4 w-16 rounded bg-white/5" />
								</div>
							</div>

							<div className="flex shrink-0 items-center justify-end gap-5">
								<div className="size-5 rounded-full bg-white/10" />
								<div className="size-5 rounded-full bg-white/10" />
							</div>
						</div>

						<div className="mt-5 space-y-2">
							<div className="h-4 w-full rounded bg-white/5" />
							<div className="h-4 w-4/5 rounded bg-white/5" />
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default ProjectSkeleton;
