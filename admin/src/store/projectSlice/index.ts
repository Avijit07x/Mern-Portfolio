import {
	IProjectActionPayload,
	IProjectPayload,
	IProjectState,
} from "@/types/types";
import api from "@/utils/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tag } from "emblor";

export const preTags: Tag[] = [
	{
		id: Math.random().toString(36).substring(2, 8),
		text: "React",
	},
	{
		id: Math.random().toString(36).substring(2, 8),
		text: "Tailwind Css",
	},
];

const initialState: IProjectState = {
	projects: [],
	reorderedProjects: [],
	filteredProjects: [],
	currentEditingId: null,
	isLoading: false,
	formData: {
		title: "",
		description: "",
	},
	tags: preTags,
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
	reducers: {
		setCurrentEditingId: (state, action: PayloadAction<string>) => {
			state.currentEditingId = action.payload;
		},
		setProjectFormData: (state, action) => {
			state.formData = action.payload;
		},
		setTags: (state, action: PayloadAction<any>) => {
			state.tags = action.payload;
		},
	},
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
	},
});

export default projectSlice.reducer;
export const { setCurrentEditingId, setProjectFormData, setTags } =
	projectSlice.actions;
