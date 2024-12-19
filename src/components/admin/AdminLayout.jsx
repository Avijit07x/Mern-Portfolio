import { Outlet } from "react-router";

const AdminLayout = () => {
	return (
		<div className="bg-white text-white">
			<h1>Admin Layout</h1>
			<Outlet />
		</div>
	);
};

export default AdminLayout;
