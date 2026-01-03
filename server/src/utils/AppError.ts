export class AppError extends Error {
	statusCode: number;
	isOperational: boolean;
	details?: unknown;

	constructor(message: string, statusCode = 500, details?: unknown) {
		super(message);
		this.statusCode = statusCode;
		this.isOperational = true;
		this.details = details;

		Error.captureStackTrace(this, this.constructor);
	}
}
