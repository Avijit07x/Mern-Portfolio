import Activity from "@/components/activity/Activity";
// import Contact from "@/components/contact/Contact";
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
			<ReactLenis root>
				<div className="relative mx-auto h-full max-w-screen-2xl overflow-hidden text-white">
					<div className="3xl:h-[700px] relative z-50 h-svh max-h-svh min-h-svh w-full overflow-hidden bg-[#01031a00]">
						<Navbar />
						<Hero />
					</div>
					<Tools />
					<Projects />
					<Contributions />
					<Activity />
					{/* <Contact /> */}
					<Footer />
					<img
						className="absolute inset-x-0 -bottom-150 -z-10 w-full"
						src="/footer-grid.svg"
						alt="footer-grid"
					/>
				</div>
			</ReactLenis>
		</>
	);
};

export default Home;
