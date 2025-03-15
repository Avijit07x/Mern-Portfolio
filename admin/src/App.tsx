import { useEffect } from "react";
import { Route, Routes } from "react-router";
import AdminLayout from "./components/admin/Layout";
import CheckAuth from "./components/auth/CheckAuth";
import Loader from "./components/loader/Loader";
import Home from "./routes/home/Home";
import Login from "./routes/login/Login";
import NotFound from "./routes/not-found/NotFound";
import Project from "./routes/projects/Project";
import Tools from "./routes/tools/Tools";
import { checkAuth } from "./store/authSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";

const App = () => {
	const { isLoading } = useAppSelector((state) => state.auth);

	const dispatch = useAppDispatch();
	const token = localStorage.getItem("_token");

	useEffect(() => {
		if (token === "false" || !token) {
			return;
		} else {
			dispatch(checkAuth());
		}
	}, [dispatch]);
	console.log("test")

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
