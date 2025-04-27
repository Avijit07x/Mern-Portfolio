import { CookieOptions } from "express";
import jwt from "jsonwebtoken";
import ms from "ms";

interface UserPayload {
	email: string;
	username: string;
}

// Function to generate access token
export const generate_access_token = (user: UserPayload) => {
	try {
		const secret = process.env.TOKEN_KEY as string;
		const expiresIn = process.env.TOKEN_KEY_EXPIRY as ms.StringValue;

		if (!secret || !expiresIn) {
			throw new Error(
				"Missing TOKEN_KEY or TOKEN_KEY_EXPIRY in environment variables"
			);
		}

		return jwt.sign({ user }, secret, { expiresIn });
	} catch (error) {
		console.error("Error generating access token:", error);
		return null;
	}
};

// Cookie options
export const access_tokenOptions: CookieOptions = {
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: (process.env.NODE_ENV === "production" ? "none" : "lax") as
		| "lax"
		| "none",
	maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
};
