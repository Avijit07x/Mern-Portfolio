import { Document, Types } from "mongoose";

interface ITool extends Document {
	_id?: Types.ObjectId;
	name: string;
	image: {
		public_id: string;
		url: string;
	};
	order?: number;
}

interface IProject extends Document {
	_id?: Types.ObjectId | string;
	title: string;
	description: string;
	image: {
		public_id: string;
		url: string;
	};
	github_link: string;
	live_link: string;
	tools: {
		id?: string;
		text: string;
	}[];
	order: number;
}

interface IAdmin extends Document {
	_id: Types.ObjectId | string;
	username: string;
	email: string;
	password: string;
}
