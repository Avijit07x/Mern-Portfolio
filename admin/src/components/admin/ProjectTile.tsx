import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch } from "@/store/hooks";
import { deleteProject } from "@/store/projectSlice";
import { IProject } from "@/types/types";
import React from "react";
import { Button } from "../ui/button";

interface Props {
	project: IProject;
	onEdit?: (project: IProject) => void;
}

const ProjectTile: React.FC<Props> = ({ project, onEdit }) => {
	const dispatch = useAppDispatch();

	return (
		<Card className="max-w-xs gap-2 overflow-hidden rounded-2xl border-0 bg-[#18181a] text-white shadow-lg">
			<CardHeader>
				<CardTitle className="text-xl font-bold">{project.title}</CardTitle>
			</CardHeader>

			<CardContent className="space-y-4">
				<img
					src={project.image.url}
					alt={project.title}
					className="h-48 w-full rounded-md object-cover object-top"
				/>

				<p className="text-sm">{project.description}</p>

				<div className="flex flex-wrap gap-2">
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
						onClick={() => onEdit?.(project)}
						className="w-full border-0 bg-[#8b8bb8] hover:bg-[#8b8bb8]/90 hover:text-white"
					>
						Edit
					</Button>
					<Button
						className="w-full border-0 bg-[#ce2929] hover:bg-[#ce2929]/90"
						onClick={() => dispatch(deleteProject(project._id))}
					>
						Delete
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default ProjectTile;
