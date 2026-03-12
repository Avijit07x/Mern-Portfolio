const ToolsLoader = () => {
	return (
		<div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
			{Array(30)
				.fill(0)
				.map((_, index) => (
					<div
						key={index}
						className="group flex aspect-square items-center justify-center border border-white/5 bg-white/2"
						title="Loading..."
					>
						<div className="size-8 animate-pulse rounded-sm bg-white/5" />
					</div>
				))}
		</div>
	);
};

export default ToolsLoader;
