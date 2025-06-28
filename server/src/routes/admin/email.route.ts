import express, { Router } from "express";
import { sendEmail } from "../../controllers/admin/email.controller";
import { mailLimiter } from "../../helpers/rateLimit";

const router: Router = express.Router();

router.post("/send-email", mailLimiter, sendEmail);

export default router;
