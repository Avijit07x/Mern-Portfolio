import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import env from "../utils/env";

cloudinary.config({
	cloud_name: env.CLOUDINARY_CLOUD_NAME,
	api_key: env.CLOUDINARY_API_KEY,
	api_secret: env.CLOUDINARY_API_SECRET,
	secure: true,
});

// multer config
const storage: multer.StorageEngine = multer.memoryStorage();
const upload = multer({ storage });

// upload image
const ImageUploadUtil = async (image: string) => {
	const result = await cloudinary.uploader.upload(image, {
		resource_type: "image",
		eager: [
			{
				format: "webp", // convert to WebP
				quality: "auto", // optimize quality
			},
		],
		eager_async: false, // wait for transformation to finish
	});
	return {
		url: result.eager?.[0]?.secure_url,
		public_id: result.public_id,
	};
};

// delete image
const ImageDeleteUtil = async (imgId: string) => {
	const result = await cloudinary.uploader.destroy(imgId);
	return result;
};

export { ImageDeleteUtil, ImageUploadUtil, upload };
