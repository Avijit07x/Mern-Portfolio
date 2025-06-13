import { Request, RequestHandler, Response } from "express";
import mongoose from "mongoose";
import { ImageDeleteUtil } from "../../helpers/cloudinary";
import Tool from "../../models/tools";
import { toolSchema, updateToolSchema } from "../../validations/toolValidation";

const getTools: RequestHandler = async (req: Request, res: Response) => {
	try {
		const tools = await Tool.find()
			.sort({ order: 1 })
			.select("-image.public_id");
		res.status(200).json({ success: true, message: "Tools fetched", tools });
	} catch (error) {
		res.status(500).json({ success: false, message: "Something went wrong" });
	}
};

const addTool: RequestHandler = async (req: Request, res: Response) => {
	try {
		const { error, success, data } = toolSchema.safeParse(req.body);

		if (!success || error) {
			res.status(400).json({ success, error: error.flatten().fieldErrors });
			return;
		}

		const toolData = {
			name: data.name,
			image: data.image,
		};

		const newTool = new Tool(toolData);
		await newTool.save();
		res.status(200).json({ success: true, message: "Tool added" });
	} catch (error) {
		res.status(500).json({ success: false, message: "Something went wrong" });
	}
};

const updateTool: RequestHandler = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (!id || !mongoose.Types.ObjectId.isValid(id)) {
			res.status(400).json({ success: false, message: "Tool id is required" });
			return;
		}

		const { data, success, error } = updateToolSchema.safeParse(req.body);

		if (!success || error) {
			res.status(400).json({ success, error: error.flatten().fieldErrors });
			return;
		}

		const tool = await Tool.findById(id);

		if (!tool) {
			res.status(404).json({ success: false, message: "Tool not found" });
			return;
		}

		// Delete old image if a new one is provided
		if (data.image?.url && tool.image?.public_id) {
			await ImageDeleteUtil(tool.image.public_id);
		}

		// Update fields
		tool.name = data.name || tool.name;
		tool.image = data.image?.url ? data.image : tool.image;

		await tool.save();

		res
			.status(200)
			.json({ success: true, message: "Tool updated successfully" });
	} catch (error) {
		res.status(500).json({ success: false, message: "Something went wrong" });
	}
};

const deleteTool: RequestHandler = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		if (!id || !mongoose.Types.ObjectId.isValid(id)) {
			res.status(400).json({ success: false, message: "Tool id is required" });
			return;
		}
		const tool = await Tool.findById(id);
		if (!tool) {
			res.status(400).json({ success: false, message: "Tool not found" });
			return;
		}
		await ImageDeleteUtil(tool.image.public_id);
		await Tool.deleteOne({ _id: id });
		res.status(200).json({ success: true, message: "Tool deleted" });
	} catch (error) {
		res.status(500).json({ success: false, message: "Something went wrong" });
	}
};

const reorderTools: RequestHandler = async (req: Request, res: Response) => {
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
	} catch (error) {
		console.error("Reorder Tools Error:", error);
		res.status(500).json({ success: false, message: "Something went wrong" });
	}
};

export { addTool, deleteTool, getTools, reorderTools, updateTool };
