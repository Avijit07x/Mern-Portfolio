import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import ReactCompiler from "babel-plugin-react-compiler";
import path from "path";
import { defineConfig } from "vite";
import Sitemap from "vite-plugin-sitemap";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: [ReactCompiler],
			},
		}),
		tailwindcss(),
		Sitemap({ hostname: "https://avijit07x.vercel.app" }),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	build: {
		chunkSizeWarningLimit: 1000, // warning threshold ko 1MB kar diya

		rollupOptions: {
			output: {
				manualChunks: {
					react: ["react", "react-dom", "react-router"],
					"radix-ui": [
						"@radix-ui/react-dialog",
						"@radix-ui/react-label",
						"@radix-ui/react-separator",
						"@radix-ui/react-slot",
						"lucide-react",
					],
					github: ["react-github-calendar"],
					animations: ["lenis", "motion"],
					utils: [
						"axios",
						"clsx",
						"class-variance-authority",
						"tailwind-merge",
						"zod",
						"@hookform/resolvers",
					],
					vercel: ["@vercel/analytics", "@vercel/speed-insights"],
				},
			},
		},
	},
});
