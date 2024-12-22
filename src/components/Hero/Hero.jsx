import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { memo } from "react";
import { Link } from "react-router";
import EmailIcon from "../icons/EmailIcon";
import GithubIcon from "../icons/GithubIcon";
import LinkedinIcon from "../icons/LinkedinIcon";
import XIcon from "../icons/XIcon";
import BlurIn from "../ui/blur-in";
import HyperText from "../ui/hyper-text";

const Hero = () => {
	console.log("hero");
	return (
		<div className="relative z-[100] flex h-full w-full flex-col items-center justify-center gap-4 lg:gap-5">
			<div className="text-lg uppercase tracking-widest lg:text-2xl">
				<span>HELLO</span>{" "}
				<span className="animate-bounce text-red-600">👋</span>
				<span>, I'M</span>
			</div>
			<BlurIn
				word="Avijit Dey"
				className="text-6xl font-semibold tracking-normal lg:text-8xl"
			/>
			<HyperText
				animateOnHover={false}
				className={"mt-2 p-0 text-base tracking-wide md:text-2xl lg:p-2"}
			>
				Front-End Developer
			</HyperText>
			<motion.div
				className="flex items-center justify-center gap-3 lg:gap-5"
				initial="hidden"
				animate="visible"
				variants={{
					hidden: { opacity: 0, y: 20 },
					visible: {
						opacity: 1,
						y: 0,
						transition: {
							staggerChildren: 0.2,
						},
					},
				}}
			>
				{[
					{
						href: "https://github.com/Avijit07x",
						icon: <GithubIcon className="text-white" />,
					},
					{
						href: "https://linkedin.com/in/avijit07x",
						icon: <LinkedinIcon className="text-white" />,
					},
					{
						href: "https://twitter.com/Avijit07x",
						icon: <XIcon className="text-white" />,
					},
					{
						href: "mailto:avijit@example.com",
						icon: <EmailIcon className="text-white" />,
					},
				].map((item, index) => (
					<motion.div
						key={index}
						variants={{
							hidden: { opacity: 0, y: 20 },
							visible: { opacity: 1, y: 0 },
						}}
						transition={{ duration: 0.5, ease: "easeInOut" }}
					>
						<Link to={item.href} target="_blank">
							<div
								className="flex size-12 items-center justify-center rounded-xl border border-[#FFFFFF20] shadow-2xl"
								style={{
									backdropFilter: "blur(16px) saturate(180%)",
									backgroundColor: "rgba(17, 25, 40, 0.75)",
								}}
							>
								{item.icon}
							</div>
						</Link>
					</motion.div>
				))}
			</motion.div>
			<div className="absolute bottom-0 flex flex-col items-center gap-2 3xl:hidden">
				<p>Scroll Down</p>
				<div className="animate-bounce">
					<ChevronDown className="text-white" />
				</div>
			</div>
		</div>
	);
};

export default memo(Hero);
