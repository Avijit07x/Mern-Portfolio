import Hero from "@/components/hero/Hero";
import Navbar from "@/components/navbar/Navbar";
import Tools from "@/components/tools/Tools";
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

	return (
		<>
			<ReactLenis root>
				<div className="mx-auto h-full max-w-screen-2xl text-white">
					<div className="3xl:h-[700px] relative z-50 h-svh max-h-svh min-h-svh w-full overflow-hidden bg-[#01031a00]">
						<Navbar scrollToSection={scrollToSection} aboutRef={aboutRef} />
						<Hero />
					</div>
					<Tools />
				</div>
			</ReactLenis>
		</>
	);
};

export default Home;
