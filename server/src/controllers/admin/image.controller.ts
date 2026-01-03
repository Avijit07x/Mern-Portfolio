import { RequestHandler } from "express";
import { ImageDeleteUtil, ImageUploadUtil } from "../../helpers/cloudinary";
import { AppError } from "../../utils/AppError";
import asyncHandler from "../../utils/asyncHandler";

const handleImageUpload: RequestHandler = asyncHandler(async (req, res) => {
	if (!req.file) {
		throw new AppError("No file uploaded", 400);
	}

	const b64 = Buffer.from(req.file.buffer).toString("base64");
	const url = `data:${req.file.mimetype};base64,${b64}`;

	const result = await ImageUploadUtil(url);

	if (!result) {
		throw new AppError("Image upload failed", 500);
	}

	res.status(200).json({
		success: true,
		result,
	});
});

const handleImageDelete: RequestHandler = asyncHandler(async (req, res) => {
	const { id } = req.body ?? {};

	if (!id) {
		throw new AppError("Image id is required", 400);
	}

	const result = await ImageDeleteUtil(id);

	res.status(200).json({
		success: true,
		result,
	});
});

export { handleImageDelete, handleImageUpload };
