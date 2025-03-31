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

const app = express();
const PORT = process.env.PORT || 8000;

// Logger
app.use(morgan("dev"));

// Helmet Security
app.use(helmet());

// Cors
app.use(
	cors({
		origin: [process.env.CLIENT_URL, process.env.ADMIN_URL],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

app.use(cookieParser());
app.use(express.json({ limit: "5mb" }));
app.use(compression());
app.use(limiter);

// DB Connection
connectToDB();

// Routes
app.use("/api/auth", authRoute);
app.use("/api/admin/project", projectRoute);
app.use("/api/admin/tool", toolRoute);
app.use("/api/admin/image", imageRoute);

app.get("/", (req, res) => {
	res.status(200).json("Server is up & running");
});

app.listen(PORT, () => {
	console.log("Server is running on port 8000");
});
