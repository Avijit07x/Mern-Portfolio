const express = require("express");
const {

	loginUser,
	logoutUser,
} = require("../../controllers/auth/authController");
const { loginLimiter } = require("../../helpers/AuthLimit");
const authMiddleware = require("../../middlewares/authMiddleware");

const router = express.Router();

// router.post("/register", registerLimiter, registerUser);
router.post("/login", loginLimiter, loginUser);
router.post("/logout", logoutUser);
router.get("/check-auth", authMiddleware, (req, res) => {
	const user = req.user;
	return res
		.status(200)
		.json({ success: true, message: "Authenticated user", user });
});

module.exports = router;
