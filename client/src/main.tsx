import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import RefContextProvider from "./context/RefContextProvider";
import "./index.css";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 10,
			gcTime: 1000 * 60 * 30,
			refetchOnWindowFocus: false,
			refetchOnReconnect: true,
			retry: 1,
		},
	},
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RefContextProvider>
				<BrowserRouter>
					<App />
					<Analytics />
				</BrowserRouter>
			</RefContextProvider>
		</QueryClientProvider>
	</StrictMode>,
);
