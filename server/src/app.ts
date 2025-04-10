import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import connectToDB from "./db/db";
import { limiter } from "./helpers/RateLimit";
import imageRoute from "./routes/admin/ImageRoute";
import toolRoute from "./routes/admin/ToolRoute";
import authRoute from "./routes/auth/authRoute";
dotenv.config();

const app: Express = express();

const PORT = process.env.PORT || 8000;
const ADMIN_URL = process.env.ADMIN_URL as string;
const CLIENT_URL = process.env.CLIENT_URL as string;

// Logger
app.use(morgan("dev"));

// Trust Proxy
app.set("trust proxy", true);

// Security Middleware
app.use(helmet());

// CORS Configuration
app.use(
	cors({
		origin: [CLIENT_URL, ADMIN_URL],
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
// app.use("/api/admin/project", projectRoute);
// app.use("/api/admin/email", emailRoute);

app.get("/", (req: Request, res: Response) => {
	res.status(200).json("Server is up & running");
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
