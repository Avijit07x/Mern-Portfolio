import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import { isBrowser } from "react-device-detect";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const GamingHUDCursor = lazy(() => import("./components/game/GamingHUDCursor"));
const GhostHunter = lazy(() => import("./components/game/GhostHunter"));

const App = () => {
	return (
		<>
			{isBrowser && (
				<Suspense fallback={null}>
					<GamingHUDCursor />
					<GhostHunter />
				</Suspense>
			)}
			<div id="site-main">
				<Routes>
					<Route path="/" element={<Home />} />

					{/* 404 */}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</>
	);
};

export default App;
