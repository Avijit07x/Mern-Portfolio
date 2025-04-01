const mongoose = require("mongoose");

const ToolsSchema = new mongoose.Schema(
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

module.exports = mongoose.models.Tool || mongoose.model("Tool", ToolsSchema);
