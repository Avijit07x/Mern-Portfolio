import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import App from "./App.tsx";
import "./index.css";
import { persistor, store } from "./store/store";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<BrowserRouter>
					<App />
					<Toaster position="bottom-right" closeButton />
				</BrowserRouter>
			</PersistGate>
		</Provider>
	</StrictMode>,
);
