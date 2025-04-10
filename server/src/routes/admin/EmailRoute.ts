import express, { Router } from "express";
import { sendEmail } from "../../controllers/admin/EmailController";

const router: Router = express.Router();

router.post("/send-email", sendEmail);

export default router;
