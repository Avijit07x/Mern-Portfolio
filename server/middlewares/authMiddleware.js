const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const authMiddleware = async (req, res, next) => {
	const token = req.cookies._access_token;

	if (!token) {
		return res
			.status(401)
			.json({ success: false, message: "Unauthenticated: No token" });
	}
	try {
		const decoded = jwt.verify(token, process.env.TOKEN_KEY);

		if (!decoded) {
			return res
				.status(401)
				.json({ success: false, message: "Unauthenticated: Invalid token" });
		}

		const admin = await Admin.findById(decoded.user.id);

		if (!admin) {
			return res
				.status(401)
				.json({ success: false, message: "Unauthenticated: Invalid user" });
		}
		req.user = decoded.user;

		next();
	} catch (error) {
		return res.status(401).json({ success: false, message: "Unauthenticated" });
	}
};

module.exports = authMiddleware;
