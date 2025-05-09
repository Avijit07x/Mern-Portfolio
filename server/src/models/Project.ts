import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
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

export default mongoose.models.Project ||
	mongoose.model("Project", ProjectSchema);
