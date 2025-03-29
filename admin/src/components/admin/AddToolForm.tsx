import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const AddToolForm = () => {
	const [toolName, setToolName] = useState<string>("");

	const handleChange = (e: any) => {
		setToolName(e.target.value);
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		console.log(toolName);
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
					className="mt-4 py-5 w-full cursor-pointer bg-[#8946ff] hover:bg-[#8946ff]/90"
				>
					Add
				</Button>
			</form>
		</div>
	);
};

export default AddToolForm;
