import nodemailer from "nodemailer";
import env from "../utils/env";

const transport = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: env.GMAIL_USER,
		pass: env.GMAIL_PASSWORD,
	},
});

export default transport;
