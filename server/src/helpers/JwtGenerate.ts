import { CookieOptions } from "express";
import jwt from "jsonwebtoken";
import ms from "ms";
import env from "utils/env";

interface UserPayload {
	email: string;
	username: string;
}

// Function to generate access token
export const generate_access_token = (user: UserPayload) => {
	try {
		const secret = env.TOKEN_KEY;
		const expiresIn = env.TOKEN_KEY_EXPIRY as ms.StringValue;

		return jwt.sign({ user }, secret, { expiresIn });
	} catch (error) {
		console.error("Error generating access token:", error);
		return null;
	}
};

// Cookie options
export const access_tokenOptions: CookieOptions = {
	httpOnly: true,
	secure: env.isProd,
	sameSite: (env.isProd ? "none" : "lax") as "lax" | "none",
	maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
};
