import mongoose, { ConnectOptions } from "mongoose";
import env from "../utils/env";

const uri = env.MONGO_URI;
const options: ConnectOptions = {
	connectTimeoutMS: 60000,
	socketTimeoutMS: 60000,
};

if (!uri) {
	throw new Error("MONGO_URI is not defined");
}

let cached = (global as any).mongoose;

if (!cached) {
	cached = (global as any).mongoose = { conn: null, promise: null };
}

const connectToDB = async () => {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		cached.promise = mongoose.connect(uri, options);
	}

	try {
		cached.conn = await cached.promise;
		console.log("MongoDB connected");
	} catch (error: any) {
		console.error("MongoDB connection error:", error.message);
		throw error;
	}

	return cached.conn;
};

export default connectToDB;
