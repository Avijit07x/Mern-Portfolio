import { RequestHandler } from "express";
import mongoose from "mongoose";
import z from "zod";
import { ImageDeleteUtil } from "../../helpers/cloudinary";
import Tool from "../../models/tools";
import { AppError } from "../../utils/AppError";
import asyncHandler from "../../utils/asyncHandler";
import { toolSchema, updateToolSchema } from "../../validations/toolValidation";

const getTools: RequestHandler = asyncHandler(async (req, res) => {
	const tools = await Tool.find()
		.sort({ order: 1 })
		.select("-image.public_id");
	res.status(200).json({
		success: true,
		message: "Tools fetched",
		tools,
	});
});

const addTool: RequestHandler = asyncHandler(async (req, res) => {
	const { error, success, data } = toolSchema.safeParse(req.body);

	if (!success || error) {
		throw new AppError("Validation failed", 400, z.flattenError(error));
	}

	const toolData = {
		name: data.name,
		image: data.image,
	};

	const newTool = new Tool(toolData);
	await newTool.save();
	res.status(200).json({ success: true, message: "Tool added" });
});

const updateTool: RequestHandler = asyncHandler(async (req, res) => {
	const { id } = req.params;

	if (!id || !mongoose.Types.ObjectId.isValid(id)) {
		throw new AppError("Tool id is required", 400);
	}

	const { data, success, error } = updateToolSchema.safeParse(req.body);

	if (!success || error) {
		throw new AppError("Validation failed", 400, z.flattenError(error));
	}

	const tool = await Tool.findById(id);

	if (!tool) {
		throw new AppError("Tool not found", 404);
	}

	// Delete old image if a new one is provided
	if (data.image?.url && tool.image?.public_id) {
		await ImageDeleteUtil(tool.image.public_id);
	}

	// Update fields
	tool.name = data.name || tool.name;
	tool.image = data.image?.url ? data.image : tool.image;

	await tool.save();

	res.status(200).json({
		success: true,
		message: "Tool updated successfully",
	});
});

const deleteTool: RequestHandler = asyncHandler(async (req, res) => {
	const { id } = req.params;
	if (!id || !mongoose.Types.ObjectId.isValid(id)) {
		throw new AppError("Tool id is required", 400);
	}
	const tool = await Tool.findById(id);

	if (!tool) {
		throw new AppError("Tool not found", 404);
	}

	await ImageDeleteUtil(tool.image.public_id);
	await Tool.deleteOne({ _id: id });
	res.status(200).json({ success: true, message: "Tool deleted" });
});

const reorderTools: RequestHandler = asyncHandler(async (req, res) => {
	const { tools } = req.body ?? {};

	if (!tools || !Array.isArray(tools)) {
		throw new AppError("Invalid tools data", 400);
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
});

export { addTool, deleteTool, getTools, reorderTools, updateTool };
