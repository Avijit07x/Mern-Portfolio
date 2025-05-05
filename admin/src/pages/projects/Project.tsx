import AddProjectsForm from "@/components/admin/AddProjectsForm";
import ImageUpload, { UploadedImage } from "@/components/admin/ImageUpload";
import Loader from "@/components/loader/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProjects } from "@/store/projectSlice";
import api from "@/utils/api";
import { Tag } from "emblor";
import { Plus, X } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";

export type ProjectFormData = {
	title: string;
	description: string;
};

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

const Project = () => {
	const { projects } = useAppSelector((state) => state.project);
	const [searchedText, setSearchedText] = useState<string>("");
	const [openCreateProductsDialog, setOpenCreateProductsDialog] =
		useState<boolean>(false);
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

	const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchedText(e.target.value);
	};
	// open create project dialog
	const handleOpenCreateProductsDialog = () => {
		setOpenCreateProductsDialog(true);
	};

	// add project
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!uploadedImageUrl || !projectFormData || !tags) {
			toast.error("Please fill all the field");
			return;
		}

		const data = {
			image: {
				url: uploadedImageUrl?.url,
				public_id: uploadedImageUrl?.public_id,
			},
			tools: tags,
			...projectFormData,
		};

		try {
			setIsSubmitting(true);
			const res = await api.post("admin/project/add-project", data);

			if (res.data?.success) {
				setTags([]);
				setUploadedImageUrl("");
				setImageFile(null);
				setProjectFormData({
					title: "",
					description: "",
				});
				toast.success("Project added successfully");
			}
		} catch (error: any) {
			console.log(error.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	useEffect(() => {
		if (projects.length === 0) {
			dispatch(fetchProjects());
		}
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
						placeholder="Search projects"
						className="h-9 rounded-full border border-[#2b2b30] text-white selection:bg-amber-700 sm:w-72 lg:w-80 xl:w-96"
						onChange={handleSearchProduct}
					/>
				</div>
				<Button
					className="cursor-pointer bg-blue-600/90 text-sm hover:bg-blue-600/70 md:rounded-full"
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

			<Suspense
				fallback={
					<div className="flex min-h-[70vh] items-center justify-center">
						<Loader />
					</div>
				}
			>
				{projects.map((project) => {
					return (
						<div key={project._id}>
							{project?.title}
							<img className="h-30 w-20" src={project.image.url} alt={project.title} />
						</div>
					);
				})}
			</Suspense>
		</div>
	);
};

export default Project;
