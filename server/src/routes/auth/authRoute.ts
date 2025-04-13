import express, { Response, Router } from "express";
import { loginUser, logoutUser } from "../../controllers/auth/authController";
import { loginLimiter } from "../../helpers/RateLimit";
import authMiddleware, {
	CustomRequest,
} from "../../middlewares/authMiddleware";

const router: Router = express.Router();

// router.post("/register", registerLimiter, registerUser);
router.post("/login", loginLimiter, loginUser);
router.post("/logout", logoutUser);
router.get(
	"/check-auth",
	authMiddleware,
	(req: CustomRequest, res: Response) => {
		const user = req.user;
		res
			.status(200)
			.json({ success: true, message: "Authenticated user", user });
		return;
	}
);

export default router;
