import Joi from "joi";

export const loginSchema = Joi.object({
	email: Joi.string().email().required().messages({
		"string.empty": "Email is required",
		"string.email": "Email must be valid",
	}),
	password: Joi.string().min(6).required().messages({
		"string.empty": "Password is required",
	}),
});

export const registerSchema = Joi.object({
	username: Joi.string().required().messages({
		"string.empty": "Username is required",
	}),
	email: Joi.string().email().required().messages({
		"string.empty": "Email is required",
		"string.email": "Email must be valid",
	}),
	password: Joi.string().required().messages({
		"string.empty": "Password is required",
	}),
});
