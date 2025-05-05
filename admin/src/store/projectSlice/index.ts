import api from "@/utils/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IProject {
	projects: any[];
	reorderedProjects: any[];
	filteredProjects: any[];
	isLoading: boolean;
}

interface IProjectPayload {
	success: boolean;
	projects: [];
}

const initialState: IProject = {
	projects: [],
	reorderedProjects: [],
	filteredProjects: [],
	isLoading: false,
};

export const fetchProjects = createAsyncThunk(
	"projects/fetch-projects",
	async () => {
		try {
			const res = await api.get("admin/project/get-projects");
			return res.data;
		} catch (error: any) {
			return error.response.data;
		}
	},
);

const projectSlice = createSlice({
	name: "project",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchProjects.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(
			fetchProjects.fulfilled,
			(state, action: PayloadAction<IProjectPayload>) => {
				state.isLoading = false;
				state.projects = action.payload.projects;
			},
		);
		builder.addCase(fetchProjects.rejected, (state) => {
			state.isLoading = false;
		});
	},
});

export default projectSlice.reducer;
export const {} = projectSlice.actions;
