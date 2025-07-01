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

interface ITool {
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
	tools: ITool[];
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

interface ITag {
	id: string;
	text: string;
}

interface IToolState {
	tools: ITool[];
	isLoading: boolean;
	reorderedTools: ITool[];
	filteredTools: ITool[];
	formData: {
		name: string;
	};
	currentEditingId: string | null;
}

interface ToolPayload {
	success: boolean;
	tools: ITool[];
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
	tags: ITag[];
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

interface IToolUpdateData extends Partial<ITool> {
	_id?: string;
	id?: string | null;
	image?: {
		url: string;
		public_id: string;
	};
}
