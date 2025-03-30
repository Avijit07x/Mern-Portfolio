const express = require("express");

const {
	handleImageUpload,
	handleImageDelete,
	addProduct,
	getProducts,
	deleteProduct,
	updateProduct,
} = require("../../controllers/admin/ProjectController");
const authMiddleware = require("../../middlewares/authMiddleware");
const { upload } = require("../../helpers/Cloudinary");

const router = express.Router();

router.post(
	"/upload-image",
	upload.single("image"),
	authMiddleware,
	handleImageUpload
);
router.post("/delete-image", authMiddleware, handleImageDelete);
router.post("/add-product", authMiddleware, addProduct);
router.get("/get-products", getProducts);
router.post("/delete-product/:id", authMiddleware, deleteProduct);
router.put("/update-product", authMiddleware, updateProduct);

module.exports = router;
