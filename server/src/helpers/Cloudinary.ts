import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true,
});

// multer config
const storage: multer.StorageEngine = multer.memoryStorage();
const upload = multer({ storage });

// upload image
const ImageUploadUtil = async (image: string) => {
	const result = await cloudinary.uploader.upload(image, {
		resource_type: "image",
	});
	return result;
};

// delete image
const ImageDeleteUtil = async (imgId: string) => {
	const result = await cloudinary.uploader.destroy(imgId);
	return result;
};

export { ImageDeleteUtil, ImageUploadUtil, upload };
