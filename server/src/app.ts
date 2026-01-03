import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import connectToDB from "./db/db";
import { limiter } from "./helpers/rateLimit";
import errorHandler from "./middlewares/error.middleware";
import { notFound } from "./middlewares/notFound";
import emailRoute from "./routes/admin/email.route";
import imageRoute from "./routes/admin/image.route";
import projectRoute from "./routes/admin/project.route";
import toolRoute from "./routes/admin/tool.route";
import authRoute from "./routes/auth/auth.route";
import env from "./utils/env";

const app: Express = express();

const PORT = env.PORT || 8000;

// Logger
app.use(morgan("dev"));

// Trust Proxy
app.set("trust proxy", 1);

// Security Middleware
app.use(helmet());

// CORS Configuration
app.use(
	cors({
		origin: [env.CLIENT_URL, env.ADMIN_URL, env.PROD_URL],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

app.use(cookieParser());
app.use(express.json({ limit: "5mb" }));

// Apply Compression Globally
app.use(compression());

// Rate Limiting
app.use(limiter);

// Connect to DB
connectToDB();

// Routes
app.use("/api/auth", authRoute);
app.use("/api/admin/tool", toolRoute);
app.use("/api/admin/image", imageRoute);
app.use("/api/admin/project", projectRoute);
app.use("/api/admin/email", emailRoute);

app.get("/", (req: Request, res: Response) => {
	res.status(200).json("Server is up & running");
});

// 404 Not Found Middleware
app.use(notFound);

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
