const express = require("express");

const router = express.Router();

const {
	addTool,
	getTools,
	deleteTool,
	updateTool,
} = require("../../controllers/admin/ToolController");
const authMiddleware = require("../../middlewares/authMiddleware");

router.post("/add-tool", authMiddleware, addTool);
router.get("/get-tools", getTools);
router.post("/delete-tool/:id", authMiddleware, deleteTool);
router.put("/update-tool/:id", authMiddleware, updateTool);

module.exports = router;
