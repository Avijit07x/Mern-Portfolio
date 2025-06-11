import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import App from "./App.tsx";
import RefContextProvider from "./context/RefContextProvider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RefContextProvider>
			<BrowserRouter>
				<App />
				<Toaster position="bottom-right" richColors />
				<Analytics />
				<SpeedInsights />
			</BrowserRouter>
		</RefContextProvider>
	</StrictMode>,
);
