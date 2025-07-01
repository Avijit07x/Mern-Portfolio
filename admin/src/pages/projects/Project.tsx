import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
	fetchProjects,
	resetProjectForm,
	setCurrentEditingId,
} from "@/store/projectSlice";
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
	const [openAddProjectDialog, setOpenAddProjectDialog] =
		useState<boolean>(false);
	// const [searchedText, setSearchedText] = useState<string>("");

	const dispatch = useAppDispatch();

	// const handleSearchTool = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
	// 	// setSearchedText(e.target.value);
	// };

	// open create project dialog
	const handleOpenAddProjectDialog = () => {
		dispatch(setCurrentEditingId(""));
		setOpenAddProjectDialog(true);
		dispatch(resetProjectForm());
	};

	useEffect(() => {
		if (projects.length === 0) {
			dispatch(fetchProjects());
		}
	}, []);

	return (
		<div>
			<div className="mb-5 flex w-full justify-between gap-5 select-none">
				<div>
					{/* <Input
						value={searchedText}
						type="text"
						name="search"
						id="search"
						placeholder="Search projects"
						className="h-9 rounded-full border border-[#2b2b30] text-white selection:bg-amber-700 sm:w-72 lg:w-80 xl:w-96"
						onChange={handleSearchTool}
					/> */}
				</div>
				<Button
					className="cursor-pointer items-center justify-center gap-1.5 rounded-full bg-[#8946ff] text-sm hover:bg-[#8946ff]/90 max-lg:size-9"
					onClick={handleOpenAddProjectDialog}
				>
					<Plus size={20} />
					<span className="hidden md:block">Add New</span>
				</Button>
			</div>
			<AddProjectSidebar
				openAddProjectDialog={openAddProjectDialog}
				setOpenAddProjectDialog={setOpenAddProjectDialog}
			/>
			<Suspense
				fallback={
					<div className="flex min-h-[70vh] items-center justify-center">
						<div className="loader"></div>
					</div>
				}
			>
				<div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
					{projects.length !== 0 &&
						projects.map((project) => {
							return (
								<ProjectTile
									key={project._id}
									project={project}
									setOpenAddProjectDialog={setOpenAddProjectDialog}
								/>
							);
						})}
				</div>
			</Suspense>
		</div>
	);
};

export default Project;
