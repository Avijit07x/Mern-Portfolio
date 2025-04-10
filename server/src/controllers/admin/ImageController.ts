
import { Request, Response } from "express";
import { ImageDeleteUtil, ImageUploadUtil } from "../../helpers/Cloudinary";

// upload image to cloudinary
const handleImageUpload = async (req: Request, res: Response) => {
	if (!req.file) {
		res.status(400).json({ success: false, message: "No file uploaded" });
		return;
	}
	try {
		const b64 = Buffer.from(req.file.buffer).toString("base64");

		const url = "data:" + req.file.mimetype + ";base64," + b64;

		const result = await ImageUploadUtil(url);

		res.status(200).json({ success: true, result });
		return;
	} catch (error: any) {
		res.status(500).json({ success: false, message: error.message });
		return;
	}
};

// delete image from cloudinary
const handleImageDelete = async (req: Request, res: Response) => {
	const { id } = req.body ?? {};
	try {
		const result = await ImageDeleteUtil(id);
		res.status(200).json({ success: true, result });
		return;
	} catch (error: any) {
		res.status(500).json({ success: false, message: error.message });
		return;
	}
};

export { handleImageUpload, handleImageDelete };
