const { rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 300,
	standardHeaders: "draft-8",
	legacyHeaders: false,
	message: {
		status: 429,
		message: "Too many requests from this IP, please try again later.",
	},
});

module.exports =
	process.env.NODE_ENV === "production" ? limiter : (req, res, next) => next();
