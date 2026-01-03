import { RequestHandler } from "express";
import mongoose from "mongoose";
import z from "zod";
import { ImageDeleteUtil } from "../../helpers/cloudinary";
import Project from "../../models/project";
import { IProject } from "../../types/types";
import { AppError } from "../../utils/AppError";
import asyncHandler from "../../utils/asyncHandler";
import {
	projectSchema,
	updateProjectSchema,
} from "../../validations/projectValidation";

// add a new Project
const addProject: RequestHandler = asyncHandler(async (req, res) => {
	const { success, data, error } = projectSchema.safeParse(req.body);

	if (!success || error) {
		throw new AppError("Validation failed", 400, z.flattenError(error));
	}

	const newProject = await Project.create(data);

	if (!newProject) {
		throw new AppError("Failed to create project", 400);
	}

	res.status(200).json({
		success: true,
		message: "Projects created successfully",
	});
});

// get all Projects
const getProjects: RequestHandler = asyncHandler(async (req, res) => {
	const projects = await Project.find()
		.sort({ order: 1 })
		.select("-image.public_id");
	res.status(200).json({
		success: true,
		message: "Projects fetched",
		projects,
	});
});

// update Project
const updateProject: RequestHandler = asyncHandler(async (req, res) => {
	const { id } = req.params;

	if (!id || !mongoose.Types.ObjectId.isValid(id)) {
		throw new AppError("Invalid or incorrect ID format.", 400);
	}

	const { data, success, error } = updateProjectSchema.safeParse(req.body);

	if (!success || error) {
		throw new AppError("Validation failed", 400, z.flattenError(error));
	}

	const project: IProject | null = await Project.findById(id);

	if (!project) {
		throw new AppError("Project not found", 404);
	}

	if (data.image?.url && data.image.public_id) {
		await ImageDeleteUtil(project.image.public_id);
	}

	project.image = data.image || project.image;
	project.title = data.title || project.title;
	project.description = data.description || project.description;
	project.tools = data.tools || project.tools;
	project.github_link = data.github_link || project.github_link;
	project.live_link = data.live_link || project.live_link;

	await project.save();

	res.status(200).json({
		success: true,
		message: "Project updated successfully",
	});
});

// delete Project
const deleteProject: RequestHandler = asyncHandler(async (req, res) => {
	const { id } = req.params;

	if (!id || !mongoose.Types.ObjectId.isValid(id)) {
		throw new AppError("Invalid or missing project ID", 400);
	}

	const project: IProject | null = await Project.findById(id);

	if (!project) {
		throw new AppError("Project not found", 404);
	}

	await ImageDeleteUtil(project.image.public_id);
	await Project.deleteOne({ _id: id });

	res.status(200).json({
		success: true,
		message: "Projects deleted successfully",
	});
});

// TODO: Implement reorderProjects handler logic

// reorder Projects
const reorderProjects: RequestHandler = asyncHandler(async (req, res) => {
	res.status(200).json({
		success: true,
		message: "Projects fetched",
	});
});

export {
	addProject,
	deleteProject,
	getProjects,
	reorderProjects,
	updateProject,
};
