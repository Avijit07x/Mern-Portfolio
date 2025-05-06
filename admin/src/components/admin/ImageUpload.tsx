import api from "@/utils/api";
import { FileIcon, Loader, UploadCloud, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export type UploadedImage = {
	url: string;
	public_id: string;
};

type ImageUploadProps = {
	setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
	imageFile: File | null;
	uploadedImageUrl: UploadedImage | "";
	setUploadedImageUrl: React.Dispatch<React.SetStateAction<UploadedImage | "">>;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
	setImageFile,
	imageFile,
	uploadedImageUrl,
	setUploadedImageUrl,
}) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setImageFile(file);
		}
	};

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		const file = event.dataTransfer.files[0];
		if (file) {
			setImageFile(file);
		}
	};

	const uploadImageToCloudinary = async () => {
		if (!imageFile) return;
		setIsLoading(true);
		try {
			const data = new FormData();
			data.append("image", imageFile);
			const response = await api.post("admin/image/upload-image", data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			if (response.data) {
				console.log("Image uploaded successfully");
				setUploadedImageUrl(response.data.result);
			}
		} catch (error: any) {
			toast.error(error.response.data.message || "Internal server error");
			console.error(error.response.data.message);
			setImageFile(null);
		} finally {
			setIsLoading(false);
		}
	};

	const deleteImageFromCloudinary = async () => {
		if (!uploadedImageUrl || typeof uploadedImageUrl === "string") return;

		try {
			setIsLoading(true);
			const response = await api.post("admin/image/delete-image", {
				id: uploadedImageUrl.public_id,
			});
			if (response.data.success) {
				setImageFile(null);
				if (inputRef.current) {
					inputRef.current.value = "";
				}
				setUploadedImageUrl("");
				console.log("Image deleted successfully");
			}
		} catch (error: any) {
			console.error(error.response?.data || error.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (imageFile && uploadedImageUrl === "") {
			uploadImageToCloudinary();
		}
	}, [imageFile]);

	return (
		<div className="mx-auto mt-4 w-full max-w-md">
			<Label className="my-4 block font-semibold">Upload Image</Label>
			<div
				className="border-muted-foreground/50 rounded-md border-2 border-dashed"
				onDragOver={!imageFile ? handleDragOver : undefined}
				onDrop={!imageFile ? handleDrop : undefined}
			>
				<Input
					type="file"
					id="image-upload"
					className="hidden"
					onChange={handleImageUpload}
					accept="image/*"
					ref={inputRef}
				/>
				{!imageFile ? (
					<Label
						htmlFor="image-upload"
						className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-md"
					>
						<UploadCloud className="text-muted-foreground size-10" />
						<span className="text-muted-foreground">
							Drag & drop or click to upload
						</span>
					</Label>
				) : isLoading ? (
					<div className="flex items-center justify-center gap-1 p-4">
						<Loader className="text-muted-foreground size-5 animate-spin" />
					</div>
				) : (
					<div className="flex items-center justify-between gap-1 p-4">
						<div className="flex items-center gap-1">
							<FileIcon className="size-5 text-white lg:size-7" />
							<p className="line-clamp-1 max-w-[152px] text-sm font-medium">
								{imageFile.name}
							</p>
						</div>
						<div className="flex items-center gap-3">
							<Button
								variant="ghost"
								className="cursor-pointer p-0 hover:bg-transparent"
								onClick={deleteImageFromCloudinary}
							>
								<X className="size-5 text-red-500" />
								<span className="sr-only">Remove image</span>
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ImageUpload;
