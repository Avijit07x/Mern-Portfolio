import axios from "axios";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

type Tool = {
	_id: string;
	name: string;
	image: { url: string; public_id: string };
};

const Tools = () => {
	const [tools, setTools] = useState<Tool[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
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
		fetchTools();
	}, []);

	return (
		<div className="py-10">
			<div className="flex w-full flex-col items-center gap-5 overflow-hidden">
				<div className="px-3 text-center lg:w-1/2">
					<h2 className="w-full text-center text-2xl font-semibold lg:text-3xl">
						<span className="text-primary"></span>Languages &amp; Tools
						<span className="text-primary"></span>
					</h2>
					<p className="mt-5 text-sm">
						I am skilled in various languages and tools and have a strong drive
						to learn new technologies and stay updated with the latest industry
						trends. Currently, my focus is on deepening my expertise in backend
						development, exploring new frameworks and technologies to enhance my
						capabilities.
					</p>
				</div>
			</div>

			{loading ? (
				<div className="flex items-center justify-center gap-2 py-20 text-white">
					<Loader className="size-4 animate-spin" /> Loading...
				</div>
			) : (
				<>
					<div className="mx-auto mt-5 flex max-w-screen-2xl flex-wrap items-center justify-center gap-4 lg:mt-10 xl:px-36">
						{tools.map((tool) => (
							<div
								key={tool._id}
								className="grid size-18 cursor-pointer place-items-center rounded-md border border-white/[0.1] bg-[#0f132e] text-lg drop-shadow-md will-change-transform lg:size-20"
								title={tool.name}
							>
								<img
									className="aspect-auto size-9 object-contain lg:size-11.5"
									src={tool.image.url}
									alt={tool.name}
									loading="lazy"
								/>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default Tools;
