import { motion } from "framer-motion";
import { memo } from "react";
import { Link } from "react-router";
import EmailIcon from "../icons/EmailIcon";
import GithubIcon from "../icons/GithubIcon";
import LinkedinIcon from "../icons/LinkedinIcon";
import XIcon from "../icons/XIcon";

const Social = () => {
	const socialLinks = [
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
			href: "mailto:deyavijit134@gmail.com",
			icon: <EmailIcon className="text-white" />,
		},
	];
	return (
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
			{socialLinks.map((item, index) => (
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
	);
};

export default memo(Social);
