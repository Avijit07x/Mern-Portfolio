import api from "@/utils/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IAuthState = {
	isAuth: false,
	user: null,
	isLoading: false,
};

export const checkAuth = createAsyncThunk("auth/check-auth", async () => {
	try {
		const res = await api.get("/auth/check-auth");
		const result = res.data;
		return result;
	} catch (error: any) {
		return error.response.data;
	}
});

export const login = createAsyncThunk(
	"auth/login",
	async (data: { email: string; password: string }) => {
		try {
			const res = await api.post("/auth/login", data);
			const result = res.data;
			return result;
		} catch (error: any) {
			return error.response.data;
		}
	},
);

export const logout = createAsyncThunk("auth/logout", async () => {
	try {
		const res = await api.post("/auth/logout");
		const result = res.data;
		return result;
	} catch (error: any) {
		return error.response.data;
	}
});

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(checkAuth.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				checkAuth.fulfilled,
				(state, action: PayloadAction<AuthPayload>) => {
					state.isLoading = false;
					state.isAuth = action.payload?.success;
					state.user = action.payload?.success ? action.payload?.user : null;
				},
			)
			.addCase(checkAuth.rejected, (state) => {
				state.isLoading = false;
				state.isAuth = false;
				state.user = null;
			})
			.addCase(login.fulfilled, (state, action: PayloadAction<AuthPayload>) => {
				state.isLoading = false;
				state.user = action.payload?.success ? action.payload?.user : null;
				state.isAuth = action.payload?.success;
				localStorage.setItem("_token", `${action.payload?.success}`);
			})
			.addCase(login.pending, (state) => {
				state.isAuth = false;
				state.user = null;
			})
			.addCase(login.rejected, (state) => {
				state.isLoading = false;
				state.isAuth = false;
				state.user = null;
			})
			.addCase(logout.fulfilled, (state) => {
				localStorage.setItem("_token", "false");
				state.isLoading = false;
				state.isAuth = false;
				state.user = null;
			})
			.addCase(logout.pending, (state) => {
				localStorage.setItem("_token", "false");
				state.isLoading = false;
				state.isAuth = false;
				state.user = null;
			});
	},
});

export const { setLoading } = authSlice.actions;
export default authSlice.reducer;
