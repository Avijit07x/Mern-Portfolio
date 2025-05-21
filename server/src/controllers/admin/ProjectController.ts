import { NextFunction, Request, RequestHandler, Response } from "express";
import { ImageDeleteUtil } from "../../helpers/Cloudinary";
import Project from "../../models/Project";
import projectSchema from "../../validations/projectValidation";

// add a new Project
const addProject: RequestHandler = async (req: Request, res: Response) => {
	const { success, data, error } = projectSchema.safeParse(req.body);
	if (!success || error) {
		const errorDetails = error.issues.map((err) => ({
			field: err.path.join(","),
			message: err.message,
		}));
		res.status(400).json({ success, message: errorDetails });
		return;
	}
	try {
		const newProject = await Project.create(data);
		if (!newProject) {
			res
				.send(400)
				.json({ success: false, message: "Failed to create project" });
			return;
		}

		res.status(200).json({
			success: true,
			message: "Projects created successfully",
		});
	} catch (error) {
		res.status(500).json({ success: false, message: "Something went wrong" });
	}
};

// get all Projects
const getProjects: RequestHandler = async (req: Request, res: Response) => {
	try {
		const projects = await Project.find()
			.sort({ order: 1 })
			.select("-image.public_id");
		res
			.status(200)
			.json({ success: true, message: "Projects fetched", projects });
	} catch (error) {
		res.status(500).json({ success: false, message: "Something went wrong" });
	}
};

// update Project
const updateProject: RequestHandler = async (req: Request, res: Response) => {
	try {
		res.status(200).json({ success: true, message: "Projects fetched" });
	} catch (error) {
		res.status(500).json({ success: false, message: "Something went wrong" });
	}
};

// delete Project
const deleteProject: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;
	if (!id || typeof id !== "string") {
		res
			.status(400)
			.json({ success: false, message: "Invalid or missing project ID" });
		return;
	}
	try {
		const project = await Project.findById(id);

		if (!project) {
			res.status(404).json({ success: false, message: "Project not found" });
			return;
		}

		ImageDeleteUtil(project.image.public_id);
		await Project.deleteOne({ _id: id });

		res.status(200).json({
			success: true,
			message: "Projects deleted successfully",
		});
	} catch (error) {
		res.status(500).json({ success: false, message: "Something went wrong" });
	}
};

// reorder Projects
const reorderProjects: RequestHandler = async (req: Request, res: Response) => {
	try {
		res.status(200).json({ success: true, message: "Projects fetched" });
	} catch (error) {
		res.status(500).json({ success: false, message: "Something went wrong" });
	}
};

export {
	addProject,
	deleteProject,
	getProjects,
	reorderProjects,
	updateProject,
};
