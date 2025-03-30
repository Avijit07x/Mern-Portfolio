const express = require("express");
const authMiddleware = require("../../middlewares/authMiddleware");
const {
	handleImageUpload,
	handleImageDelete,
} = require("../../controllers/admin/ImageController");
const { upload } = require("../../helpers/Cloudinary");

const router = express.Router();

router.post(
	"/upload-image",
	upload.single("image"),
	authMiddleware,
	handleImageUpload
);

router.post("/delete-image", authMiddleware, handleImageDelete);

module.exports = router;