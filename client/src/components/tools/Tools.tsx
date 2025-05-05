import { useWindowWidth } from "@react-hook/window-size";
import axios from "axios";

import { useEffect, useState } from "react";
import AnimatedTools from "./AnimatedTools";
import ToolsLoader from "./ToolsLoader";

export type Tool = {
	_id: string;
	name: string;
	image: { url: string; public_id: string };
	public_id: string;
};

const Tools = () => {
	const [tools, setTools] = useState<Tool[]>([]);
	const [loading, setLoading] = useState(true);
	const windowWidth = useWindowWidth();

	const fetchTools = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_SERVER_URL}admin/tool/get-tools`,
			);
			const data = response.data.tools;
			setTools(data);
		} catch (error) {
			console.error("Error fetching tools:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTools();
	}, []);

	return (
		<div className="min-h-[400px] py-10">
			<div className="flex w-full flex-col items-center gap-5 overflow-hidden">
				<div className="px-3 text-center lg:w-1/2">
					<h2 className="w-full text-center text-2xl font-semibold lg:text-3xl">
						<span className="text-primary"></span>Languages &amp; Tools
						<span className="text-primary"></span>
					</h2>
					<p className="mt-5 text-sm text-gray-200">
						I possess a strong command of various programming languages and
						tools, coupled with a continuous drive to stay ahead of industry
						trends. My current focus lies in advancing my backend development
						skills and exploring emerging frameworks to build scalable,
						high-performance solutions.
					</p>
				</div>
			</div>

			{loading ? (
				<ToolsLoader />
			) : (
				<>
					{windowWidth >= 1280 ? (
						<AnimatedTools tools={tools} />
					) : (
						<div className="mx-auto mt-5 flex max-w-screen-2xl flex-wrap items-center justify-center gap-4 px-3 sm:px-10 lg:mt-10 xl:px-36">
							{tools.map((tool) => (
								<div
									key={tool._id}
									className="grid size-20 place-items-center rounded-md border border-white/[0.1] bg-[#0f132e] text-lg drop-shadow-md"
									title={tool.name}
								>
									<img
										className="aspect-auto size-11.5 object-contain"
										src={tool.image.url}
										alt={tool.name}
									/>
								</div>
							))}
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default Tools;
