import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTags } from "@/store/projectSlice";
import { TagInput } from "emblor";
import { useId, useState } from "react";

const TagInputForm = () => {
	const { tags } = useAppSelector((state) => state.project);
	const dispatch = useAppDispatch();
	const id = useId();
	const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

	return (
		<div>
			<Label htmlFor={id} className="my-4">
				Add Tools
			</Label>
			<TagInput
				id={id}
				tags={tags}
				setTags={(newTags) => {
					dispatch(setTags(newTags));
				}}
				className="flex flex-wrap"
				placeholder="Add a tools"
				styleClasses={{
					tagList: {
						container: "gap-1",
					},
					input:
						"rounded-md transition-[color,box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-ring border-muted-foreground/50 py-5 selection:bg-blue-500 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
					tag: {
						body: "relative h-7 bg-[#8946ff] rounded-md flex justify-center gap-1 items-center border-none text-white text-sm ps-2 pe-7 hover:bg-[#8946ff]",
						closeButton:
							"absolute -inset-y-px cursor-pointer -end-px p-0 rounded-s-none rounded-e-md flex size-8 transition-[color,box-shadow] text-white hover:text-white",
					},
				}}
				activeTagIndex={activeTagIndex}
				setActiveTagIndex={setActiveTagIndex}
				inlineTags={false}
				inputFieldPosition="top"
				maxTags={10}
				minTags={1}
			/>
		</div>
	);
};

export default TagInputForm;
