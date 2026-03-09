const ActivityLoader: React.FC = () => {
	return (
		<div className="mt-10 flex w-full animate-pulse flex-col items-start gap-8 md:flex-row md:items-center">
			<div className="relative size-28 shrink-0 md:size-32">
				<div className="h-full w-full rounded-2xl bg-white/5" />
			</div>

			<div className="flex w-full flex-col space-y-4 text-left">
				<div className="relative space-y-3 pl-6 before:absolute before:inset-y-1 before:left-0 before:w-px before:bg-white/10 py-1">
					<div className="h-8 w-48 rounded-lg bg-white/10 md:h-10 md:w-64" />
					<div className="h-5 w-64 rounded bg-white/5 md:w-80" />
					<div className="h-3 w-40 rounded bg-white/5 md:w-48" />
				</div>
				<div className="flex pl-6">
					<div className="h-10 w-40 rounded-full bg-white/5" />
				</div>
			</div>
		</div>
	);
};

export default ActivityLoader;
