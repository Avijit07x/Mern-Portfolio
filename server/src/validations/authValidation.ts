import zod from "zod";

export const loginSchema = zod.object({
	email: zod
		.string()
		.email("invalid email format")
		.min(1, "Email is required")
		.max(254, "Email must be under 254 characters"),
	password: zod
		.string()
		.min(1, "password is required")
		.max(100, "Password must be under 100 characters"),
});

export const adminSchema = zod.object({
	username: zod.string().min(1, "Username is required"),
	email: zod.string().email("invalid email format").min(1, "Email is required"),
	password: zod.string().min(1, "Password is required"),
});
