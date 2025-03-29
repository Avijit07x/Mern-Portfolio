import { AlignJustify } from "lucide-react";

import Profile from "./Profile";

const Header = ({ setOpen }: { setOpen: any }) => {
	return (
		<header className="sticky top-0 z-50 flex items-center justify-between border-b border-b-[#1e1e20] bg-[#121214] px-4 py-3">
			<button
				onClick={() => setOpen(true)}
				className="bg-transparent p-0 sm:block lg:hidden"
			>
				<AlignJustify className="size-6 text-white" />
				<span className="sr-only">Toggle Menu</span>
			</button>

			<div className="flex flex-1 justify-end">
				<Profile />
			</div>
		</header>
	);
};

export default Header;
