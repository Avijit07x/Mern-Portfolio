import { cn } from "@/lib/utils";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import { ChevronDown } from "lucide-react";
import { BlurFade } from "../magicui/blur-fade";
import { GridPattern } from "../magicui/grid-pattern";
import { HyperText } from "../magicui/hyper-text";
import { InteractiveGridPattern } from "../magicui/interactive-grid-pattern";

const Hero = () => {
	const windowWidth = useWindowWidth();

	return (
		<>
			<div className="relative z-100 flex h-full w-full flex-col items-center justify-center gap-4 lg:gap-5">
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

				{windowWidth > 425 && process.env.NODE_ENV === "production" && (
					<InteractiveGridPattern
						className={cn(
							"z-111 [mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
							"lg:[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
							"inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 max-lg:-top-1/2",
						)}
					/>
				)}
				{windowWidth <= 425 && (
					<GridPattern
						squares={[
							[4, 9],
							[5, 1],
							[8, 2],
							[5, 3],
							[5, 5],
							[10, 10],
							[12, 15],
							[15, 10],
							[10, 15],
						]}
						className={cn(
							"[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
							"inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 max-xl:-top-1/2",
						)}
					/>
				)}
			</div>
		</>
	);
};

export default Hero;
