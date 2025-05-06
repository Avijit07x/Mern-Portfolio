import { Tag } from "emblor";

export interface ITools {
	_id: string;
	text: string;
	name: string;
	image: {
		url: string;
		public_Id: string;
	};
	order: number;
}

export interface IProject {
	_id: string;
	title: string;
	image: {
		url: string;
		public_Id: string;
	};
	description: string;
	tools: ITools[];
	order: number;
}

export interface IUser {
	email: string;
	id: string;
	username: string;
}

export interface IAuthState {
	isAuth: boolean;
	user: IUser | null;
	isLoading: boolean;
}

export interface AuthPayload {
	success: boolean;
	user: IUser;
	error?: string;
}

export interface IToolState {
	tools: ITools[];
	isLoading: boolean;
	reorderedTools: ITools[];
	filteredTools: ITools[];
}

export interface ToolPayload {
	success: boolean;
	tools: ITools[];
}

export interface IProjectState {
	projects: IProject[];
	reorderedProjects: IProject[];
	filteredProjects: IProject[];
	isLoading: boolean;
}

export interface IProjectActionPayload {
	success: boolean;
	projects: IProject[];
}

export interface IProjectPayload {
	title: string;
	description: string;
	image: {
		url: string;
		public_id: string;
	};
	tools: Tag[];
}
