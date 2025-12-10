import Activity from "@/components/activity/Activity";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";
import Contributions from "@/components/github/Contributions";
import Hero from "@/components/hero/Hero";
import Navbar from "@/components/navbar/Navbar";
import Projects from "@/components/projects/Project";
import Tools from "@/components/tools/Tools";
import { ReactLenis } from "lenis/react";
import { motion } from "motion/react";

const Home = () => {
	const blobPositions = [
		{
			top: `${110 + Math.random() * 60}vh`,
			left: `${-10 + Math.random() * 40}vw`,
		},
		{
			top: `${140 + Math.random() * 60}vh`,
			right: `${-10 + Math.random() * 40}vw`,
		},
		{
			top: `${180 + Math.random() * 60}vh`,
			left: `${20 + Math.random() * 40}vw`,
		},
	];

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
				<div className="mx-auto h-full max-w-screen-2xl overflow-hidden text-white will-change-transform motion-reduce:transform-none">
					<div className="3xl:h-[700px] relative z-50 h-svh max-h-svh min-h-svh w-full overflow-hidden bg-[#01031a00] will-change-transform">
						<Hero />
					</div>
					<Tools />
					<Projects />
					<Contributions />
					<Activity />
					<Contact />
					<Footer />

					{blobPositions.map((pos, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, scale: 0.6 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{
								duration: 1.5,
								delay: 2,
								repeat: Infinity,
								repeatType: "reverse",
							}}
							className="absolute -z-10 h-80 w-80 rounded-full bg-[#0a0f40a9] blur-3xl"
							style={pos}
						/>
					))}
				</div>
			</ReactLenis>
		</>
	);
};

export default Home;
