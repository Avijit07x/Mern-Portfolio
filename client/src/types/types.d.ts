interface IProjectTool {
	id: string;
	text: string;
	_id: string;
}

interface IProject {
	_id: string;
	title: string;
	description: string;
	github_link?: string;
	live_link?: string;
	image: {
		url: string;
	};
	tools: IProjectTool[];
	order: number;
	createdAt: string;
	updatedAt: string;
	__v: number;
}
