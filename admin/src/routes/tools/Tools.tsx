import AddToolForm from "@/components/admin/AddToolForm";
import ImageUpload, { UploadedImage } from "@/components/admin/ImageUpload";
import ToolTile from "@/components/admin/ToolTile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTools } from "@/store/toolSlice";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

const Tools = () => {
	const { tools, isLoading } = useAppSelector((state) => state.tool);
	const [toolName, setToolName] = useState<string>("");
	const [searchedText, setSearchedText] = useState<string>("");
	const [openCreateProductsDialog, setOpenCreateProductsDialog] =
		useState<boolean>(false);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [uploadedImageUrl, setUploadedImageUrl] = useState<UploadedImage | "">(
		"",
	);
	const [currentEditedTool, setCurrentEditedTool] = useState<string | null>(
		null,
	);
	const dispatch = useAppDispatch();

	// handle search
	const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchedText(e.target.value);
	};
	// open create tool dialog
	const handleOpenCreateProductsDialog = () => {
		setToolName("");
		setImageFile(null);
		setCurrentEditedTool(null);
		setOpenCreateProductsDialog(true);
	};

	useEffect(() => {
		if (tools.length === 0) dispatch(fetchTools());
	}, [dispatch]);

	return (
		<div>
			<div className="mb-5 flex w-full justify-between gap-5">
				<div>
					<Input
						value={searchedText}
						type="text"
						name="search"
						id="search"
						placeholder="Search tools"
						className="h-9 rounded-full border border-[#2b2b30] text-white selection:bg-amber-700 sm:w-72 lg:w-80 xl:w-96"
						onChange={handleSearchProduct}
					/>
				</div>
				<Button
					className="cursor-pointer rounded-full bg-blue-600/90 text-sm hover:bg-blue-600/70"
					onClick={handleOpenCreateProductsDialog}
				>
					<Plus size={20} />
					<span className="hidden md:block">Add New</span>
				</Button>
			</div>

			<Sheet
				open={openCreateProductsDialog}
				onOpenChange={setOpenCreateProductsDialog}
			>
				<SheetContent
					side="right"
					className="overflow-auto border-0 bg-[#18181a] px-4 [&>button]:hidden"
				>
					<div className="text-white">
						<SheetHeader className="flex flex-row items-center justify-between px-0">
							<SheetTitle className="text-xl font-bold text-white">
								Add Tool
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
						<AddToolForm
							uploadedImageUrl={uploadedImageUrl}
							setOpenCreateProductsDialog={setOpenCreateProductsDialog}
							setImageFile={setImageFile}
							toolName={toolName}
							setToolName={setToolName}
							currentEditedTool={currentEditedTool}
						/>
					</div>
				</SheetContent>
			</Sheet>

			{isLoading ? (
				<div className="flex min-h-[70vh] items-center justify-center">
					<div className="loader"></div>
				</div>
			) : (
				<div className="xs:grid-cols-2 grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
					{tools.map((tool) => (
						<ToolTile
							key={tool._id}
							tool={tool}
							setToolName={setToolName}
							setOpenCreateProductsDialog={setOpenCreateProductsDialog}
							setCurrentEditedTool={setCurrentEditedTool}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default Tools;
