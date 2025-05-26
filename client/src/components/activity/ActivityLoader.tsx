const ActivityLoader: React.FC = () => {
	return (
		<div className="flex w-fit justify-center gap-2.5 rounded-lg border border-white/[0.1] bg-[#0f132e] p-4 text-start text-sm font-medium text-white drop-shadow-md">
			<div className="relative size-18">
				<div className="h-full w-full animate-pulse rounded-md bg-[#1c1f3a]" />
			</div>
			<div className="space-y-2 py-1">
				<div className="h-4 w-24 animate-pulse rounded bg-[#1c1f3a]" />
				<div className="h-3 w-40 animate-pulse rounded bg-[#1c1f3a]" />
			</div>
		</div>
	);
};

export default ActivityLoader;
