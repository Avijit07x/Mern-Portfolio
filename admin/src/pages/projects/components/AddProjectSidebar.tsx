import AddProjectsForm from "@/components/admin/AddProjectsForm";
import ImageUpload, { UploadedImage } from "@/components/admin/ImageUpload";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { useAppDispatch } from "@/store/hooks";
import { addProject } from "@/store/projectSlice";
import { IProjectPayload } from "@/types/types";
import { Tag } from "emblor";
import { X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { ProjectFormData } from "../Project";

const preTags: Tag[] = [
	{
		id: Math.random().toString(36).substring(2, 8),
		text: "React",
	},
	{
		id: Math.random().toString(36).substring(2, 8),
		text: "Tailwind Css",
	},
];

interface Props {
	openCreateProductsDialog: boolean;
	setOpenCreateProductsDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProjectSidebar: React.FC<Props> = ({
	openCreateProductsDialog,
	setOpenCreateProductsDialog,
}) => {
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [uploadedImageUrl, setUploadedImageUrl] = useState<UploadedImage | "">(
		"",
	);
	const [tags, setTags] = useState<Tag[]>(preTags);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [projectFormData, setProjectFormData] = useState<ProjectFormData>({
		title: "",
		description: "",
	});

	const dispatch = useAppDispatch();
	// Add project
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!uploadedImageUrl || !projectFormData || tags.length === 0) {
			toast.error("Please fill in all the fields");
			return;
		}

		const data: IProjectPayload = {
			image: {
				url: uploadedImageUrl.url,
				public_id: uploadedImageUrl.public_id,
			},
			tools: tags,
			...projectFormData,
		};

		try {
			setIsSubmitting(true);
			const res = await dispatch(addProject(data)).unwrap();
			if (res.success) {
				setTags(preTags);
				setUploadedImageUrl("");
				setImageFile(null);
				setProjectFormData({
					title: "",
					description: "",
				});
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

	return (
		<>
			<Sheet
				open={openCreateProductsDialog}
				onOpenChange={setOpenCreateProductsDialog}
			>
				<SheetContent
					side="right"
					className="no-scrollbar overflow-auto border-0 bg-[#18181a] px-4 [&>button]:hidden"
				>
					<div className="text-white">
						<SheetHeader className="flex flex-row items-center justify-between px-0">
							<SheetTitle className="text-xl font-bold text-white">
								Add Project
							</SheetTitle>
							<button
								onClick={() => setOpenCreateProductsDialog(false)}
								className="cursor-pointer"
							>
								<X size={20} />
							</button>
						</SheetHeader>
						<ImageUpload
							imageFile={imageFile}
							setImageFile={setImageFile}
							uploadedImageUrl={uploadedImageUrl}
							setUploadedImageUrl={setUploadedImageUrl}
						/>
						<AddProjectsForm
							projectFormData={projectFormData}
							setProjectFormData={setProjectFormData}
							tags={tags}
							setTags={setTags}
							handleSubmit={handleSubmit}
							isSubmitting={isSubmitting}
						/>
					</div>
				</SheetContent>
			</Sheet>
		</>
	);
};

export default AddProjectSidebar;
