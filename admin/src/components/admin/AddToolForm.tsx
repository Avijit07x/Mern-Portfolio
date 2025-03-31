import { useAppDispatch } from "@/store/hooks";
import { fetchTools } from "@/store/toolSlice";
import api from "@/utils/api";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { UploadedImage } from "./ImageUpload";

type AddToolFormProps = {
	uploadedImageUrl: any;
	setOpenCreateProductsDialog: React.Dispatch<React.SetStateAction<boolean>>;
	setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
	toolName: string;
	setToolName: React.Dispatch<React.SetStateAction<string>>;
	currentEditedTool: string | null;
	setUploadedImageUrl: React.Dispatch<React.SetStateAction<UploadedImage | "">>;
};

const AddToolForm: React.FC<AddToolFormProps> = ({
	uploadedImageUrl,
	setOpenCreateProductsDialog,
	setImageFile,
	toolName,
	setToolName,
	currentEditedTool,
	setUploadedImageUrl,
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setToolName(e.target.value);
	};

	// create
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!toolName || !uploadedImageUrl) {
			toast.error("Please fill all fields");
			return;
		}
		try {
			setIsLoading(true);
			const data = {
				name: toolName,
				image: {
					url: uploadedImageUrl.url,
					public_id: uploadedImageUrl.public_id,
				},
			};
			const res = await api.post("admin/tool/add-tool", data);
			if (res.data.success) {
				toast.success(res.data.message);
				dispatch(fetchTools());
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
			setToolName("");
			setImageFile(null);
			setUploadedImageUrl("");
			setOpenCreateProductsDialog(false);
		}
	};

	// update
	const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			// setIsLoading(true);
			const data = {
				name: toolName,
				image: {
					url: uploadedImageUrl.url,
					public_id: uploadedImageUrl.public_id,
				},
			};
			const res = await api.put(
				`admin/tool/update-tool/${currentEditedTool}`,
				data,
			);
			if (res.data.success) {
				toast.success(res.data.message);
				dispatch(fetchTools());
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
			setToolName("");
			setImageFile(null);
			setOpenCreateProductsDialog(false);
		}
	};

	return (
		<div>
			<form onSubmit={currentEditedTool !== null ? handleUpdate : handleSubmit}>
				{currentEditedTool !== null && (
					<p className="text-muted-foreground mt-2 text-xs">
						Note: If you upload a new image, the old one will be replaced
					</p>
				)}
				<div className="mt-4 space-y-4">
					<Label htmlFor="name">Tool Name</Label>
					<Input
						type="text"
						name="name"
						id="name"
						value={toolName}
						onChange={handleChange}
						className="border-muted-foreground/50 py-5 selection:bg-blue-500"
						placeholder="Enter tool name"
					/>
				</div>

				<Button
					type="submit"
					disabled={isLoading}
					className="mt-4 w-full cursor-pointer bg-[#8946ff] py-5 hover:bg-[#8946ff]/90"
				>
					{isLoading ? (
						<span className="flex items-center justify-center gap-2 text-sm">
							<Loader className="size-4 animate-spin" /> Adding Tool
						</span>
					) : currentEditedTool !== null ? (
						"Update Tool"
					) : (
						"Add Tool"
					)}
				</Button>
			</form>
		</div>
	);
};

export default AddToolForm;
