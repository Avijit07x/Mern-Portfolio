import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

const errorHandler: ErrorRequestHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const statusCode = err.statusCode || 500;

	res.status(statusCode).json({
		success: false,
		message: err.message || "Internal Server Error",
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	});
};

export { errorHandler };
