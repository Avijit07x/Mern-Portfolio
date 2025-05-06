import {
	IProjectActionPayload,
	IProjectPayload,
	IProjectState,
} from "@/types/types";
import api from "@/utils/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IProjectState = {
	projects: [],
	reorderedProjects: [],
	filteredProjects: [],
	isLoading: false,
};

export const addProject = createAsyncThunk(
	"project/add-project",
	async (data: IProjectPayload) => {
		try {
			const res = await api.post("admin/project/add-project", data);
			return res.data;
		} catch (error: any) {
			return error.response.data;
		}
	},
);

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

export const deleteProject = createAsyncThunk(
	"project/delete-project",
	async (id: string) => {
		try {
			const res = await api.post(`admin/project/delete-project/${id}`);
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
			(state, action: PayloadAction<IProjectActionPayload>) => {
				state.isLoading = false;
				state.projects = action.payload.projects;
			},
		);
		builder.addCase(fetchProjects.rejected, (state) => {
			state.isLoading = false;
		});
		builder.addCase(
			deleteProject.fulfilled,
			(state, action: PayloadAction<IProjectActionPayload>) => {
				state.projects = action.payload.projects;
			},
		);
		builder.addCase(
			addProject.fulfilled,
			(state, action: PayloadAction<IProjectActionPayload>) => {
				if (action.payload?.projects?.length !== 0) {
					state.projects = action.payload.projects;
				}
			},
		);
	},
});

export default projectSlice.reducer;
export const {} = projectSlice.actions;
