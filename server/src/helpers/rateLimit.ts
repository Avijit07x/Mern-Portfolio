import { NextFunction, Request, Response } from "express";
import { rateLimit } from "express-rate-limit";
import env from "../utils/env";

const createRateLimiter = (max: number, windowMs: number) => {
	if (env.isDev) {
		return (req: Request, res: Response, next: NextFunction) => next();
	}

	return rateLimit({
		windowMs,
		max,
		standardHeaders: "draft-8",
		legacyHeaders: false,
		message: {
			status: 429,
			message: "Too many requests from this IP, please try again later.",
		},
	});
};

export const limiter = createRateLimiter(
	100,
	15 * 60 * 1000 // 15 minutes
);

export const registerLimiter = createRateLimiter(
	10,
	24 * 60 * 60 * 1000 // 24 hours
);

export const loginLimiter = createRateLimiter(
	20,
	24 * 60 * 60 * 1000 // 24 hours
);

export const mailLimiter = createRateLimiter(
	2,
	24 * 60 * 60 * 1000 // 24 hours
);
