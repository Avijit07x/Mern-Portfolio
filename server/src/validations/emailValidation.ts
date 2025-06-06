import zod from "zod";

const emailSchema = zod.object({
	name: zod.string().min(1, "Name is required"),
	email: zod.string().email("Invalid email address"),
	message: zod
		.string()
		.min(1, "Message is required")
		.max(1000, "Message must be under 1000 characters"),
});

export default emailSchema;
