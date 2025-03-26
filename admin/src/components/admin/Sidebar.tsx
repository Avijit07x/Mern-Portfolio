import {
	Bolt,
	ChartNoAxesCombined,
	Laptop,
	LayoutDashboard,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

interface SidebarProps {
	open: boolean;
	setOpen: any;
}

interface MenuItem {
	id: string;
	label: string;
	path: string;
	icon: any;
}

const adminSidebarMenuItems: MenuItem[] = [
	{
		id: "dashboard",
		label: "Dashboard",
		path: "/",
		icon: <LayoutDashboard className="size-5.5" />,
	},
	{
		id: "projects",
		label: "Projects",
		path: "/projects",
		icon: <Laptop className="size-5.5" />,
	},
	{
		id: "tools",
		label: "Tools",
		path: "/tools",
		icon: <Bolt className="size-5.5" />,
	},
];

const MenuItems = ({ setOpen }: any) => {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<nav className="mt-8 flex flex-col gap-3">
			{adminSidebarMenuItems.map((menuItem) => (
				<div
					key={menuItem.id}
					onClick={() => {
						navigate(menuItem.path);
						setOpen ? setOpen(false) : null;
					}}
					className={`${
						location.pathname === menuItem.path
							? "bg-[#272729] text-white"
							: "text-white"
					} flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 hover:bg-[#272729] `}
				>
					<span
						className={`${
							location.pathname === menuItem.path
								? "text-[#8946ff]"
								: "text-gray-400"
						}`}
					>
						{menuItem.icon}
					</span>
					<span className="text-sm font-medium">{menuItem.label}</span>
				</div>
			))}
		</nav>
	);
};

const Sidebar = ({ open, setOpen }: SidebarProps) => {
	const navigate = useNavigate();
	return (
		<>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetContent side="left" className="w-64 px-5 bg-[#18181a]">
					<div className="flex h-full flex-col">
						<SheetHeader className="border-b">
							<SheetTitle
								onClick={() => navigate("/")}
								className="mb-5 mt-5 flex gap-2 text-white"
							>
								<ChartNoAxesCombined size={25} className="text-[#8946ff]" />
								<span className="text-xl font-bold ">Admin Panel</span>
							</SheetTitle>
						</SheetHeader>
						<MenuItems setOpen={setOpen} />
					</div>
				</SheetContent>
			</Sheet>
			<aside className="sticky top-0 z-50 hidden h-screen w-64 select-none flex-col border-r border-r-[#1e1e20] bg-[#18181a] p-6 lg:flex">
				<div
					onClick={() => navigate("/")}
					className="flex cursor-pointer items-center gap-2 text-white"
				>
					<ChartNoAxesCombined size={25} className="text-[#8946ff]" />
					<h1 className="text-xl font-bold ">Admin Panel</h1>
				</div>
				<MenuItems setOpen={setOpen} />
			</aside>
		</>
	);
};

export default Sidebar;
