import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import App from "./App.jsx";
import AuthContextProvider from "./context/AuthContextProvider.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthContextProvider>
			<BrowserRouter>
				<App />
				<Toaster position="bottom-right" richColors />
			</BrowserRouter>
		</AuthContextProvider>
	</StrictMode>,
);
