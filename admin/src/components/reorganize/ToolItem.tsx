import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
			{...attributes}
			{...listeners}
			className="flex cursor-grab items-center gap-2 rounded-md bg-[#464649] p-4 text-white shadow-lg"
		>
			<p>{index + 1}.</p>
			<p>{tool.name}</p>
		</div>
	);
};

export default ToolItem;
