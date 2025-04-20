import { Facebook, GithubIcon, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
	return (
		<footer className="pt-10">
			<div className="mx-auto w-full max-w-screen-xl px-4 sm:px-7 md:px-12 lg:px-16 xl:px-0">
				<div className="flex flex-col items-center justify-center gap-6 py-6 sm:flex-row sm:justify-between">
					<span className="text-muted-foreground order-last block text-center text-sm md:order-first">
						© {new Date().getFullYear()} Avijit07x, All rights reserved
					</span>
					<div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
						<Link
							to="https://twitter.com/Avijit07x"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="X/Twitter"
							className="text-muted-foreground block hover:text-white"
						>
							<Twitter className="size-5" />
						</Link>
						<Link
							to="https://www.linkedin.com/in/avijit07x/"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="LinkedIn"
							className="text-muted-foreground block hover:text-white"
						>
							<Linkedin className="size-5" />
						</Link>
						<Link
							to="https://www.facebook.com/Avijit07x/"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Facebook"
							className="text-muted-foreground block hover:text-white"
						>
							<Facebook className="size-5" />
						</Link>
						<Link
							to="https://github.com/Avijit07x"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="GitHub"
							className="text-muted-foreground block hover:text-white"
						>
							<GithubIcon className="size-5" />
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
