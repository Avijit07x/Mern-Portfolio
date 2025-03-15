const mongoose = require("mongoose");

const ToolsSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		image: {
			url: { type: String, required: true },
			public_id: { type: String, required: true },
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.models.Tools || mongoose.model("Tools", ToolsSchema);
