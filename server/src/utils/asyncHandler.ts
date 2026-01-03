import { NextFunction, Request, RequestHandler, Response } from "express";

const asyncHandler =
	(
		fn: (
			req: Request,
			res: Response,
			next: NextFunction
		) => Promise<unknown>
	): RequestHandler =>
	(req, res, next) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};

export default asyncHandler;
