import { NextFunction, Request, Response } from "express";
import { rateLimit } from "express-rate-limit";
import env from "utils/env";

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
	5 * 60 * 1000 // 5 minutes
);

export const loginLimiter = createRateLimiter(
	20,
	5 * 60 * 1000 // 5 minutes
);
