const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectToDB = require("./db/db");
const authRoute = require("./routes/auth/authRoute");
const projectRoute = require("./routes/admin/ProjectRoute");
const toolRoute = require("./routes/admin/ToolRoute");
const imageRoute = require("./routes/admin/ImageRoute");
const helmet = require("helmet");
const limiter = require("./helpers/RateLimit");
const compression = require("compression");
const morgan = require("morgan");
const emailRoute = require("./routes/admin/EmailRoute");

const app = express();
const PORT = process.env.PORT || 8000;

// Logger
app.use(morgan("dev"));

// Security Middleware
app.use(helmet());

// CORS Configuration
app.use(
	cors({
		origin: [process.env.CLIENT_URL, process.env.ADMIN_URL],
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

// Database Connection
connectToDB();

// Routes
app.use("/api/auth", authRoute);
app.use("/api/admin/project", projectRoute);
app.use("/api/admin/tool", toolRoute);
app.use("/api/admin/image", imageRoute);
app.use("/api/admin/email", emailRoute);

// Health Check Route
app.get("/", (req, res) => {
	res.status(200).json("Server is up & running");
});

// Middleware to handle stream errors
app.use((err, req, res, next) => {
	if (err.message.includes("Stream is already ended")) {
		console.error("Stream error:", err.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
	next();
});

// Start Server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
