import About from "@/components/about/About";
import Hero from "@/components/hero/Hero";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import Navbar from "@/components/navbar/Navbar";
import { cn } from "@/lib/utils";
import { ReactLenis } from "lenis/react";
import { useCallback, useRef } from "react";

const Home = () => {
	const aboutRef = useRef(null);
	const scrollToSection = useCallback((ref: any) => {
		ref.current.scrollIntoView({ behavior: "smooth" });
	}, []);
	return (
		<ReactLenis root>
			<div className="mx-auto h-full max-w-screen-2xl text-white">
				<div className="relative z-50 h-svh max-h-svh min-h-svh w-full overflow-hidden bg-[#01031a00] 3xl:h-[700px]">
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
							"inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 max-lg:-top-1/2"
						)}
					/>
				</div>
				<About aboutRef={aboutRef} />
			</div>
		</ReactLenis>
	);
};

export default Home;
