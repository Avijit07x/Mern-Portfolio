import { useState } from "react";
import AuthContext from "./AuthContext";

const AuthContextProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(true);

	return (
		<AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
