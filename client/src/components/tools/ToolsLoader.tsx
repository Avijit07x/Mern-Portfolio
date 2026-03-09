const ToolsLoader = () => {
	return (
		<div className="mx-auto mt-5 grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8 lg:mt-10 lg:grid-cols-10">
			{Array(24)
				.fill(0)
				.map((_, index) => (
					<div
						key={index}
						className="group flex aspect-square items-center justify-center border border-white/10 bg-white/5"
						title="Loading..."
					>
						<div className="size-8 animate-pulse rounded-sm bg-white/10" />
					</div>
				))}
		</div>
	);
};

export default ToolsLoader;
