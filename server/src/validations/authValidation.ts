import zod from "zod";

export const loginSchema = zod.object({
	email: zod.string().email("invalid email format").min(1, "Email is required"),
	password: zod.string().min(1, "password is required"),
});

export const adminSchema = zod.object({
	username: zod.string().min(1, "Username is required"),
	email: zod.string().email("invalid email format").min(1, "Email is required"),
	password: zod.string().min(1, "Password is required"),
});
