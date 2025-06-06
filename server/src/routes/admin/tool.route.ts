import {
	addTool,
	deleteTool,
	getTools,
	reorderTools,
	updateTool,
} from "../../controllers/admin/tool.controller";

import express, { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware";

const router: Router = express.Router();

router.post("/add-tool", authMiddleware, addTool);
router.get("/get-tools", getTools);
router.post("/delete-tool/:id", authMiddleware, deleteTool);
router.put("/update-tool/:id", authMiddleware, updateTool);
router.post("/reorder-tools", authMiddleware, reorderTools);

export default router;
