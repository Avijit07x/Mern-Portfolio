import AddProjectsForm from "@/components/admin/AddProjectsForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";

const Project = () => {
	const [searchedText, setSearchedText] = useState<string>("");
	const [openCreateProductsDialog, setOpenCreateProductsDialog] =
		useState<boolean>(false);

	const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchedText(e.target.value);
	};
	// open create product dialog
	const handleOpenCreateProductsDialog = () => {
		setOpenCreateProductsDialog(true);
	};

	return (
		<div>
			<div className="mb-5 flex w-full justify-between gap-5">
				<div>
					<Input
						value={searchedText}
						type="text"
						name="search"
						id="search"
						placeholder="Search projects"
						className="h-9 rounded-full border border-[#2b2b30] text-white selection:bg-amber-700 sm:w-72 lg:w-80 xl:w-96"
						onChange={handleSearchProduct}
					/>
				</div>
				<Button
					className="rounded-full bg-blue-600/70 text-sm hover:bg-blue-600/90"
					onClick={handleOpenCreateProductsDialog}
				>
					Add Project
				</Button>
			</div>

			<Sheet
				open={openCreateProductsDialog}
				onOpenChange={setOpenCreateProductsDialog}
			>
				<SheetContent side="right" className="overflow-auto">
					<SheetHeader>
						<SheetTitle className="text-xl font-semibold">
							Add Product
						</SheetTitle>
					</SheetHeader>
					{/* <ImageUpload
						imageFile={imageFile}
						setImageFile={setImageFile}
						uploadedImageUrl={uploadedImageUrl}
						setUploadedImageUrl={setUploadedImageUrl}
					/> */}
					<AddProjectsForm />
				</SheetContent>
			</Sheet>
		</div>
	);
};

export default Project;
