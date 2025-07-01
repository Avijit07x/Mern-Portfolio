import Reorganize from "@/components/reorganize/Reorganize";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
	fetchTools,
	setCurrentEditingId,
	setFilteredTools,
	setToolFormData,
} from "@/store/toolSlice";
import { Plus } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import AddToolSidebar from "./components/AddToolSidebar";
const ToolTile = lazy(() => import("@/components/admin/ToolTile"));

const Tools = () => {
	const { tools, filteredTools } = useAppSelector((state) => state.tool);
	const [searchedText, setSearchedText] = useState<string>("");
	const [openAddToolDialog, setOpenAddToolDialog] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	// handle search
	const handleSearchProject = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchedText(e.target.value);
		const filteredTools = tools.filter((tool) =>
			tool.name.includes(e.target.value.toLowerCase()),
		);
		if (filteredTools.length === 0) {
			return dispatch(setFilteredTools(tools));
		}
		dispatch(setFilteredTools(filteredTools));
	};

	// open create tool dialog
	const handleAddToolDialog = () => {
		dispatch(setToolFormData({}));
		dispatch(setCurrentEditingId(null));
		setOpenAddToolDialog(true);
	};

	useEffect(() => {
		if (tools.length === 0) dispatch(fetchTools());
	}, []);

	return (
		<>
			<div className="mb-5 flex w-full justify-between gap-5 select-none">
				<div>
					<Input
						value={searchedText}
						type="text"
						name="search"
						id="search"
						placeholder="Search tools"
						className="h-9 rounded-full border border-[#2b2b30] text-white selection:bg-amber-700 sm:w-72 lg:w-80 xl:w-96"
						onChange={handleSearchProject}
						autoComplete="off"
					/>
				</div>
				<div className="flex items-center gap-2">
					<Reorganize />
					<Button
						className="cursor-pointer items-center justify-center gap-1.5 rounded-full bg-[#8946ff] text-sm hover:bg-[#8946ff]/90 max-lg:size-9"
						onClick={handleAddToolDialog}
					>
						<Plus size={20} />
						<span className="max-lg:sr-only">Add New</span>
					</Button>
				</div>
			</div>
			<AddToolSidebar
				openAddToolDialog={openAddToolDialog}
				setOpenAddToolDialog={setOpenAddToolDialog}
			/>
			<Suspense
				fallback={
					<div className="flex min-h-[70vh] items-center justify-center">
						<div className="loader"></div>
					</div>
				}
			>
				<div className="space-y-3 md:space-y-5">
					{filteredTools.map((tool) => (
						<ToolTile
							key={tool._id}
							tool={tool}
							setOpenAddToolDialog={setOpenAddToolDialog}
						/>
					))}
				</div>
			</Suspense>
		</>
	);
};

export default Tools;
