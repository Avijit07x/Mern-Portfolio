import { Route, Routes } from "react-router";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />

				{/* 404 */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
};

export default App;
