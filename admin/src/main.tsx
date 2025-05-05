import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import App from "./App.tsx";
import "./index.css";
import { store } from "./store/store";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
				<Toaster position="bottom-right" closeButton richColors/>
			</BrowserRouter>
		</Provider>
	</StrictMode>,
);
