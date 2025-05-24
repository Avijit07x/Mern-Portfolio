import mongoose, { Model, Schema } from "mongoose";
import { ITools } from "../types/types";

const ToolsSchema = new Schema<ITools>(
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

const Tool: Model<ITools> =
	mongoose.models.Tool || mongoose.model<ITools>("Tool", ToolsSchema);
export default Tool;
