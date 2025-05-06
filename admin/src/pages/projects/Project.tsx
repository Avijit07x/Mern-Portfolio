import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProjects } from "@/store/projectSlice";
import { Plus } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import AddProjectSidebar from "./components/AddProjectSidebar";
const ProjectTile = lazy(() => import("@/components/admin/ProjectTile"));

export type ProjectFormData = {
	title: string;
	description: string;
};

const Project = () => {
	const { projects } = useAppSelector((state) => state.project);
	const [searchedText, setSearchedText] = useState<string>("");
	const [openCreateProductsDialog, setOpenCreateProductsDialog] =
		useState<boolean>(false);

	const dispatch = useAppDispatch();

	const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchedText(e.target.value);
	};
	// open create project dialog
	const handleOpenCreateProductsDialog = () => {
		setOpenCreateProductsDialog(true);
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
			<AddProjectSidebar
				openCreateProductsDialog={openCreateProductsDialog}
				setOpenCreateProductsDialog={setOpenCreateProductsDialog}
			/>
			<Suspense
				fallback={
					<div className="flex min-h-[70vh] items-center justify-center">
						<div className="loader"></div>
					</div>
				}
			>
				{projects.length !== 0
					? projects.map((project) => {
							return <ProjectTile key={project._id} project={project} />;
						})
					: null}
			</Suspense>
		</div>
	);
};

export default Project;
