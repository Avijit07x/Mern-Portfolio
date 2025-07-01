import mongoose, { Model, Schema } from "mongoose";
import { IProject } from "../types/types";

const ProjectSchema = new Schema<IProject>(
	{
		title: {
			type: String,
			required: true,
		},
		image: {
			url: { type: String, required: true },
			public_id: { type: String, required: true },
		},
		description: {
			type: String,
			required: true,
		},
		github_link: {
			type: String,
		},
		live_link: {
			type: String,
		},
		tools: {
			type: [
				{
					id: { type: String },
					text: { type: String, required: true },
				},
			],
			required: true,
		},
		order: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

const Project: Model<IProject> =
	mongoose.models.Project ||
	mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
