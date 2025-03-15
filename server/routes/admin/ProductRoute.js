const express = require("express");
const { upload } = require("../../helpers/Cloudinary");
const {
	handleImageUpload,
	handleImageDelete,
	addProduct,
	getProducts,
	deleteProduct,
	updateProduct,
} = require("../../controllers/admin/ProductController");
const authMiddleware = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post(
	"/upload-image",
	authMiddleware,
	upload.single("image"),
	handleImageUpload
);
router.post("/delete-image", authMiddleware, handleImageDelete);
router.post("/add-product", authMiddleware, addProduct);
router.get("/get-products", getProducts);
router.post("/delete-product/:id", authMiddleware, deleteProduct);
router.put("/update-product", authMiddleware, updateProduct);

module.exports = router;
