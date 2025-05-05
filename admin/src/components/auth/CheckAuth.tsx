import { useAppSelector } from "@/store/hooks";
import React from "react";
import { Navigate, useLocation } from "react-router";

type Props = {
	children: React.ReactNode;
};

const CheckAuth: React.FC<Props> = ({ children }) => {
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
