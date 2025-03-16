const jwt = require("jsonwebtoken");

// Function to generate access token
const generate_access_token = (user) => {
	return jwt.sign({ user }, process.env.TOKEN_KEY, {
		expiresIn: process.env.TOKEN_KEY_EXPIRY,
	});
};

const access_tokenOptions = {
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
	maxAge: 7 * 24 * 60 * 60 * 1000,
};

module.exports = {
	generate_access_token,
	access_tokenOptions,
};
