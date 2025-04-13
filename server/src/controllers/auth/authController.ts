import bcrypt from "bcryptjs";

import { Request, Response } from "express";
import {
	access_tokenOptions,
	generate_access_token,
} from "../../helpers/JwtGenerate";
import Admin from "../../models/Admin";
import { loginSchema } from "../../validations/authValidation";

// register
// const registerUser = async (req: Request, res: Response) => {
// 	const { username, email, password } = req.body  ?? {};
// 	try {
// 		// validation
// 		if (!(username && email && password)) {
// 			res
// 				.status(400)
// 				.json({ success: false, message: "All fields are required" });
// 		}

// 		// check if user already exists
// 		const existingUser = await Admin.findOne({ email });

// 		if (existingUser) {
// 			res.status(409).json({ success: false, message: "User already exists" });
// 		}

// 		// hash password
// 		const hashedPassword = await bcrypt.hash(password, 10);

// 		const admin = {
// 			username,
// 			email,
// 			password: hashedPassword,
// 		};

// 		const newAdmin = new Admin(admin);
// 		await newAdmin.save();

// 		res.status(201).json({ success: true, message: "User registered" });
// 	} catch (error: any) {
// 		res.status(500).json({ success: false, message: error.message });
// 	}
// };

// login controller
const loginUser = async (req: Request, res: Response) => {
	const { email, password } = req.body ?? {};

	const { error } = loginSchema.validate({ email, password });

	if (error) {
		res.status(400).json({ success: false, message: error.details[0].message });
		return;
	}

	try {
		const admin = await Admin.findOne({ email });

		if (!admin) {
			res.status(404).json({ success: false, message: "User not found" });
			return;
		}

		// Check password
		const isPasswordCorrect = await bcrypt.compare(password, admin.password);

		if (!isPasswordCorrect) {
			res.json({ success: false, message: "Incorrect password" });
			return;
		}

		const user = {
			id: admin._id,
			email: admin.email,
			username: admin.username,
		};

		// create access token
		const access_token = generate_access_token(user);

		// Set cookie and return response
		res
			.status(200)
			.cookie("_access_token", access_token, access_tokenOptions)
			.json({
				success: true,
				user,
				message: "Login successful",
			});
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

// logout
const logoutUser = (req: Request, res: Response) => {
	res
		.clearCookie("_access_token", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
			path: "/",
		})
		.status(200)
		.json({ success: true, message: "User Logged Out" });
};

export { loginUser, logoutUser };
