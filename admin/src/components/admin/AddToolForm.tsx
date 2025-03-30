import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const AddToolForm = ({ uploadedImageUrl }: any) => {
	const [toolName, setToolName] = useState<string>("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setToolName(e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!toolName || !uploadedImageUrl) {
			toast.error("Please fill all fields");
			return;
		}
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className="mt-4 space-y-4">
					<Label htmlFor="name">Tool Name</Label>
					<Input
						type="text"
						name="name"
						id="name"
						value={toolName}
						onChange={handleChange}
						className="border-muted-foreground/50 py-5"
						placeholder="Enter tool name"
					/>
				</div>
				<Button
					type="submit"
					className="mt-4 w-full cursor-pointer bg-[#8946ff] py-5 hover:bg-[#8946ff]/90"
				>
					Add
				</Button>
			</form>
		</div>
	);
};

export default AddToolForm;
