import { Tool } from "./Tools";

const AnimatedTools = ({ tools }: { tools: Tool[] }) => {
	return (
		<div className="mx-auto mt-5 flex max-w-screen-2xl flex-wrap items-center justify-center gap-4 px-4 lg:mt-10 xl:px-36">
			{tools.map((tool) => (
				<div
					key={tool._id}
					className="grid size-20 cursor-pointer place-items-center rounded-md border border-white/[0.1] bg-[#0f132e] text-lg drop-shadow-md transition-transform duration-150 hover:scale-80"
				>
					<img
						className="aspect-auto size-11.5 object-contain"
						src={tool.image.url}
						alt={tool.name}
						onError={(e) => (e.currentTarget.src = "/fallback.svg")}
					/>
				</div>
			))}
		</div>
	);
};

export default AnimatedTools;
