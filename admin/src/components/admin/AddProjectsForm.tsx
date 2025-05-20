import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
	addProject,
	fetchProjects,
	preTags,
	setProjectFormData,
	setTags,
} from "@/store/projectSlice";
import { IProjectPayload } from "@/types/types";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { UploadedImage } from "./ImageUpload";
import TagInputForm from "./TagInputForm";

type Props = {
	uploadedImageUrl: any;
	setOpenCreateProductsDialog: React.Dispatch<React.SetStateAction<boolean>>;
	setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
	setUploadedImageUrl: React.Dispatch<React.SetStateAction<UploadedImage | "">>;
};

const AddProjectsForm: React.FC<Props> = ({
	uploadedImageUrl,
	setUploadedImageUrl,
	setImageFile,
	setOpenCreateProductsDialog,
}) => {
	const { currentEditingId, formData, tags } = useAppSelector(
		(state) => state.project,
	);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { value, name } = e.target;
		dispatch(setProjectFormData({ ...formData, [name]: value }));
	};

	// handle Add project
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!uploadedImageUrl || !formData || tags.length === 0) {
			toast.error("Please fill in all the fields");
			return;
		}

		const data: IProjectPayload = {
			image: {
				url: uploadedImageUrl.url,
				public_id: uploadedImageUrl.public_id,
			},
			tools: tags,
			...formData,
		};

		try {
			setIsSubmitting(true);
			const res = await dispatch(addProject(data)).unwrap();
			if (res.success) {
				dispatch(setTags(preTags));
				dispatch(fetchProjects());
				dispatch(setProjectFormData({}));
				setUploadedImageUrl("");
				setImageFile(null);
				setOpenCreateProductsDialog(false);
				toast.success("Project added successfully");
			} else {
				toast.error(res.message || "Failed to add project");
			}
		} catch (error: any) {
			console.error(error);
			toast.error(error.message || "An error occurred");
		} finally {
			setIsSubmitting(false);
		}
	};

	// handle update project
	const handleUpdate = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(formData)
		console.log(tags)
	};

	return (
		<div>
			<form onSubmit={currentEditingId ? handleUpdate : handleSubmit}>
				<div className="mt-4 space-y-4">
					<Label htmlFor="title">Project Name</Label>
					<Input
						type="text"
						name="title"
						id="title"
						value={formData?.title}
						onChange={handleChange}
						className="border-muted-foreground/50 py-5 selection:bg-blue-500"
						placeholder="Enter project name"
						autoComplete="off"
					/>
				</div>
				<div className="mt-4 space-y-4">
					<Label htmlFor="description">Project Description</Label>
					<Textarea
						name="description"
						id="description"
						value={formData?.description}
						onChange={handleChange}
						className="border-muted-foreground/50 no-scrollbar h-25 resize-none py-2.5 selection:bg-blue-500"
						placeholder="Enter project description"
						autoComplete="off"
					/>
				</div>
				<div>
					<TagInputForm />
				</div>
				<div>
					<Button
						type="submit"
						disabled={isSubmitting}
						className="mt-4 w-full cursor-pointer bg-[#8946ff] py-5 select-none hover:bg-[#8946ff]/90"
					>
						{isSubmitting ? (
							<span className="flex items-center justify-center gap-2 text-sm">
								<Loader className="size-4 animate-spin" /> Adding Project
							</span>
						) : currentEditingId ? (
							"Update Project"
						) : (
							"Add Project"
						)}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default AddProjectsForm;
