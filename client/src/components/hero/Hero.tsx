import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { BlurFade } from "../magicui/blur-fade";
import { HyperText } from "../magicui/hyper-text";
import { InteractiveGridPattern } from "../magicui/interactive-grid-pattern";

const Hero = () => {
	return (
		<>
			<div className="relative z-[100] flex h-full w-full flex-col items-center justify-center gap-4 lg:gap-5">
				<div className="relative z-112 mx-auto w-fit flex-col items-center justify-center gap-4 lg:gap-5">
					<div className="flex items-center justify-center text-lg tracking-widest uppercase lg:text-2xl">
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
							"mt-2 cursor-default p-0 text-center text-base tracking-wide md:text-2xl lg:p-2"
						}
					>
						Full Stack Developer
					</HyperText>
					<div className="flex items-center justify-center gap-2 tracking-widest">
						React | Next.js
					</div>
				</div>
				<div className="3xl:hidden absolute bottom-0 flex flex-col items-center gap-2">
					<p>Scroll Down</p>
					<div className="animate-bounce">
						<ChevronDown className="text-white" />
					</div>
				</div>

				{process.env.NODE_ENV === "production" && (
					<InteractiveGridPattern
						className={cn(
							"z-111 [mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
							"lg:[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
							"inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 max-lg:-top-1/2",
						)}
					/>
				)}
			</div>
		</>
	);
};

export default Hero;
