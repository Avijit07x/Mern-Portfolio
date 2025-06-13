import zod from "zod";

const toolSchema = zod.object({
	name: zod.string().min(1, "Name is required"),
	image: zod.object({
		url: zod.string().url(),
		public_id: zod.string(),
	}),
});

export default toolSchema;
