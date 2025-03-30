import { ChevronDownIcon, LogOutIcon } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { logout } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const Profile = () => {
	const { user } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();
	const handleLogout = () => {
		dispatch(logout());
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="h-auto cursor-pointer p-0 select-none hover:bg-transparent"
				>
					<Avatar>
						<AvatarFallback className="bg-white text-[#8946ff] font-bold text-base">
							{user?.username?.charAt(0)}
						</AvatarFallback>
					</Avatar>
					<ChevronDownIcon
						size={16}
						className="text-white opacity-60"
						aria-hidden="true"
					/>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="max-w-64" sideOffset={10} align="end">
				<DropdownMenuLabel className="flex min-w-0 flex-col">
					<span className="text-foreground truncate text-sm font-medium">
						{user?.username}
					</span>
					<span className="text-muted-foreground truncate text-xs font-normal">
						{user?.email}
					</span>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
					<LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
					<span>Logout</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default Profile;
