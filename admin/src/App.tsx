import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router";
import AdminLayout from "./components/admin/Layout";
import CheckAuth from "./components/auth/CheckAuth";
import Loader from "./components/loader/Loader";
import { checkAuth } from "./store/authSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/home/Home"));
const Login = lazy(() => import("./pages/login/Login"));
const NotFound = lazy(() => import("./pages/not-found/NotFound"));
const Project = lazy(() => import("./pages/projects/Project"));
const Tools = lazy(() => import("./pages/tools/Tools"));

const App = () => {
	const { isLoading } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();
	const token = localStorage.getItem("_token");

	useEffect(() => {
		if (!token || token === "false" || token === "undefined") return;
		dispatch(checkAuth());
	}, []);

	if (isLoading) return <Loader />;

	return (
		<div className="h-screen w-full bg-[#121214]">
			<Suspense fallback={<Loader />}>
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
			</Suspense>
		</div>
	);
};

export default App;
