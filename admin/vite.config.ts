import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import ReactCompiler from "babel-plugin-react-compiler";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: [ReactCompiler],
			},
		}),
		tailwindcss(),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					react: ["react", "react-dom", "react-router"],
					"radix-ui": [
						"@radix-ui/react-avatar",
						"@radix-ui/react-dialog",
						"@radix-ui/react-dropdown-menu",
						"@radix-ui/react-label",
						"@radix-ui/react-slot",
						"lucide-react",
					],
					redux: ["@reduxjs/toolkit", "react-redux"],
					"dnd-kit": [
						"@dnd-kit/core",
						"@dnd-kit/modifiers",
						"@dnd-kit/sortable",
						"@dnd-kit/utilities",
					],
					utils: [
						"axios",
						"clsx",
						"class-variance-authority",
						"tailwind-merge",
						"zod",
						"emblor",
					],
				},
			},
		},
	},
});
