import { useContext } from "react";
import { Route, Routes } from "react-router";
import CheckAuth from "./components/Check-Auth/CheckAuth";
import AdminLayout from "./components/admin/AdminLayout";
import AuthContext from "./context/AuthContext";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Unauthorized from "./routes/Unauthorized";
import Projects from "./routes/admin/Projects";
import Tools from "./routes/admin/Tools";
import Login from "./routes/auth/Login";

const App = () => {
	const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />

				{/* Login */}
				<Route
					path="/auth/login"
					element={
						<CheckAuth isAuthenticated={isAuthenticated}>
							<Login />
						</CheckAuth>
					}
				/>

				{/* Admin Routes */}
				<Route
					path="/admin"
					element={
						<CheckAuth isAuthenticated={isAuthenticated}>
							<AdminLayout />
						</CheckAuth>
					}
				>
					<Route path="/admin/projects" element={<Projects />} />
					<Route path="/admin/tools" element={<Tools />} />
				</Route>

				{/* Unauthorized */}
				<Route path="/unauthorized" element={<Unauthorized />} />
				{/* 404 */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
};

export default App;
