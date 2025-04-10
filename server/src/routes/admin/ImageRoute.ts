import express, { Router } from "express";
import {
	handleImageDelete,
	handleImageUpload,
} from "../../controllers/admin/ImageController";
import { upload } from "../../helpers/Cloudinary";
import authMiddleware from "../../middlewares/authMiddleware";

const router: Router = express.Router();

router.post(
	"/upload-image",
	upload.single("image"),
	authMiddleware,
	handleImageUpload
);

router.post("/delete-image", authMiddleware, handleImageDelete);

export default router;
