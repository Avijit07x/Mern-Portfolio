const mongoose = require("mongoose");

const connection = {};

const connectToDB = async () => {
	try {
		if (connection.isConnected) {
			return;
		}
		const db = await mongoose.connect(process.env.MONGO_URI);
		connection.isConnected = db.connections[0].readyState;
		console.log(`MongoDB Connected: ${db.connections[0].readyState}`);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit(1);
	}
};

module.exports = connectToDB;
