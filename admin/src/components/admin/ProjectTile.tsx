import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch } from "@/store/hooks";
import {
	deleteProject,
	fetchProjects,
	setCurrentEditingId,
	setProjectFormData,
	setTags,
} from "@/store/projectSlice";
import { IProject } from "@/types/types";
import { Loader, Trash } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";

interface Props {
	project: IProject;
	setOpenAddProjectDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectTile: React.FC<Props> = ({ project, setOpenAddProjectDialog }) => {
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);

	const handleDelete = async (id: string) => {
		try {
			setIsLoading(true);
			const { message } = await dispatch(deleteProject(id)).unwrap();
			toast.success(message);
			dispatch(fetchProjects());
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleEdit = (id: string) => {
		const { title, description, github_link, live_link, tools } = project;
		setOpenAddProjectDialog(true);
		dispatch(setCurrentEditingId(id));
		dispatch(
			setProjectFormData({ title, description, github_link, live_link }),
		);
		dispatch(setTags(tools));
	};

	return (
		<>
			<Card className="max-xs:w-full w-[300px] gap-2 overflow-hidden rounded-2xl border-0 bg-[#18181a] text-white shadow-lg">
				<CardHeader>
					<CardTitle className="text-xl font-bold">{project.title}</CardTitle>
				</CardHeader>

				<CardContent className="space-y-4">
					<img
						src={project.image.url}
						alt={project.title}
						className="h-44 w-full rounded-md object-cover object-top"
					/>

					<p className="text-sm">{project.description}</p>

					<div className="line-clamp-1 flex gap-2">
						{project.tools.map((tool) => (
							<Badge
								key={tool._id}
								variant="default"
								className="rounded-sm bg-[#8946ff]"
							>
								{tool.text}
							</Badge>
						))}
					</div>

					<div className="flex justify-between gap-2 pt-2">
						<Button
							variant="outline"
							onClick={() => handleEdit(project._id)}
							className="w-full border-0 bg-[#8b8bb8] hover:bg-[#8b8bb8]/90 hover:text-white"
						>
							Edit
						</Button>
						<Button
							className="w-full border-0 bg-[#ce2929] hover:bg-[#ce2929]/90"
							onClick={() => setIsDeleting(true)}
						>
							Delete
						</Button>
					</div>
				</CardContent>
			</Card>
			<Dialog onOpenChange={setIsDeleting} open={isDeleting}>
				<DialogContent className="bg-[#1e1e20] sm:max-w-[450px]">
					<DialogHeader>
						<DialogTitle className="pt-2 text-white">
							Are you sure you want to delete this project?
						</DialogTitle>
						<DialogDescription>
							This action cannot be undone. This will permanently delete your
							tool.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button onClick={() => setIsDeleting(false)} variant="outline">
							Cancel
						</Button>

						<Button
							onClick={() => handleDelete(project._id)}
							variant="destructive"
							disabled={isLoading}
						>
							{isLoading ? (
								<>
									<Loader className="size-3 animate-spin md:size-4" />
									<span>Deleting</span>
								</>
							) : (
								<>
									<Trash className="size-3 md:size-4" />
									<span>Delete</span>
								</>
							)}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default ProjectTile;
