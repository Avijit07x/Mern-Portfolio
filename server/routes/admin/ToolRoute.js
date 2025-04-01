const express = require("express");

const router = express.Router();

const {
	addTool,
	getTools,
	deleteTool,
	updateTool,
	reorderTools,
} = require("../../controllers/admin/ToolController");
const authMiddleware = require("../../middlewares/authMiddleware");

router.post("/add-tool", authMiddleware, addTool);
router.get("/get-tools", getTools);
router.post("/delete-tool/:id", authMiddleware, deleteTool);
router.put("/update-tool/:id", authMiddleware, updateTool);
router.post("/reorder-tools", authMiddleware, reorderTools);

module.exports = router;
