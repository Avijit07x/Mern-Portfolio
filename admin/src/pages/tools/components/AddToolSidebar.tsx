import AddToolForm from "@/components/admin/AddToolForm";
import ImageUpload from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { X } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";

interface Props {
	openAddToolDialog: boolean;
	setOpenAddToolDialog: Dispatch<SetStateAction<boolean>>;
}

const AddToolSidebar: React.FC<Props> = ({
	openAddToolDialog,
	setOpenAddToolDialog,
}) => {
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [uploadedImageUrl, setUploadedImageUrl] = useState<
		IUploadedImage | string
	>("");
	return (
		<>
			<Sheet open={openAddToolDialog} onOpenChange={setOpenAddToolDialog}>
				<SheetContent
					side="right"
					className="overflow-auto border-0 bg-[#18181a] px-4 [&>button]:hidden"
				>
					<div className="text-white">
						<SheetHeader className="flex flex-row items-center justify-between px-0">
							<SheetTitle className="text-xl font-bold text-white">
								Add Tool
							</SheetTitle>
							<Button
								onClick={() => setOpenAddToolDialog(false)}
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
						<AddToolForm
							uploadedImageUrl={uploadedImageUrl as IUploadedImage}
							setUploadedImageUrl={setUploadedImageUrl}
							setOpenAddToolDialog={setOpenAddToolDialog}
							setImageFile={setImageFile}
						/>
					</div>
				</SheetContent>
			</Sheet>
		</>
	);
};

export default AddToolSidebar;
