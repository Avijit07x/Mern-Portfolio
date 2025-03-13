import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../ui/button";

const Navbar = ({ scrollToSection, aboutRef }: any) => {
	const [open, setOpen] = useState(false);
	return (
		<>
			<nav className="fixed top-0 z-[150] mx-auto flex h-14 w-full max-w-screen-2xl items-center justify-between bg-[#01031a]/30 backdrop-blur-sm backdrop-filter lg:px-8">
				<Link to="/">
					<img className="w-14 md:w-16" src="/logo.png" alt="logo" />
				</Link>
				<Button
					onClick={() => setOpen(true)}
					variant="ghost"
					className="w-14 p-0 hover:bg-transparent md:w-16 lg:hidden [&_svg]:size-6 md:[&_svg]:size-7"
				>
					<Menu className="text-white" />
					<span className="sr-only">Open menu</span>
				</Button>
				<ul className="hidden items-center justify-center lg:flex">
					<li className="mx-5 text-white">
						<button
							className="cursor-pointer"
							onClick={() => scrollToSection(aboutRef)}
						>
							About
						</button>
					</li>
					<li className="mx-5 text-white">
						<button>Projects</button>
					</li>
					<li className="mx-5 text-white">
						<button>Contact</button>
					</li>
					<li className="mx-5 text-white">
						<Link to="/resume">Resume</Link>
					</li>
				</ul>
			</nav>

			<Sheet open={open} onOpenChange={setOpen}>
				<SheetContent className="border-[#01031a] bg-[#01031a]">
					<SheetHeader>
						<SheetTitle className="hidden">Sidebar</SheetTitle>
						<SheetDescription className="hidden">
							This is a sidebar
						</SheetDescription>
					</SheetHeader>
					<ul className="mt-14 flex flex-col items-center justify-center gap-5">
						<li
							className="flex w-full items-center justify-center rounded-xl border border-[#FFFFFF20] py-2 text-white shadow-2xl"
							style={{
								backdropFilter: "blur(16px) saturate(180%)",
								backgroundColor: "rgba(17, 25, 40, 0.75)",
							}}
						>
							<button
								onClick={() => {
									scrollToSection(aboutRef);
									setOpen(false);
								}}
								className="w-full"
							>
								About
							</button>
						</li>
						<li
							className="flex w-full items-center justify-center rounded-xl border border-[#FFFFFF20] py-2 text-white shadow-2xl"
							style={{
								backdropFilter: "blur(16px) saturate(180%)",
								backgroundColor: "rgba(17, 25, 40, 0.75)",
							}}
						>
							<button
								// onClick={() => scrollToSection(projectRef)}
								className="w-full"
							>
								Projects
							</button>
						</li>
						<li
							className="flex w-full items-center justify-center rounded-xl border border-[#FFFFFF20] py-2 text-white shadow-2xl"
							style={{
								backdropFilter: "blur(16px) saturate(180%)",
								backgroundColor: "rgba(17, 25, 40, 0.75)",
							}}
						>
							Contact
						</li>
						<li
							className="flex w-full items-center justify-center rounded-xl border border-[#FFFFFF20] py-2 text-white shadow-2xl"
							style={{
								backdropFilter: "blur(16px) saturate(180%)",
								backgroundColor: "rgba(17, 25, 40, 0.75)",
							}}
						>
							<Link to="/resume">Resume</Link>
						</li>
					</ul>
				</SheetContent>
			</Sheet>
		</>
	);
};

export default Navbar;
