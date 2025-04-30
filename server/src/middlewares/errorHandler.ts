import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import env from "utils/env";

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
		stack: env.isProd ? null : err.stack,
	});
};

export { errorHandler };
