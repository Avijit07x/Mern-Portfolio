import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
	addTool,
	fetchTools,
	setToolFormData,
	updateTool,
} from "@/store/toolSlice";
import { IToolUpdateData, IUploadedImage } from "@/types/types";
import { Loader } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";


type Props = {
	uploadedImageUrl: IUploadedImage;
	setOpenAddToolDialog: Dispatch<SetStateAction<boolean>>;
	setImageFile: Dispatch<SetStateAction<File | null>>;
	setUploadedImageUrl: Dispatch<SetStateAction<IUploadedImage | string>>;
};

const AddToolForm: React.FC<Props> = ({
	uploadedImageUrl,
	setOpenAddToolDialog,
	setImageFile,
	setUploadedImageUrl,
}) => {
	const { formData, currentEditingId } = useAppSelector((store) => store.tool);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	// handle input change
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		dispatch(
			setToolFormData({
				name: value,
			}),
		);
	};

	// create tool
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!formData.name || !uploadedImageUrl) {
			toast.error("Please fill all fields");
			return;
		}
		try {
			setIsLoading(true);
			const data = {
				name: formData.name,
				image: {
					url: uploadedImageUrl.url,
					public_id: uploadedImageUrl.public_id,
				},
			};
			const { message } = await dispatch(addTool(data)).unwrap();

			if (message) {
				toast.success(message);
				dispatch(fetchTools());
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
			dispatch(setToolFormData({}));
			setImageFile(null);
			setUploadedImageUrl("");
			setOpenAddToolDialog(false);
		}
	};

	// update tool
	const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { url, public_id } = uploadedImageUrl;
		setIsLoading(true);

		const data: IToolUpdateData = {
			id: currentEditingId,
			name: formData.name,
		};

		if (url && public_id) {
			data.image = {
				url,
				public_id,
			};
		}

		const { success, message } = await dispatch(updateTool(data)).unwrap();
		if (success) {
			toast.success(message);
			dispatch(fetchTools());
			dispatch(setToolFormData({}));
			setImageFile(null);
			setUploadedImageUrl("");
			setOpenAddToolDialog(false);
		}
		setIsLoading(false);
	};

	return (
		<div>
			<form onSubmit={currentEditingId !== null ? handleUpdate : handleSubmit}>
				{currentEditingId !== null && (
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
						value={formData.name}
						onChange={handleChange}
						className="border-muted-foreground/50 py-5 selection:bg-blue-500"
						placeholder="Enter tool name"
						autoComplete="off"
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
					) : currentEditingId !== null ? (
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
