const ActivityLoader: React.FC = () => {
	return (
		<div className="flex w-fit animate-pulse justify-center gap-2.5 rounded-lg bg-[#0f132e] p-4 text-start text-sm font-medium text-white drop-shadow-md">
			<div className="relative size-18">
				<div className="h-full w-full rounded-md bg-[#1c1f3a]" />
			</div>
			<div className="space-y-2 py-1">
				<div className="h-4 w-24 rounded bg-[#1c1f3a]" />
				<div className="h-3 w-40 rounded bg-[#1c1f3a]" />
			</div>
		</div>
	);
};

export default ActivityLoader;
