const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true,
});

// multer config
const storage = new multer.memoryStorage();
const upload = multer({ storage });

// upload image
const ImageUploadUtil = async (image) => {
	try {
		const result = await cloudinary.uploader.upload(image, {
			resource_type: "auto",
		});
		return result;
	} catch (error) {
		return error;
	}
};

// delete image
const ImageDeleteUtil = async (imgId) => {
	try {
		const result = await cloudinary.uploader.destroy(imgId);
		return result;
	} catch (error) {
		return error;
	}
};

module.exports = { upload, ImageUploadUtil, ImageDeleteUtil };
