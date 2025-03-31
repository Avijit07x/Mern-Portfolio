const express = require("express");

const {
	addProject,
	getProjects,
	deleteProject,
	updateProject,
} = require("../../controllers/admin/ProjectController");
const authMiddleware = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post("/add-project", authMiddleware, addProject);
router.get("/get-projects", getProjects);
router.post("/delete-project/:id", authMiddleware, deleteProject);
router.put("/update-project", authMiddleware, updateProject);

module.exports = router;
