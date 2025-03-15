import { AlignJustify, LogOut } from "lucide-react";
import React from "react";

import { logout } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";

const Header = ({ setOpen }: { setOpen: any }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(logout());
		localStorage.removeItem("_token");
		navigate("/");
	};

	return (
		<header className="sticky top-0 z-50 flex items-center justify-between border-b bg-background px-4 py-3">
			<button
				onClick={() => setOpen(true)}
				className="bg-transparent sm:block lg:hidden p-0"
			>
				<AlignJustify className="size-6 text-black" />
				<span className="sr-only">Toggle Menu</span>
			</button>

			<div className="flex flex-1 justify-end">
				<Button
					variant="destructive"
					className="gap-2 rounded-full text-sm"
					onClick={handleLogout}
				>
					<LogOut className="size-4" /> <span>Logout</span>
				</Button>
			</div>
		</header>
	);
};

export default Header;
