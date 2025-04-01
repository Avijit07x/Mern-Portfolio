import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTools } from "@/store/toolSlice";
import api from "@/utils/api";
import {
	closestCorners,
	DndContext,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	restrictToVerticalAxis,
	restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import {
	arrayMove,
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ArrowDownUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ToolItem from "./ToolItem";

const Reorganize = () => {
	const { tools } = useAppSelector((state) => state.tool);
	const dispatch = useAppDispatch();
	const sensors = useSensors(
		useSensor(MouseSensor),
		useSensor(TouchSensor),
		useSensor(KeyboardSensor),
	);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isReordered, setIsReordered] = useState<boolean>(false);

	const handleDragEnd = (event: any) => {
		const { active, over } = event;

		if (!over || active.id === over.id) return;

		const oldIndex = tools.findIndex((t) => t._id === active.id);
		const newIndex = tools.findIndex((t) => t._id === over.id);

		if (oldIndex !== -1 && newIndex !== -1) {
			const newTools = arrayMove(tools, oldIndex, newIndex);
			dispatch(setTools(newTools));
			setIsReordered(true);
		}
	};

	const handleSave = async () => {
		if (!isReordered) {
			toast.error("No changes detected");
			return;
		}
		try {
			setIsLoading(true);
			const res = await api.post("admin/tool/reorder-tools", { tools });
			toast.success(res.data.message);
			setIsReordered(false);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
			setIsOpen(false);
		}
	};

	return (
		<div>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					<Button
						className="cursor-pointer rounded-full bg-blue-600/90 hover:bg-blue-600/70"
						size={"icon"}
					>
						<ArrowDownUp className="size-4" />
						<span className="sr-only">Sort</span>
					</Button>
				</DialogTrigger>
				<DialogContent className="bg-[#1e1e20] sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle className="text-white">Edit profile</DialogTitle>
						<DialogDescription>
							Sort your tools and click save when you're done.
						</DialogDescription>
					</DialogHeader>

					<div className="no-scrollbar h-[300px] space-y-2 overflow-y-auto pb-1">
						<DndContext
							collisionDetection={closestCorners}
							modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
							onDragEnd={handleDragEnd}
							sensors={sensors}
							
						>
							<SortableContext
								items={tools.map((tool) => tool._id)}
								strategy={verticalListSortingStrategy}
							>
								{tools.map((tool, index) => (
									<ToolItem key={tool._id} tool={tool} index={index} />
								))}
							</SortableContext>
						</DndContext>
					</div>
					<DialogFooter>
						<Button
							disabled={isLoading || !isReordered}
							onClick={handleSave}
							className="bg-[#8a46ff] hover:bg-[#8a46ff]/90"
						>
							Save changes
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default Reorganize;
