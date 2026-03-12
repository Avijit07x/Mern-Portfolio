import Activity from "@/components/activity/Activity";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";
import Contributions from "@/components/github/Contributions";
import Hero from "@/components/hero/Hero";
import Navbar from "@/components/navbar/Navbar";
import Projects from "@/components/projects/Project";
import Tools from "@/components/tools/Tools";
import { ReactLenis } from "lenis/react";

const Home = () => {
	return (
		<>
			<ReactLenis
				root
				options={{
					lerp: 0.05,
					duration: 1.5,
					wheelMultiplier: 1,
					touchMultiplier: 1.2,
					smoothWheel: true,
				}}
			>
				<Navbar />
				<div className="relative mx-auto h-full w-full overflow-x-hidden bg-black text-white selection:bg-white/20">
					<div className="pointer-events-none absolute inset-x-0 inset-y-0 z-0 mx-auto hidden max-w-7xl border-x border-white/10 xl:block" />

					<div className="flex h-svh max-h-svh min-h-svh w-full items-center justify-center">
						<Hero />
					</div>
					<Tools />
					<Projects />
					<Contributions />
					<Activity />
					<Contact />
					<Footer />
				</div>
			</ReactLenis>
		</>
	);
};

export default Home;
