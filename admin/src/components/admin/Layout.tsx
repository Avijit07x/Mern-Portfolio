import { useState } from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
	const [openSidebar, setOpenSidebar] = useState<boolean>(false);
	return (
		<div className="mx-auto flex min-h-svh w-full">
			{/* admin sidebar */}
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} />
			<div className="flex flex-1 flex-col">
				{/* admin header */}
				<Header setOpen={setOpenSidebar} />
				<main className="flex flex-1 flex-col bg-[#121214] p-4 text-white md:p-6">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default AdminLayout;
