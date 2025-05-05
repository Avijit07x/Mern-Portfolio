import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import projectReducer from "./projectSlice";
import toolReducer from "./toolSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		tool: toolReducer,
		project: projectReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
