import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

type Props = {
	tool: {
		_id: string;
		name: string;
	};
	index: number;
};

const ToolItem: React.FC<Props> = ({ tool, index }) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: tool._id });
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};
	return (
		<div
			key={tool._id}
			ref={setNodeRef}
			style={style}
			className="flex items-center justify-between gap-2 rounded-md bg-[#464649] p-4 text-white shadow-lg"
		>
			<div className="flex items-center gap-2 select-none">
				<p>{index + 1}.</p>
				<p>{tool.name}</p>
			</div>
			<button
				{...attributes}
				{...listeners}
				className="cursor-grab active:cursor-grabbing"
				data-dnd-kit-drag-handle
			>
				<GripVertical className="size-5 text-gray-400" />
			</button>
		</div>
	);
};

export default ToolItem;
