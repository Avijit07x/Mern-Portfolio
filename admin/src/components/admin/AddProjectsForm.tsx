import { ProjectFormData } from "@/pages/projects/Project";
import { Tag } from "emblor";
import { Loader } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import TagInputForm from "./TagInputForm";

type Props = {
	projectFormData: {
		title: string;
		description: string;
	};
	setProjectFormData: React.Dispatch<React.SetStateAction<ProjectFormData>>;
	tags: Tag[];
	setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
	handleSubmit: (e: React.FormEvent) => void;
	isSubmitting: boolean;
	
};

const AddProjectsForm: React.FC<Props> = ({
	projectFormData,
	setProjectFormData,
	tags,
	setTags,
	handleSubmit,
	isSubmitting,
	
}) => {
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { value, name } = e.target;
		setProjectFormData({ ...projectFormData, [name]: value });
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className="mt-4 space-y-4">
					<Label htmlFor="title">Project Name</Label>
					<Input
						type="text"
						name="title"
						id="title"
						value={projectFormData?.title}
						onChange={handleChange}
						className="border-muted-foreground/50 py-5 selection:bg-blue-500"
						placeholder="Enter project name"
						autoComplete="off"
					/>
				</div>
				<div className="mt-4 space-y-4">
					<Label htmlFor="description">Project Description</Label>
					<Textarea
						name="description"
						id="description"
						value={projectFormData?.description}
						onChange={handleChange}
						className="border-muted-foreground/50 no-scrollbar h-25 resize-none py-2.5 selection:bg-blue-500"
						placeholder="Enter project description"
						autoComplete="off"
					/>
				</div>
				<div>
					<TagInputForm setTags={setTags} tags={tags} />
				</div>
				<div>
					<Button
						type="submit"
						disabled={isSubmitting}
						className="mt-4 w-full cursor-pointer bg-[#8946ff] py-5 select-none hover:bg-[#8946ff]/90"
					>
						{isSubmitting ? (
							<span className="flex items-center justify-center gap-2 text-sm">
								<Loader className="size-4 animate-spin" /> Adding Project
							</span>
						) : (
							"Add Project"
						)}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default AddProjectsForm;
