import { useGSAP } from "@gsap/react";
import axios from "axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

type Tool = {
	_id: string;
	name: string;
	image: {
		url: string;
		public_id: string;
	};
	public_id: string;
	__v: number;
};

const Tools = () => {
	const [tools, setTools] = useState<Tool[]>([]);
	const containerRef = useRef<HTMLDivElement>(null);
	const itemsRef = useRef<HTMLDivElement[]>([]);

	useEffect(() => {
		const fetchTools = async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_SERVER_URL}admin/tool/get-tools`,
				);
				setTools(response.data.tools);
			} catch (error) {
				console.error("Error fetching tools:", error);
			}
		};
		fetchTools();
	}, []);

	useGSAP(() => {
		if (tools.length === 0) return;

		gsap.set(itemsRef.current, { opacity: 0, scale: 0.7 });

		gsap.to(itemsRef.current, {
			opacity: 1,
			scale: 1,
			stagger: 0.041,
			duration: 0.5,
			ease: "power2.out",
			scrollTrigger: {
				trigger: containerRef.current,
				start: "top 80%",
			},
		});
	}, [tools]);

	return (
		<div className="min-h-[1400px] py-10">
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

			{/* Parent Container */}
			<div
				ref={containerRef}
				className="mx-auto mt-5 flex max-w-screen-2xl flex-wrap items-center justify-center gap-4 lg:mt-10 xl:px-36"
			>
				{tools.map((tool, index) => (
					<div
						key={tool._id}
						ref={(el) => {
							if (el) itemsRef.current[index] = el;
						}}
						className="grid size-20 cursor-pointer place-items-center rounded-md border border-white/[0.1] bg-[#0f132e] text-lg drop-shadow-md"
						title={tool.name}
						onMouseEnter={() =>
							gsap.to(itemsRef.current[index], { scale: 0.7, duration: 0.2 })
						}
						onMouseLeave={() =>
							gsap.to(itemsRef.current[index], { scale: 1, duration: 0.2 })
						}
					>
						<img
							className="aspect-auto size-11.5 object-contain"
							src={tool.image.url}
							alt={tool.name}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Tools;
