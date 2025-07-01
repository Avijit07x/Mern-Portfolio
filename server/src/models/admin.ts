import mongoose, { Model, Schema } from "mongoose";
import { IAdmin } from "../types/types";

const adminSchema = new Schema<IAdmin>(
	{
		username: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{ timestamps: true }
);

const Admin: Model<IAdmin> =
	mongoose.models.Admin || mongoose.model<IAdmin>("Admin", adminSchema);

export default Admin;
