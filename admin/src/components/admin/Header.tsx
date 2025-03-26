import { AlignJustify, LogOut } from "lucide-react";

import { logout } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { Button } from "../ui/button";

const Header = ({ setOpen }: { setOpen: any }) => {
	const dispatch = useAppDispatch();
	const handleLogout = () => {
		dispatch(logout());
	};

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
				<Button
					className="gap-2 rounded-full bg-[#ff2056]/70 text-sm hover:bg-[#ff2056]/50"
					onClick={handleLogout}
				>
					<LogOut className="size-4" /> <span>Logout</span>
				</Button>
			</div>
		</header>
	);
};

export default Header;
