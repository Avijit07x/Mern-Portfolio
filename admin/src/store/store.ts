import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import toolReducer from "./toolSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		tool: toolReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
