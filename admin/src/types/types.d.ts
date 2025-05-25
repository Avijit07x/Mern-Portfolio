import { Tag } from "emblor";

interface IMenuItem {
	id: string;
	label: string;
	path: string;
	icon: JSX.Element;
}

interface IUploadedImage {
	url: string;
	public_id: string;
}

interface ITools {
	_id: string;
	text: string;
	name: string;
	id: string;
	image: {
		url: string;
		public_Id: string;
	};
	order: number;
}

interface IProject {
	_id: string;
	title: string;
	image: {
		url: string;
		public_Id: string;
	};
	description: string;
	github_link: string;
	live_link: string;
	tools: ITools[];
	order: number;
}

interface IUser {
	email: string;
	id: string;
	username: string;
}

interface IAuthState {
	isAuth: boolean;
	user: IUser | null;
	isLoading: boolean;
}

interface AuthPayload {
	success: boolean;
	user: IUser;
	error?: string;
}

interface IToolState {
	tools: ITools[];
	isLoading: boolean;
	reorderedTools: ITools[];
	filteredTools: ITools[];
	formData: {
		name: string;
	};
	currentEditingId: string | null;
}

interface ToolPayload {
	success: boolean;
	tools: ITools[];
}

interface IProjectFormData {
	title: string;
	description: string;
	github_link: string;
	live_link: string;
}

interface IProjectState {
	projects: IProject[];
	reorderedProjects: IProject[];
	filteredProjects: IProject[];
	currentEditingId: string | null;
	isLoading: boolean;
	formData: IProjectFormData;
	tags: Tag[];
}

interface IProjectActionPayload {
	success: boolean;
	projects: IProject[];
}

interface IProjectPayload {
	title: string;
	description: string;
	image: {
		url: string;
		public_id: string;
	};
	tools: Tag[];
}

interface IProjectUpdateData extends Partial<IProjectPayload> {
	id: string | null;
	image?: {
		url: string;
		public_id: string;
	};
}

interface IToolUpdateData extends Partial<ITools> {
	_id?: string;
	id?: string | null;
	image?: {
		url: string;
		public_id: string;
	};
}
