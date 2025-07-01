import zod from "zod";

const toolSchema = zod.object({
	name: zod.string().min(1, "Name is required"),
	image: zod.object({
		url: zod.string().url(),
		public_id: zod.string(),
	}),
});

const updateToolSchema = toolSchema.partial().extend({
	image: toolSchema.shape.image.optional(),
});
export { toolSchema, updateToolSchema };
