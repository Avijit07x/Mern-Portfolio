import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Admin from "../models/admin";
import { AppError } from "../utils/AppError";
import asyncHandler from "../utils/asyncHandler";
import env from "../utils/env";

export interface CustomRequest extends Request {
	user?: {
		id: string;
		email: string;
		username: string;
	};
}

interface TokenPayload extends JwtPayload {
	user?: {
		id: string;
		email: string;
		username: string;
	};
}

const authMiddleware = asyncHandler(
	async (req: CustomRequest, res: Response, next: NextFunction) => {
		const token = req.cookies?._access_token;

		if (!token) {
			throw new AppError("Unauthenticated: No token provided", 401);
		}

		let decoded: TokenPayload;

		try {
			decoded = jwt.verify(token, env.TOKEN_KEY, {
				algorithms: ["HS256"],
			}) as TokenPayload;
		} catch {
			throw new AppError(
				"Unauthenticated: Invalid or expired token",
				401
			);
		}

		if (!decoded?.user?.id) {
			throw new AppError("Unauthenticated: Invalid token payload", 401);
		}

		const admin = await Admin.findById(decoded.user.id);

		if (!admin) {
			throw new AppError("Unauthenticated: Admin not found", 401);
		}

		req.user = {
			id: admin._id.toString(),
			email: admin.email,
			username: admin.username,
		};

		next();
	}
);

export default authMiddleware;
