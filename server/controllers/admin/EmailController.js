const sendEmail = (req, res) => {
	res.status(200).json({ success: true, message: "Email Sent" });
};

module.exports = { sendEmail };
