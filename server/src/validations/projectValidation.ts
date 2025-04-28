import zod from "zod";

const projectSchema = zod.object({
	title: zod.string().min(1, "Name is required"),
	image: zod.object({
		url: zod.string().min(1, "Image url is required"),
		public_id: zod.string(),
	}),
	description: zod.string().min(1, "description is required"),
	tools: zod.array(zod.string()).nonempty("At least one tool is required"),
	order: zod.number().optional().default(0),
});

export default projectSchema;
