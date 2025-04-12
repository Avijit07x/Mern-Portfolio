import { Request, Response } from "express";

const sendEmail = (req: Request, res: Response) => {
	res.status(200).json({ success: true, message: "Email Sent" });

};

export { sendEmail };
