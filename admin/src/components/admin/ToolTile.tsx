import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppDispatch } from "@/store/hooks";
import { fetchTools } from "@/store/toolSlice";
import api from "@/utils/api";
import { Loader, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
	tool: any;
	setToolName: React.Dispatch<React.SetStateAction<string>>;
	setOpenCreateProductsDialog: React.Dispatch<React.SetStateAction<boolean>>;
	setCurrentEditedTool: React.Dispatch<React.SetStateAction<string | null>>;
};

const ToolTile: React.FC<Props> = ({
	tool,
	setToolName,
	setOpenCreateProductsDialog,
	setCurrentEditedTool,
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	const onEdit = () => {
		setOpenCreateProductsDialog(true);
		setToolName(tool.name);
		setCurrentEditedTool(tool._id);
	};

	const onDelete = async () => {
		try {
			setIsLoading(true);
			const res = await api.post(`admin/tool/delete-tool/${tool._id}`);
			toast.success(res.data.message);
			dispatch(fetchTools());
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Card className="flex w-full flex-row items-center justify-between gap-3 border-0 bg-[#18181a] p-4 text-center">
			<div className="flex flex-row items-center gap-3">
				<img
					src={tool?.image?.url}
					alt={tool?.name || "Tool"}
					onError={(e) => (e.currentTarget.src = "/fallback.svg")}
					className="size-8 object-contain md:size-11"
				/>
				<p className="font-semibold text-white uppercase">{tool?.name}</p>
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
					onClick={onDelete}
					disabled={isLoading}
				>
					{isLoading ? (
						<Loader className="size-3 animate-spin md:size-4" />
					) : (
						<Trash className="size-3 md:size-4" />
					)}
				</Button>
			</div>
		</Card>
	);
};

export default ToolTile;
