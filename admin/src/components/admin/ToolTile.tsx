import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppDispatch } from "@/store/hooks";
import {
	deleteTool,
	fetchTools,
	setCurrentEditingId,
	setToolFormData,
} from "@/store/toolSlice";
import { ITools } from "@/types/types";
import { Loader, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";

type Props = {
	tool: ITools;
	setOpenAddToolDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const ToolTile: React.FC<Props> = ({ tool, setOpenAddToolDialog }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	const onEdit = () => {
		const { _id, name } = tool;
		setOpenAddToolDialog(true);
		dispatch(
			setToolFormData({
				name,
			}),
		);
		dispatch(setCurrentEditingId(_id));
	};

	const handleToolDelete = async () => {
		setIsLoading(true);
		try {
			const { message } = await dispatch(deleteTool(tool._id)).unwrap();
			toast.success(message);
			dispatch(fetchTools());
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
			setIsDeleting(false);
		}
	};

	return (
		<>
			<Card className="flex w-full flex-row items-center justify-between gap-3 border-0 bg-[#18181a] p-4 text-center">
				<div className="flex flex-row items-center gap-3">
					<img
						src={tool?.image?.url}
						alt={tool?.name || "Tool"}
						onError={(e) => (e.currentTarget.src = "/fallback.svg")}
						className="size-8 object-contain md:size-11"
						loading="lazy"
					/>
					<p className="font-semibold text-white capitalize">{tool?.name}</p>
				</div>
				<div className="flex items-center gap-4">
					<Button
						variant="outline"
						size="icon"
						className="border-0 bg-[#8b8bb8] hover:bg-[#8b8bb8]/90"
						onClick={onEdit}
					>
						<Pencil className="size-3 md:size-4" />
					</Button>
					<Button
						variant="destructive"
						size="icon"
						className="border-0 bg-[#ce2929] hover:bg-[#ce2929]/90"
						onClick={() => setIsDeleting(true)}
					>
						<Trash className="size-3 md:size-4" />
					</Button>
				</div>
			</Card>

			<Dialog onOpenChange={setIsDeleting} open={isDeleting}>
				<DialogContent className="bg-[#1e1e20] sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle className="pt-2 text-white">
							Are you sure you want to delete this tool?
						</DialogTitle>
						<DialogDescription>
							This action cannot be undone. This will permanently delete your
							tool.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button onClick={() => setIsDeleting(false)} variant="outline">
							Cancel
						</Button>

						<Button
							onClick={handleToolDelete}
							variant="destructive"
							disabled={isLoading}
						>
							{isLoading ? (
								<>
									<Loader className="size-3 animate-spin md:size-4" />
									<span>Deleting</span>
								</>
							) : (
								<>
									<Trash className="size-3 md:size-4" />
									<span>Delete</span>
								</>
							)}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default ToolTile;
