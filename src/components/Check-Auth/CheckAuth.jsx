import { Navigate, useLocation } from "react-router";

const CheckAuth = ({ children }) => {
	const isAuthenticated = false;
	const location = useLocation();

	if (!isAuthenticated && location.pathname.includes("/admin")) {
		return <Navigate to="/unauthorized" />;
	}
	if (isAuthenticated && location.pathname === "/login") {
		return <Navigate to="/admin/projects" />;
	}
	if (
		isAuthenticated &&
		(location.pathname === "/admin" || location.pathname === "/admin/")
	) {
		return <Navigate to="/admin/projects" />;
	}
	return <div>{children}</div>;
};

export default CheckAuth;
