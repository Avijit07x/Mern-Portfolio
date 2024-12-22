import { Outlet } from "react-router";

const AdminLayout = () => {
	return (
		<div className="h-screen bg-white text-black">
			<h1>Admin Layout</h1>
			<Outlet />
		</div>
	);
};

export default AdminLayout;
