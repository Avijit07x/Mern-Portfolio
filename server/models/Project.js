const mongoose = require("mongoose");

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
	},
	{ timestamps: true }
);

module.exports =
	mongoose.model.Project || mongoose.model("Project", ProjectSchema);
