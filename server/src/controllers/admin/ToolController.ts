import { Request, Response } from "express";
import { ImageDeleteUtil } from "../../helpers/Cloudinary";
import Tool from "../../models/Tools";

const addTool = async (req: Request, res: Response) => {
	try {
		const { name, image } = req.body ?? {};
		if (!name || !image) {
			res
				.status(400)
				.json({ success: false, message: "All fields are required" });
			return;
		}
		const newTool = new Tool({ name, image });
		await newTool.save();
		res.status(200).json({ success: true, message: "Tool added" });
		return;
	} catch (error) {
		res.status(500).json({ success: false, message: "Something went wrong" });
		return;
	}
};

const updateTool = async (req: Request, res: Response) => {
	try {
		const { id } = req.params ?? {};
		const { name, image } = req.body ?? {};

		if (!id) {
			res.status(400).json({ success: false, message: "Tool id is required" });
			return;
		}

		const tool = await Tool.findById(id);

		if (!tool) {
			res.status(404).json({ success: false, message: "Tool not found" });
			return;
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
		return;
	} catch (error) {
		res.status(500).json({ success: false, message: "Something went wrong" });
		return;
	}
};

const deleteTool = async (req: Request, res: Response) => {
	try {
		const { id } = req.params ?? {};
		if (!id) {
			res.status(400).json({ success: false, message: "Tool id is required" });
			return;
		}
		const tool = await Tool.findById(id);
		if (!tool) {
			res.status(400).json({ success: false, message: "Tool not found" });
			return;
		}
		await ImageDeleteUtil(tool.image.public_id);
		await Tool.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Tool deleted" });
		return;
	} catch (error) {
		res.status(500).json({ success: false, message: "Something went wrong" });
		return;
	}
};

const getTools = async (req: Request, res: Response) => {
	try {
		const tools = await Tool.find().sort({ order: 1 });

		res.status(200).json({ success: true, message: "Tools fetched", tools });
		return;
	} catch (error) {
		res.status(500).json({ success: false, message: "Something went wrong" });
		return;
	}
};

const reorderTools = async (req: Request, res: Response) => {
	try {
		const { tools } = req.body ?? {};

		if (!tools || !Array.isArray(tools)) {
			res.status(400).json({ success: false, message: "Invalid tools data" });
			return;
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
		return;
	} catch (error) {
		console.error("Reorder Tools Error:", error);
		res.status(500).json({ success: false, message: "Something went wrong" });
		return;
	}
};

export { addTool, deleteTool, getTools, reorderTools, updateTool };
