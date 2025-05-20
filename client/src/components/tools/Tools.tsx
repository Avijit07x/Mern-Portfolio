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

			{loading ? <ToolsLoader /> : <AnimatedTools tools={tools} />}
		</div>
	);
};

export default Tools;
