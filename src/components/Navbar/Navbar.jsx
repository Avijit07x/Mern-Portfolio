import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../ui/button";

const Navbar = () => {
	const [open, setOpen] = useState(false);
	return (
		<>
			<motion.nav
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { duration: 3 } }}
				className="fixed top-0 z-[150] mx-auto flex h-14 w-full max-w-screen-2xl items-center justify-between bg-[#01031a]/30 backdrop-blur-sm backdrop-filter lg:px-8"
			>
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
					<li className="mx-5 text-white">Home</li>
					<li className="mx-5 text-white">About</li>
					<li className="mx-5 text-white">Services</li>
					<li className="mx-5 text-white">Contact</li>
				</ul>
			</motion.nav>

			<Sheet open={open} onOpenChange={setOpen}>
				<SheetContent className="border-[#01031a] bg-[#01031a]">
					<SheetHeader>
						<SheetTitle>Are you absolutely sure?</SheetTitle>
						<SheetDescription>
							This action cannot be undone. This will permanently delete your
							account and remove your data from our servers.
						</SheetDescription>
					</SheetHeader>
				</SheetContent>
			</Sheet>
		</>
	);
};

export default Navbar;
