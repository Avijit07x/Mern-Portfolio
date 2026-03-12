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
			<nav className="fixed top-0 left-0 z-150 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
				<div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-8 lg:px-12">
					<div className="pointer-events-none absolute inset-y-0 left-0 hidden w-px bg-white/10 xl:block" />
					<div className="pointer-events-none absolute inset-y-0 right-0 hidden w-px bg-white/10 xl:block" />

					<div className="pointer-events-none absolute bottom-[-6.5px] left-0 z-50 hidden size-3 -translate-x-1/2 items-center justify-center xl:flex">
						<div className="size-1.5 rotate-45 border border-white/30 bg-black" />
					</div>
					<div className="pointer-events-none absolute right-0 bottom-[-6.5px] z-50 hidden size-3 translate-x-1/2 items-center justify-center xl:flex">
						<div className="size-1.5 rotate-45 border border-white/30 bg-black" />
					</div>

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
					<ul className="hidden items-center justify-center gap-8 text-[11px] font-bold tracking-widest text-white/50 uppercase lg:flex">
						<li>
							<button
								className="uppercase transition-colors hover:text-white"
								onClick={() => handleScrollToSection("projectRef")}
							>
								Projects
							</button>
						</li>
						<li>
							<button
								className="uppercase transition-colors hover:text-white"
								onClick={() => handleScrollToSection("contactRef")}
							>
								Contact
							</button>
						</li>
						<li>
							<Link
								className="transition-colors hover:text-white"
								to="https://drive.google.com/file/d/15hPPneXEVkyxVQCIgHtAmbLbliItCRCl/view?usp=sharing"
								target="_blank"
							>
								Resume
							</Link>
						</li>
					</ul>
				</div>
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
								to="https://drive.google.com/file/d/15hPPneXEVkyxVQCIgHtAmbLbliItCRCl/view?usp=sharing"
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
