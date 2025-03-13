import { ChevronDown } from "lucide-react";
import { BlurFade } from "../magicui/blur-fade";
import { HyperText } from "../magicui/hyper-text";
import { Separator } from "../ui/separator";

const Hero = () => {
	return (
		<div className="relative z-[100] flex h-full w-full flex-col items-center justify-center gap-4 lg:gap-5">
			<div className="flex items-center justify-center text-lg uppercase tracking-widest lg:text-2xl">
				<span>HELLO</span>
				<span>👋</span>
				<span>, I'M</span>
			</div>
			<BlurFade className="text-6xl font-semibold tracking-normal lg:text-8xl">
				Avijit Dey
			</BlurFade>
			<HyperText
				animateOnHover={true}
				className={
					"mt-2 cursor-default p-0 text-base tracking-wide md:text-2xl lg:p-2"
				}
			>
				Front-End Developer
			</HyperText>
			<div className="flex items-center justify-center gap-2 tracking-widest">
				React <Separator orientation="vertical" /> Next.js
			</div>
			<div className="absolute bottom-0 flex flex-col items-center gap-2 3xl:hidden">
				<p>Scroll Down</p>
				<div className="animate-bounce">
					<ChevronDown className="text-white" />
				</div>
			</div>
		</div>
	);
};

export default Hero;
