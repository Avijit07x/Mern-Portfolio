import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import RefContext, { IRefContext } from "@/context/RefContext";
import { Menu } from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router";

const Navbar = () => {
	const [open, setOpen] = useState<boolean>(false);
	const { projectRef, contactRef } = useContext<IRefContext>(RefContext);

	const handleScrollToSection = (ref: string) => {
		if (open) {
			setOpen(false);
		}
		if (ref === "projectRef") {
			projectRef.current?.scrollIntoView({ behavior: "smooth" });
			return;
		}
		if (ref === "contactRef") {
			contactRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
			return;
		}
	};
	return (
		<header>
			<nav className="fixed top-0 z-150 mx-auto flex h-14 w-full max-w-screen-2xl items-center justify-between bg-[#01031a]/30 backdrop-blur-sm backdrop-filter lg:px-8">
				<Link to="/">
					<img className="w-14 md:w-16" src="/logo.webp" alt="logo" />
				</Link>
				<button
					onClick={() => setOpen(true)}
					className="pr-3 hover:bg-transparent lg:hidden"
				>
					<Menu className="text-white" />
					<span className="sr-only">Open menu</span>
				</button>
				<ul className="hidden items-center justify-center lg:flex">
					<li className="mx-5 text-white">
						<button onClick={() => handleScrollToSection("projectRef")}>
							Projects
						</button>
					</li>
					<li className="mx-5 text-white">
						<button onClick={() => handleScrollToSection("contactRef")}>
							Contact
						</button>
					</li>
					<li className="mx-5 text-white">
						<Link to="/resume">Resume</Link>
					</li>
				</ul>
			</nav>

			<Sheet open={open} onOpenChange={setOpen}>
				<SheetContent className="z-160! border-[#01031a] bg-[#01031a] px-6">
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
								onClick={() => handleScrollToSection("projectRef")}
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
							<button onClick={() => handleScrollToSection("contactRef")}>
								Contact
							</button>
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
		</header>
	);
};

export default Navbar;
