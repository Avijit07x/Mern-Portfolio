const { ImageDeleteUtil } = require("../../helpers/Cloudinary");
const Tool = require("../../models/Tools");

const addTool = async (req, res) => {
	try {
		const { name, image } = req.body;
		if (!name || !image) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}
		const newTool = new Tool({ name, image });
		await newTool.save();
		res.status(200).json({ success: true, message: "Tool added" });
	} catch (error) {
		res.status(500).json({ success: false, message: "Something went wrong" });
	}
};

const updateTool = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, image } = req.body;

		if (!id) {
			return res
				.status(400)
				.json({ success: false, message: "Tool id is required" });
		}

		const tool = await Tool.findById(id);

		if (!tool) {
			return res
				.status(404)
				.json({ success: false, message: "Tool not found" });
		}

		// Delete old image if a new one is provided
		if (image?.url && tool.image?.public_id) {
			await ImageDeleteUtil(tool.image.public_id);
		}

		// Update fields
		tool.name = name || tool.name;
		tool.image = image?.url ? image : tool.image;

		await tool.save();

		res
			.status(200)
			.json({ success: true, message: "Tool updated successfully" });
	} catch (error) {
		res.status(500).json({ success: false, message: "Something went wrong" });
	}
};

const deleteTool = async (req, res) => {
	try {
		const { id } = req.params;
		if (!id) {
			return res
				.status(400)
				.json({ success: false, message: "Tool id is required" });
		}
		const tool = await Tool.findById(id);
		if (!tool) {
			return res
				.status(400)
				.json({ success: false, message: "Tool not found" });
		}
		await ImageDeleteUtil(tool.image.public_id);
		await Tool.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Tool deleted" });
	} catch (error) {
		res.status(500).json({ success: false, message: "Something went wrong" });
	}
};

const getTools = async (req, res) => {
	try {
		const tools = await Tool.find().sort({ order: 1 });
		res.status(200).json({ success: true, message: "Tools fetched", tools });
	} catch (error) {
		res.status(500).json({ success: false, message: "Something went wrong" });
	}
};

const reorderTools = async (req, res) => {
	try {
		const { tools } = req.body;

		if (!tools || !Array.isArray(tools)) {
			return res
				.status(400)
				.json({ success: false, message: "Invalid tools data" });
		}

		const bulkOperations = tools.map((id, index) => ({
			updateOne: {
				filter: { _id: id },
				update: { $set: { order: index } },
			},
		}));

		await Tool.bulkWrite(bulkOperations);

		res.status(200).json({
			success: true,
			message: "Tools reordered successfully",
		});
	} catch (error) {
		console.error("Reorder Tools Error:", error);
		res.status(500).json({ success: false, message: "Something went wrong" });
	}
};

module.exports = { addTool, updateTool, deleteTool, getTools, reorderTools };
