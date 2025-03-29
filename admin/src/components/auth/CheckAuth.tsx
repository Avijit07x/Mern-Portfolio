import { useAppSelector } from "@/store/hooks";
import { Navigate, useLocation } from "react-router";

const CheckAuth = ({ children }: { children: React.ReactNode }) => {
	const { isAuth } = useAppSelector((state) => state.auth);
	const location = useLocation();

	if (!isAuth && location.pathname !== "/login") {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	if (isAuth && location.pathname === "/login") {
		return <Navigate to={location.state?.from?.pathname || "/"} replace />;
	}

	return <>{children}</>;
};

export default CheckAuth;
