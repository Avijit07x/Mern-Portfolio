import mongoose, { ConnectOptions } from "mongoose";
import env from "../utils/env";

interface Connection {
	isConnected?: number;
}

const connection: Connection = {};

const options: ConnectOptions = {
	connectTimeoutMS: 60000, // 60 seconds
	socketTimeoutMS: 60000, // 60 seconds
};
const connectToDB = async () => {
	const uri = env.MONGO_URI;
	if (!uri) {
		throw new Error("MONGO_URI is not defined");
	}

	try {
		if (connection.isConnected) {
			return;
		}
		const db = await mongoose.connect(uri, options);
		connection.isConnected = db.connections[0].readyState;
		console.log(`MongoDB Connected: ${db.connections[0].readyState}`);
	} catch (error: any) {
		console.error(`Error: ${error.message}`);
	}
};

export default connectToDB;
