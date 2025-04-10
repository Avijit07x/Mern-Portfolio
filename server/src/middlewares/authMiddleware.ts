import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Admin from "../models/Admin";

export interface CustomRequest extends Request {
	user?: {
		id: string;
		email: string;
		username: string;
	};
}

const authMiddleware = async (
	req: CustomRequest,
	res: Response,
	next: NextFunction
) => {
	const token = req.cookies._access_token;

	if (!token) {
		res
			.status(401)
			.json({ success: false, message: "Unauthenticated: No token provided" });
		return;
	}

	try {
		const decoded = jwt.verify(
			token,
			process.env.TOKEN_KEY as string
		) as JwtPayload;

		const admin = await Admin.findById(decoded.user?.id);
		if (!admin) {
			res
				.status(401)
				.json({ success: false, message: "Unauthenticated: Admin not found" });
			return;
		}

		req.user = decoded.user;

		next();
	} catch (error: any) {
		res.status(401).json({
			success: false,
			message: "Unauthenticated: Token verification failed",
		});
		return;
	}
};

export default authMiddleware;
