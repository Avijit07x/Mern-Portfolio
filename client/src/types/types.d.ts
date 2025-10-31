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

interface IActivity {
	name: string;
	details?: string;
	state?: string;
	timestamps?: {
		start: number;
		end?: number;
	};
	assets?: {
		large_image?: string;
		small_image?: string;
	};
	application_id?: string;
}

interface ILanyardEvent {
	op: number;
	t?: string;
	d: {
		discord_status: string;
		activities: IActivity[];
		user_id: string;
		heartbeat_interval: number;
	};
}
