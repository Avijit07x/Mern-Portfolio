import AddToolForm from "@/components/admin/AddToolForm";
import ImageUpload, { UploadedImage } from "@/components/admin/ImageUpload";
import Reorganize from "@/components/reorganize/Reorganize";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
	fetchTools,
	setCurrentEditedTool,
	setFilteredTools,
	setToolFormData,
} from "@/store/toolSlice";
import { Plus, X } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
const ToolTile = lazy(() => import("@/components/admin/ToolTile"));

const Tools = () => {
	const { tools, filteredTools } = useAppSelector((state) => state.tool);

	const [searchedText, setSearchedText] = useState<string>("");
	const [openCreateProductsDialog, setOpenCreateProductsDialog] =
		useState<boolean>(false);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [uploadedImageUrl, setUploadedImageUrl] = useState<UploadedImage | "">(
		"",
	);

	const dispatch = useAppDispatch();

	// handle search
	const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchedText(e.target.value);
		const filteredTools = tools.filter((tool) =>
			tool.name.includes(e.target.value.toLowerCase()),
		);
		if (filteredTools.length === 0) {
			return dispatch(setFilteredTools(tools));
		}
		dispatch(setFilteredTools(filteredTools));
	};

	// open create tool dialog
	const handleAddToolDialog = () => {
		dispatch(
			setToolFormData({
				name: "",
			}),
		);
		setImageFile(null);
		dispatch(setCurrentEditedTool(null));
		setOpenCreateProductsDialog(true);
	};

	useEffect(() => {
		if (tools.length === 0) dispatch(fetchTools());
	}, [dispatch, tools]);

	return (
		<>
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
						autoComplete="off"
					/>
				</div>
				<div className="flex items-center gap-2">
					<Reorganize />
					<Button
						className="cursor-pointer items-center justify-center gap-1.5 rounded-full bg-blue-600/90 text-sm hover:bg-blue-600/70 max-lg:size-9"
						onClick={handleAddToolDialog}
					>
						<Plus size={20} />
						<span className="max-lg:sr-only">Add New</span>
					</Button>
				</div>
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
							<Button
								onClick={() => setOpenCreateProductsDialog(false)}
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
							uploadedImageUrl={uploadedImageUrl}
							setUploadedImageUrl={setUploadedImageUrl}
							setOpenCreateProductsDialog={setOpenCreateProductsDialog}
							setImageFile={setImageFile}
						/>
					</div>
				</SheetContent>
			</Sheet>

			<Suspense
				fallback={
					<div className="flex min-h-[70vh] items-center justify-center">
						<div className="loader"></div>
					</div>
				}
			>
				<div className="space-y-3 md:space-y-5">
					{filteredTools.map((tool) => (
						<ToolTile
							key={tool._id}
							tool={tool}
							setOpenCreateProductsDialog={setOpenCreateProductsDialog}
						/>
					))}
				</div>
			</Suspense>
		</>
	);
};

export default Tools;
