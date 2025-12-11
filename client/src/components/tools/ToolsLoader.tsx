const ToolsLoader = () => {
	return (
		<div className="mx-auto mt-5 flex max-w-screen-2xl flex-wrap items-center justify-center gap-4 lg:mt-10 xl:px-36">
			{Array(24)
				.fill(0)
				.map((_, index) => (
					<div
						key={index}
						className="grid size-20 place-items-center rounded-md border border-white/10 bg-[#0f132e5d] drop-shadow-md"
						title="Loading..."
					>
						<img
							className="size-8 object-contain opacity-80 lg:animate-pulse"
							src="/fallback.svg"
							alt="fallback"
						/>
					</div>
				))}
		</div>
	);
};

export default ToolsLoader;
