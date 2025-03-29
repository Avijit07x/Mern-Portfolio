import Hero from "@/components/hero/Hero";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import Navbar from "@/components/navbar/Navbar";
import Tools from "@/components/tools/Tools";
import { cn } from "@/lib/utils";
import { ReactLenis } from "lenis/react";
import { useCallback, useRef } from "react";

const Home = () => {
	const aboutRef = useRef<HTMLElement>(null);

	const scrollToSection = useCallback(
		(ref: React.RefObject<HTMLElement>) => {
			ref.current.scrollIntoView({ behavior: "smooth" });
		},
		[aboutRef],
	);

	console.log("Home");

	return (
		<ReactLenis root>
			<div className="mx-auto h-full max-w-screen-2xl text-white">
				<div className="3xl:h-[700px] relative z-50 h-svh max-h-svh min-h-svh w-full overflow-hidden bg-[#01031a00]">
					<Navbar scrollToSection={scrollToSection} aboutRef={aboutRef} />
					<Hero />
					<AnimatedGridPattern
						numSquares={15}
						maxOpacity={0.1}
						duration={3}
						repeatDelay={1}
						className={cn(
							"[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
							"lg:[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
							"inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 max-lg:-top-1/2",
						)}
					/>
				</div>
				<Tools />
			</div>
		</ReactLenis>
	);
};

export default Home;
