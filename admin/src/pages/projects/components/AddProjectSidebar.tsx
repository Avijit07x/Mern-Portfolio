import AddProjectsForm from "@/components/admin/AddProjectsForm";
import ImageUpload from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { useAppSelector } from "@/store/hooks";
import { IUploadedImage } from "@/types/types";
import { X } from "lucide-react";
import React, { useState } from "react";

interface Props {
	openAddProjectDialog: boolean;
	setOpenAddProjectDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProjectSidebar: React.FC<Props> = ({
	openAddProjectDialog,
	setOpenAddProjectDialog,
}) => {
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [uploadedImageUrl, setUploadedImageUrl] = useState<IUploadedImage | string>(
		"",
	);
	const { currentEditingId } = useAppSelector((state) => state.project);

	return (
		<>
			<Sheet open={openAddProjectDialog} onOpenChange={setOpenAddProjectDialog}>
				<SheetContent
					side="right"
					className="no-scrollbar overflow-auto border-0 bg-[#18181a] px-4 [&>button]:hidden"
				>
					<div className="text-white">
						<SheetHeader className="flex flex-row items-center justify-between px-0">
							<SheetTitle className="text-xl font-bold text-white">
								{currentEditingId ? "Update Project" : "Add Project"}
							</SheetTitle>
							<Button
								onClick={() => setOpenAddProjectDialog(false)}
								className="cursor-pointer hover:bg-transparent hover:text-white"
								size={"icon"}
								variant={"ghost"}
							>
								<X size={20} />
							</Button>
						</SheetHeader>
						<ImageUpload
							imageFile={imageFile}
							setImageFile={setImageFile}
							uploadedImageUrl={uploadedImageUrl}
							setUploadedImageUrl={setUploadedImageUrl}
						/>
						<AddProjectsForm
							uploadedImageUrl={uploadedImageUrl}
							setUploadedImageUrl={setUploadedImageUrl}
							setImageFile={setImageFile}
							setOpenAddProjectDialog={setOpenAddProjectDialog}
						/>
					</div>
				</SheetContent>
			</Sheet>
		</>
	);
};

export default AddProjectSidebar;
