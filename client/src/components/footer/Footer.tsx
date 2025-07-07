import Socials from "../socials/Socials";

const Footer = () => {
	return (
		<footer className="pt-10">
			<div className="mx-auto w-full max-w-screen-xl px-4 sm:px-7 md:px-12 lg:px-16 xl:px-0">
				<div className="flex flex-col items-center justify-center gap-6 py-6 sm:flex-row sm:justify-between">
					<span className="text-muted-foreground order-last block text-center text-sm md:order-first">
						Made with ❤ by Avijit Dey
					</span>
					<Socials />
				</div>
			</div>
		</footer>
	);
};

export default Footer;
