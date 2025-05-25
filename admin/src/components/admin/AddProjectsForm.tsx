import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
	addProject,
	fetchProjects,
	resetProjectForm,
	setProjectFormData,
	updateProject,
} from "@/store/projectSlice";
import {
	IProjectPayload,
	IProjectUpdateData,
	IUploadedImage,
} from "@/types/types";
import { Loader } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import TagInputForm from "./TagInputForm";

type Props = {
	uploadedImageUrl: any;
	setOpenAddProjectDialog: Dispatch<SetStateAction<boolean>>;
	setImageFile: Dispatch<SetStateAction<File | null>>;
	setUploadedImageUrl: Dispatch<SetStateAction<IUploadedImage | string>>;
};

const AddProjectsForm: React.FC<Props> = ({
	uploadedImageUrl,
	setUploadedImageUrl,
	setImageFile,
	setOpenAddProjectDialog,
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
		const { url, public_id } = uploadedImageUrl;

		if (!uploadedImageUrl || !formData || tags.length === 0) {
			toast.error("Please fill in all the fields");
			return;
		}

		const data: IProjectPayload = {
			image: { url, public_id },
			tools: tags,
			...formData,
		};

		try {
			setIsSubmitting(true);
			const res = await dispatch(addProject(data)).unwrap();
			if (res.success) {
				dispatch(resetProjectForm());
				dispatch(fetchProjects());
				setUploadedImageUrl("");
				setImageFile(null);
				setOpenAddProjectDialog(false);
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
	const handleUpdate = async (e: React.FormEvent) => {
		e.preventDefault();
		const { url, public_id } = uploadedImageUrl;
		const data: IProjectUpdateData = {
			id: currentEditingId,
			tools: tags,
			...formData,
		};

		if (url && public_id) {
			data.image = { url, public_id };
		}
		setIsSubmitting(true);

		const { success, message } = await dispatch(updateProject(data)).unwrap();

		if (success) {
			toast.success(message);
			dispatch(fetchProjects());
			dispatch(resetProjectForm());
			setUploadedImageUrl("");
			setOpenAddProjectDialog(false);
		}
		if (!success) {
			const errorMessages = message
				.map((err: any) => ` ${err.message}`)
				.join(",");
			toast.error(errorMessages);
		}
		setIsSubmitting(false);
	};

	return (
		<div className="pb-4">
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
				<div className="mt-4 space-y-4">
					<Label htmlFor="github_link">Github Link</Label>
					<Input
						type="text"
						name="github_link"
						id="github_link"
						value={formData?.github_link}
						onChange={handleChange}
						className="border-muted-foreground/50 py-5 selection:bg-blue-500"
						placeholder="Enter project name"
						autoComplete="off"
					/>
				</div>
				<div className="mt-4 space-y-4">
					<Label htmlFor="live_link">Live Link</Label>
					<Input
						type="text"
						name="live_link"
						id="live_link"
						value={formData?.live_link}
						onChange={handleChange}
						className="border-muted-foreground/50 py-5 selection:bg-blue-500"
						placeholder="Enter project name"
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
								<Loader className="size-4 animate-spin" />
								<span>
									{currentEditingId ? "Updating Project" : "Adding Project"}
								</span>
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
