import express, { Router } from "express";
import {
	addProject,
	deleteProject,
	getProjects,
	updateProject,
} from "../../controllers/admin/ProjectController";
import authMiddleware from "../../middlewares/authMiddleware";

const router: Router = express.Router();

router.post("/add-project", authMiddleware, addProject);
router.get("/get-projects", getProjects);
router.post("/delete-project/:id", authMiddleware, deleteProject);
router.put("/update-project", authMiddleware, updateProject);

export default router;
