import { RequestHandler } from "express";
import z from "zod";
import transport from "../../helpers/nodeMailer";
import { AppError } from "../../utils/AppError";
import asyncHandler from "../../utils/asyncHandler";
import env from "../../utils/env";
import emailSchema from "../../validations/emailValidation";

const sendEmail: RequestHandler = asyncHandler(async (req, res) => {
	const { success, data, error } = emailSchema.safeParse(req.body);

	if (!success || error) {
		throw new AppError("Validation failed", 400, z.flattenError(error));
	}

	const { name, email, message } = data;

	const htmlBody = `
		<div style="font-family: Arial, sans-serif; padding: 10px;">
			<p><strong>Name:</strong> ${name}</p>
			<p><strong>Email:</strong> ${email}</p>
			<p><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</p>
		</div>
	`;

	const mailOptions = {
		from: `"${name}" <${email}>`,
		to: env.GMAIL_ID,
		subject: "New message from Portfolio",
		html: htmlBody,
	};

	const info = await transport.sendMail(mailOptions);
	console.log({ info });

	if (!info.accepted.length) {
		throw new AppError("Failed to send email", 400);
	}

	res.status(200).json({
		success: true,
		message: "Email Sent",
	});
});

export { sendEmail };
