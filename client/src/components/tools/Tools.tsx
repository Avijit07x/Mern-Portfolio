import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import ToolsLoader from "./ToolsLoader";

const AnimatedTools = lazy(() => import("./AnimatedTools"));

const fetchTools = async (): Promise<ITool[]> => {
	const response = await api.get("admin/tool/get-tools");
	return response.data.tools;
};

const Tools = () => {
	const {
		data: tools = [],
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["tools"],
		queryFn: fetchTools,
	});

	return (
		<section className="relative z-10 overflow-hidden border-t border-white/10 px-8 py-24 text-white lg:px-20">
			{/* Technical Cross Pattern Background */}
			<div
				className="absolute inset-x-0 top-0 z-0 h-1/2 opacity-[0.08]"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19 19H0V21H19V40H21V21H40V19H21V0H19V19Z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
					backgroundSize: "40px 40px",
					maskImage:
						"radial-gradient(circle at 50% 0%, black, transparent 100%)",
					WebkitMaskImage:
						"radial-gradient(circle at 50% 0%, black, transparent 100%)",
				}}
			/>

			{/* Suble Background Watermark */}
			<div className="pointer-events-none absolute top-1/2 -right-10 -translate-y-1/2 text-[20vw] font-black tracking-tighter text-white/1 uppercase select-none">
				Stack
			</div>

			<div className="relative z-10 mx-auto w-full">
				<div className="mb-20 space-y-4">
					<h2 className="bg-clip-text text-4xl font-bold tracking-tighter text-white md:text-5xl lg:text-7xl">
						Stack<span className="text-white/30">.</span>
					</h2>
					<div className="relative pl-6 before:absolute before:inset-y-1 before:left-0 before:w-px before:bg-linear-to-b before:from-transparent before:via-white/20 before:to-transparent">
						<p className="max-w-2xl text-lg leading-relaxed font-light text-white/50 md:text-xl">
							The technologies and tools I prefer to work with. I focus on{" "}
							<span className="text-white/80">modern web development</span>,
							type safety, and{" "}
							<span className="text-white/80">scalable architectures</span>.
						</p>
					</div>
				</div>

				{isLoading && <ToolsLoader />}

				{isError && <p className="mt-6 text-red-400">Failed to load tools</p>}

				{!isLoading && !isError && (
					<Suspense fallback={<ToolsLoader />}>
						<AnimatedTools tools={tools} />
					</Suspense>
				)}
			</div>
		</section>
	);
};

export default Tools;
