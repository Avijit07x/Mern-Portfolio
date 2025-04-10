import { rateLimit } from "express-rate-limit";

export const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 200,
	standardHeaders: "draft-8",
	legacyHeaders: false,
	message: {
		status: 429,
		message: "Too many requests from this IP, please try again later.",
	},
});
