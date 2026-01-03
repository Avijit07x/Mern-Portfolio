import bcrypt from "bcryptjs";
import { RequestHandler } from "express";
import z from "zod";
import {
	access_tokenOptions,
	generate_access_token,
} from "../../helpers/jwtGenerate";
import Admin from "../../models/admin";
import { AppError } from "../../utils/AppError";
import asyncHandler from "../../utils/asyncHandler";
import env from "../../utils/env";
import { loginSchema } from "../../validations/authValidation";

// register
// const registerUser: RequestHandler = asyncHandler(async (req, res) => {
// 	const { error, data, success } = adminSchema.safeParse(req.body);

// 	if (!success || error) {
// 		throw new AppError("Validation failed", 400, z.flattenError(error));
// 	}

// 	// check if user already exists
// 	const existingUser = await Admin.findOne({ email: data?.email });

// 	if (existingUser) {
// 		throw new AppError("User already exists", 409);
// 	}

// 	// hash password
// 	const hashedPassword = await bcrypt.hash(data?.password, 10);

// 	const admin = {
// 		username: data?.username,
// 		email: data?.email,
// 		password: hashedPassword,
// 	};

// 	const newAdmin = new Admin(admin);
// 	await newAdmin.save();

// 	res.status(201).json({ success: true, message: "User registered" });
// });

// login controller
const loginUser: RequestHandler = asyncHandler(async (req, res) => {
	const { success, data, error } = loginSchema.safeParse(req.body);

	if (!success || error) {
		throw new AppError("Validation failed", 400, z.flattenError(error));
	}

	const { email, password } = data;

	const admin = await Admin.findOne({ email });

	if (!admin) {
		throw new AppError("Invalid email or password", 401);
	}

	const isPasswordCorrect = await bcrypt.compare(password, admin.password);

	if (!isPasswordCorrect) {
		throw new AppError("Invalid email or password", 401);
	}

	const user = {
		id: admin._id,
		email: admin.email,
		username: admin.username,
	};

	const access_token = generate_access_token(user);

	res.status(200)
		.cookie("_access_token", access_token, access_tokenOptions)
		.json({
			success: true,
			user,
			message: "Login successful",
		});
});

// logout
const logoutUser: RequestHandler = asyncHandler(async (req, res) => {
	res.clearCookie("_access_token", {
		httpOnly: true,
		secure: env.isProd,
		sameSite: env.isProd ? "none" : "lax",
		path: "/",
	});

	res.status(200).json({
		success: true,
		message: "User Logged Out",
	});
});

export { loginUser, logoutUser };
