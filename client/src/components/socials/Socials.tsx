import { Link } from "react-router";
import { FacebookIcon } from "../ui/FacebookIcon";
import { GithubIcon } from "../ui/GithubIcon";
import { LinkedInIcon } from "../ui/LinkedinIcon";
import { TwitterIcon } from "../ui/TwitterIcon";

const Socials: React.FC = () => {
	return (
		<div className="order-first flex flex-wrap items-center justify-center gap-6 text-sm md:order-last">
			<Link
				to="https://twitter.com/Avijit07x"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="X/Twitter"
				className="flex items-center justify-center text-white/50 transition-colors hover:text-white"
			>
				<TwitterIcon size={17} />
			</Link>
			<Link
				to="https://www.linkedin.com/in/avijit07x/"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="LinkedIn"
				className="flex items-center justify-center text-white/50 transition-colors hover:text-white"
			>
				<LinkedInIcon size={18} duration={0.7} />
			</Link>
			<Link
				to="https://www.facebook.com/Avijit07x/"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Facebook"
				className="flex items-center justify-center text-white/50 transition-colors hover:text-white"
			>
				<FacebookIcon size={18} duration={0.7} />
			</Link>
			<Link
				to="https://github.com/Avijit07x"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="GitHub"
				className="flex items-center justify-center text-white/50 transition-colors hover:text-white"
			>
				<GithubIcon size={18} />
			</Link>
		</div>
	);
};

export default Socials;
