import { NextFunction, Request, Response } from "express";
import { rateLimit } from "express-rate-limit";

const createRateLimiter = (max: number, windowMs: number, message: string) => {
	if (process.env.NODE_ENV !== "production") {
		return (req: Request, res: Response, next: NextFunction) => next();
	}

	return rateLimit({
		windowMs,
		max,
		standardHeaders: "draft-8",
		legacyHeaders: false,
		message: {
			status: 429,
			message,
		},
	});
};

export const limiter = createRateLimiter(
	100,
	15 * 60 * 1000, // 15 minutes
	"Too many requests from this IP, please try again later."
);

export const registerLimiter = createRateLimiter(
	10,
	5 * 60 * 1000, // 5 minutes
	"Too many register requests. Please try again later."
);

export const loginLimiter = createRateLimiter(
	20,
	5 * 60 * 1000, // 5 minutes
	"Too many login requests. Please try again later."
);
