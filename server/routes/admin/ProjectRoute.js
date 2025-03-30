const express = require("express");

const {
	addProduct,
	getProducts,
	deleteProduct,
	updateProduct,
} = require("../../controllers/admin/ProjectController");
const authMiddleware = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post("/add-product", authMiddleware, addProduct);
router.get("/get-products", getProducts);
router.post("/delete-product/:id", authMiddleware, deleteProduct);
router.put("/update-product", authMiddleware, updateProduct);

module.exports = router;
