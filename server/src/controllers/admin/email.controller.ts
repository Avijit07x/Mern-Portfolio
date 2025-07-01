import { Request, Response } from "express";
import transport from "../../helpers/nodeMailer";
import env from "../../utils/env";
import emailSchema from "../../validations/emailValidation";

const sendEmail = async (req: Request, res: Response) => {
	const { data, error, success } = emailSchema.safeParse(req.body);

	if (!success || error) {
		res.status(400).json({ success, message: error.flatten().fieldErrors });
		return;
	}
	const htmlBody = `
		<div style="font-family: Arial, sans-serif; padding: 10px;">		
			<p><strong>Name:</strong> ${data.name}</p>
			<p><strong>Email:</strong> ${data.email}</p>
			<p><strong>Message:</strong><br>${data.message.replace(/\n/g, "<br>")}</p>
		</div>
	`;

	const mainOption = {
		from: `"${data.name}" <${data.email}>`,
		to: env.GMAIL_ID,
		subject: "New message from Portfolio",
		html: htmlBody,
	};
	try {
		await transport.sendMail(mainOption);
		res.status(200).json({ success: true, message: "Email Sent" });
	} catch (error: any) {
		res.status(400).json({
			success: false,
			message: "Failed to send email. Please try again later.",
			error: error.message,
		});
	}
};

export { sendEmail };
