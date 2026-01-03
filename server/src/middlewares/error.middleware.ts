import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

const errorHandler = (
	err: Error | AppError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const statusCode = err instanceof AppError ? err.statusCode : 500;

	const message =
		err instanceof AppError ? err.message : "Internal Server Error";

	const errors = err instanceof AppError ? err.details : undefined;

	res.status(statusCode).json({
		success: false,
		message,
		errors,
	});
};

export default errorHandler;
