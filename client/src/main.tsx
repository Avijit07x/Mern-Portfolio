import { Analytics } from "@vercel/analytics/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import RefContextProvider from "./context/RefContextProvider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RefContextProvider>
			<BrowserRouter>
				<App />
				<Analytics />
			</BrowserRouter>
		</RefContextProvider>
	</StrictMode>,
);
