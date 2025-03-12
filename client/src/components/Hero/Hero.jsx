import { ChevronDown } from "lucide-react";
import { memo } from "react";
import BlurIn from "../ui/blur-in";
import HyperText from "../ui/hyper-text";

const Hero = () => {

	return (
		<div className="relative z-[100] flex h-full w-full flex-col items-center justify-center gap-4 lg:gap-5">
			<div className="text-lg uppercase tracking-widest lg:text-2xl flex justify-center items-center">
				<span>HELLO</span><span>👋</span>
				<span>, I'M</span>
			</div>
			<BlurIn
				word="Avijit Dey"
				className="text-6xl font-semibold tracking-normal lg:text-8xl"
			/>
			<HyperText
				animateOnHover={true}
				className={
					"mt-2 cursor-default p-0 text-base tracking-wide md:text-2xl lg:p-2"
				}
			>
				Front-End Developer
			</HyperText>
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
