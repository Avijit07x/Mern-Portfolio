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
				<div className="mx-auto h-full max-w-screen-2xl overflow-x-hidden bg-black text-white selection:bg-white/20 relative">
					{/* Decorative vertical lines */}
					<div className="pointer-events-none absolute inset-y-0 left-6 z-0 w-px -translate-x-1/2 bg-white/10 lg:left-12" />
					<div className="pointer-events-none absolute inset-y-0 right-6 z-0 w-px translate-x-1/2 bg-white/10 lg:right-12" />
					<div className="min-h-svh w-full max-h-svh h-svh flex items-center justify-center">
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
