const bcrypt = require("bcryptjs");
const {
	generate_access_token,
	access_tokenOptions,
} = require("../../helpers/JwtGenerate");
const Admin = require("../../models/Admin");

// register
const registerUser = async (req, res) => {
	const { username, email, password } = req.body;
	try {
		// validation
		if (!(username && email && password)) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}

		// check if user already exists
		const existingUser = await Admin.findOne({ email });

		if (existingUser) {
			return res
				.status(409)
				.json({ success: false, message: "User already exists" });
		}

		// hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		const admin = {
			username,
			email,
			password: hashedPassword,
		};

		const newAdmin = new Admin(admin);
		await newAdmin.save();

		res.status(201).json({ success: true, message: "User registered" });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// login controller
const loginUser = async (req, res) => {
	const { email, password } = req.body;
	if (!(email && password)) {
		return res.json({ success: false, message: "All fields are required" });
	}
	try {
		const admin = await Admin.findOne({ email });

		if (!admin) {
			return res.json({ success: false, message: "User not found" });
		}

		// Check password
		const isPasswordCorrect = await bcrypt.compare(password, admin.password);

		if (!isPasswordCorrect) {
			return res.json({ success: false, message: "Incorrect password" });
		}

		const user = {
			id: admin._id,
			email: admin.email,
			username: admin.username,
		};

		// create access token
		const access_token = generate_access_token(user);

		// Set cookie and return response
		return res
			.status(200)
			.cookie("_access_token", access_token, access_tokenOptions)
			.json({
				success: true,
				user,
				message: "Login successful",
			});
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: "Internal server error" });
	}
};

// logout
const logoutUser = (req, res) => {
	res
		.clearCookie("_access_token", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
			path: "/",
		})
		.status(200)
		.json({ success: true, message: "User Logged Out" });
};

module.exports = {
	registerUser,
	loginUser,
	logoutUser,
};
