import mongoose from "mongoose";

interface Connection {
	isConnected?: number;
}

const connection: Connection = {};

const connectToDB = async () => {
	const uri = process.env.MONGO_URI;
	if (!uri) {
		throw new Error("MONGO_URI is not defined");
	}

	try {
		if (connection.isConnected) {
			return;
		}
		const db = await mongoose.connect(uri);
		connection.isConnected = db.connections[0].readyState;
		console.log(`MongoDB Connected: ${db.connections[0].readyState}`);
	} catch (error: any) {
		console.error(`Error: ${error.message}`);
		process.exit(1);
	}
};

export default connectToDB;
