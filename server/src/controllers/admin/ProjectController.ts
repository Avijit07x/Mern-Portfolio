import { Request, RequestHandler, Response } from "express";
import Project from "../../models/Project";

// add a new Project
const addProject: RequestHandler = async (req: Request, res: Response) => {
	try {
		res.status(200).json({ success: true, message: "Projects fetched" });
	} catch (error) {
		res.status(500).json({ success: false, message: "Something went wrong" });
	}
};

// get all Projects

const getProjects: RequestHandler = async (req: Request, res: Response) => {
	try {
		const projects = await Project.find().sort({ order: 1 });
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
const deleteProject: RequestHandler = async (req: Request, res: Response) => {
	try {
		res.status(200).json({ success: true, message: "Projects fetched" });
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
