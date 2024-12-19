import { motion } from "framer-motion";
import { Link } from "react-router";
import EmailIcon from "../icons/EmailIcon";
import GithubIcon from "../icons/GithubIcon";
import LinkedinIcon from "../icons/LinkedinIcon";
import XIcon from "../icons/XIcon";
import BlurIn from "../ui/blur-in";
import HyperText from "../ui/hyper-text";

const Hero = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 3 } }}
			className="relative z-[100] flex w-full flex-col items-center justify-center gap-5"
		>
			<p className="text-lg uppercase lg:text-2xl">HELLO 👋, I'M</p>
			<BlurIn
				word="Avijit Dey"
				className="text-6xl font-semibold tracking-normal lg:text-8xl"
			/>
			<HyperText
				animateOnHover={false}
				className={"mt-2 p-0 text-lg md:text-2xl lg:p-2"}
			>
				Front-End Developer
			</HyperText>
			<div className="flex items-center justify-center gap-3 lg:gap-5">
				<Link to="https://github.com/Avijit07x" target="_blank">
					<div
						className="flex size-12 items-center justify-center rounded-xl border border-[#FFFFFF20] shadow-2xl"
						style={{
							backdropFilter: "blur(16px) saturate(180%)",
							backgroundColor: "rgba(17, 25, 40, 0.75)",
							opacity: "1",
							transition: "all 0.3s ease-in-out",
						}}
					>
						<GithubIcon className="text-white" />
					</div>
				</Link>
				<Link to="https://github.com/Avijit07x" target="_blank">
					<div
						className="flex size-12 items-center justify-center rounded-xl border border-[#FFFFFF20] shadow-2xl"
						style={{
							backdropFilter: "blur(16px) saturate(180%)",
							backgroundColor: "rgba(17, 25, 40, 0.75)",
						}}
					>
						<LinkedinIcon className="text-white" />
					</div>
				</Link>
				<Link to="https://github.com/Avijit07x" target="_blank">
					<div
						className="flex size-12 items-center justify-center rounded-xl border border-[#FFFFFF20] shadow-2xl"
						style={{
							backdropFilter: "blur(16px) saturate(180%)",
							backgroundColor: "rgba(17, 25, 40, 0.75)",
						}}
					>
						<XIcon className="text-white" />
					</div>
				</Link>
				<Link to="https://github.com/Avijit07x" target="_blank">
					<div
						className="flex size-12 items-center justify-center rounded-xl border border-[#FFFFFF20] shadow-2xl"
						style={{
							backdropFilter: "blur(16px) saturate(180%)",
							backgroundColor: "rgba(17, 25, 40, 0.75)",
						}}
					>
						<EmailIcon className="text-white" />
					</div>
				</Link>
			</div>
		</motion.div>
	);
};

export default Hero;
