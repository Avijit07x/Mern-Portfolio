import { ChevronDown } from "lucide-react";
import { memo } from "react";

import BlurIn from "../ui/blur-in";
import HyperText from "../ui/hyper-text";
import Social from "./Social";

const Hero = () => {
	console.log("hero");
	return (
		<div className="relative z-[100] flex h-full w-full flex-col items-center justify-center gap-4 lg:gap-5">
			<div className="text-lg uppercase tracking-widest lg:text-2xl">
				<span>HELLO</span>{" "}
				<span className="animate-bounce text-red-600">👋</span>
				<span>, I'M</span>
			</div>
			<BlurIn
				word="Avijit Dey"
				className="text-6xl font-semibold tracking-normal lg:text-8xl"
			/>
			<HyperText
				animateOnHover={false}
				className={"mt-2 p-0 text-base tracking-wide md:text-2xl lg:p-2"}
			>
				Front-End Developer
			</HyperText>
			<Social />
			<div className="absolute bottom-0 flex flex-col items-center gap-2 3xl:hidden">
				<p>Scroll Down</p>
				<div className="animate-bounce">
					<ChevronDown className="text-white" />
				</div>
			</div>
		</div>
	);
};

export default memo(Hero);
