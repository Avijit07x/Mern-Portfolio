import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import RefContext, { IRefContext } from "@/context/RefContext";
import { Menu, Plus } from "lucide-react";
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
			<nav className="fixed top-0 left-1/2 z-150 mx-auto flex h-16 w-full max-w-screen-2xl -translate-x-1/2 items-center justify-between border-b border-white/10 bg-black/80 px-8 backdrop-blur-md lg:px-20">
				{/* Decorative vertical lines to match Home layout */}
				<div className="pointer-events-none absolute inset-y-0 left-6 w-px bg-white/10 lg:left-12" />
				<div className="pointer-events-none absolute inset-y-0 right-6 w-px bg-white/10 lg:right-12" />

				{/* Intersections (Plus icons) */}
				<Plus
					strokeWidth={1}
					className="pointer-events-none absolute -bottom-2.5 left-6 size-5 -translate-x-1/2 text-white/40 lg:left-12"
				/>
				<Plus
					strokeWidth={1}
					className="pointer-events-none absolute -bottom-2.5 right-6 size-5 translate-x-1/2 text-white/40 lg:right-12"
				/>

				<Link to="/" className="flex items-center gap-2">
					<img
						src="/logo.webp"
						alt="Logo"
						className="h-14 w-auto transition-opacity hover:opacity-80"
					/>
				</Link>
				<button
					onClick={() => setOpen(true)}
					className="text-white/70 transition-colors hover:text-white lg:hidden"
				>
					<Menu className="size-6" />
					<span className="sr-only">Open menu</span>
				</button>
				<ul className="hidden items-center justify-center gap-8 text-sm font-medium text-white/70 lg:flex">
					<li>
						<button
							className="transition-colors hover:text-white"
							onClick={() => handleScrollToSection("projectRef")}
						>
							Projects
						</button>
					</li>
					<li>
						<button
							className="transition-colors hover:text-white"
							onClick={() => handleScrollToSection("contactRef")}
						>
							Contact
						</button>
					</li>
					<li>
						<Link
							className="transition-colors hover:text-white"
							to="https://drive.google.com/file/d/1QnNdukpCDByhncBodr4AHpMw45Gi0q6i/view?usp=drive_link"
							target="_blank"
						>
							Resume
						</Link>
					</li>
				</ul>
			</nav>

			<Sheet open={open} onOpenChange={setOpen}>
				<SheetContent className="z-160! border-white/10 bg-black px-6">
					<SheetHeader>
						<SheetTitle className="hidden">Sidebar</SheetTitle>
						<SheetDescription className="hidden">
							This is a sidebar
						</SheetDescription>
					</SheetHeader>
					<ul className="mt-20 flex flex-col items-start gap-8 text-2xl font-medium text-white/70">
						<li>
							<button
								className="transition-colors hover:text-white"
								onClick={() => handleScrollToSection("projectRef")}
							>
								Projects
							</button>
						</li>
						<li>
							<button
								className="transition-colors hover:text-white"
								onClick={() => handleScrollToSection("contactRef")}
							>
								Contact
							</button>
						</li>
						<li>
							<Link
								className="transition-colors hover:text-white"
								to="https://drive.google.com/file/d/1QnNdukpCDByhncBodr4AHpMw45Gi0q6i/view?usp=drive_link"
								target="_blank"
							>
								Resume
							</Link>
						</li>
					</ul>
				</SheetContent>
			</Sheet>
		</header>
	);
};

export default Navbar;
