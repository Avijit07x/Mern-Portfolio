const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const authMiddleware = async (req, res, next) => {
	const token = req.cookies._access_token;

	if (!token) {
		return res
			.status(401)
			.json({ success: false, message: "Unauthenticated: No token provided" });
	}

	try {
		const decoded = jwt.verify(token, process.env.TOKEN_KEY);

		const admin = await Admin.findById(decoded.user?.id);
		if (!admin) {
			return res
				.status(401)
				.json({ success: false, message: "Unauthenticated: Admin not found" });
		}

		req.user = decoded.user;

		next();
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: "Unauthenticated: Token verification failed",
		});
	}
};

module.exports = authMiddleware;
