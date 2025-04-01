import { useEffect } from "react";
import { Route, Routes } from "react-router";
import AdminLayout from "./components/admin/Layout";
import CheckAuth from "./components/auth/CheckAuth";
import Loader from "./components/loader/Loader";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import NotFound from "./pages/not-found/NotFound";
import Project from "./pages/projects/Project";
import Tools from "./pages/tools/Tools";
import { checkAuth } from "./store/authSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";

const App = () => {
	const { isLoading } = useAppSelector((state) => state.auth);

	const dispatch = useAppDispatch();
	const token = localStorage.getItem("_token");

	useEffect(() => {
		if (
			token === "false" ||
			!token ||
			token === null ||
			token === "undefined"
		) {
			return;
		} else {
			dispatch(checkAuth());
		}
	}, [dispatch]);

	if (isLoading) return <Loader />;

	return (
		<>
			<Routes>
				<Route
					path="/"
					element={
						<CheckAuth>
							<AdminLayout />
						</CheckAuth>
					}
				>
					<Route index element={<Home />} />
					<Route path="projects" element={<Project />} />
					<Route path="tools" element={<Tools />} />
				</Route>
				<Route
					path="/login"
					element={
						<CheckAuth>
							<Login />
						</CheckAuth>
					}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
};

export default App;
