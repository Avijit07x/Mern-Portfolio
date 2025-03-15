import { useAppSelector } from "@/store/hooks";
import { Navigate, useLocation } from "react-router";

const CheckAuth = ({ children }: { children: React.ReactNode }) => {
	const { isAuth } = useAppSelector((state) => state.auth);
	const location = useLocation();

	if (!isAuth && location.pathname === "/") {
		return <Navigate to="/login" />;
	}

	if (!isAuth && location.pathname !== "/login") {
		return <Navigate to="/login" />;
	}

	if (isAuth && location.pathname === "/login") {
		return <Navigate to="/" />;
	}

	return <>{children}</>;
};

export default CheckAuth;
