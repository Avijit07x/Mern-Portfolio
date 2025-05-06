import { IToolState, ToolPayload } from "@/types/types";
import api from "@/utils/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IToolState = {
	tools: [],
	reorderedTools: [],
	filteredTools: [],
	isLoading: false,
};

export const fetchTools = createAsyncThunk("tool/fetch-tools", async () => {
	try {
		const res = await api.get("admin/tool/get-tools");
		const result = res.data;
		return result;
	} catch (error: any) {
		return error.response.data;
	}
});

const toolSlice = createSlice({
	name: "tool",
	initialState,
	reducers: {
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setTools: (state, action: PayloadAction<any[]>) => {
			state.tools = action.payload;
		},
		setReorderedTools: (state, action: PayloadAction<any[]>) => {
			state.reorderedTools = action.payload;
		},
		setFilteredTools: (state, action: PayloadAction<any[]>) => {
			state.filteredTools = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(
			fetchTools.fulfilled,
			(state, action: PayloadAction<ToolPayload>) => {
				state.isLoading = false;
				state.tools = action.payload?.success ? action.payload?.tools : [];
				state.reorderedTools = action.payload?.success
					? action.payload?.tools
					: [];
				state.filteredTools = action.payload?.success
					? action.payload?.tools
					: [];
			},
		);
		builder.addCase(fetchTools.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchTools.rejected, (state) => {
			state.isLoading = false;
		});
	},
});

export default toolSlice.reducer;

export const { setLoading, setTools, setReorderedTools, setFilteredTools } =
	toolSlice.actions;
