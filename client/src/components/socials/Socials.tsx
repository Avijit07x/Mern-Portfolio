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
				className="text-muted-foreground flex items-center justify-center hover:text-white"
			>
				<TwitterIcon size={18} />
			</Link>
			<Link
				to="https://www.linkedin.com/in/avijit07x/"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="LinkedIn"
				className="text-muted-foreground flex items-center justify-center hover:text-white"
			>
				<LinkedInIcon size={18} />
			</Link>
			<Link
				to="https://www.facebook.com/Avijit07x/"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Facebook"
				className="text-muted-foreground flex items-center justify-center hover:text-white"
			>
				<FacebookIcon size={18} />
			</Link>
			<Link
				to="https://github.com/Avijit07x"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="GitHub"
				className="text-muted-foreground flex items-center justify-center hover:text-white"
			>
				<GithubIcon size={18} />
			</Link>
		</div>
	);
};

export default Socials;
