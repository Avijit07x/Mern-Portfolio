import mongoose, { Model, Schema } from "mongoose";
import { ITool } from "../types/types";

const ToolsSchema = new Schema<ITool>(
	{
		name: { type: String, required: true },
		image: {
			url: { type: String, required: true },
			public_id: { type: String, required: true },
		},
		order: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

const Tool: Model<ITool> =
	mongoose.models.Tool || mongoose.model<ITool>("Tool", ToolsSchema);
export default Tool;
