import About from "@/components/About/About";
import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { useCallback, useRef } from "react";

const Home = () => {
	const aboutRef = useRef(null);
	const scrollToSection = useCallback((ref) => {
		ref.current.scrollIntoView({ behavior: "smooth" });
	});
	return (
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
						"inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 max-lg:-top-1/2",
					)}
				/>
			</div>
			<About aboutRef={aboutRef} />
		</div>
	);
};

export default Home;
