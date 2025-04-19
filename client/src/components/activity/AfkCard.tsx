const AfkCard = () => {
	return (
		<div className="flex w-fit justify-center gap-2.5 rounded-lg bg-gray-900 p-4 text-sm font-medium text-white shadow-lg">
			<div className="relative size-18">
				<img className="h-full w-full rounded-md" src="/afk.webp" alt="afk" />
			</div>
			<div className="space-y-0.5 text-sm">
				<p className="text-base font-medium">Idling</p>
				<p className="text-gray-400">
					Someone ping my brain, <br /> it's AFK
				</p>
			</div>
		</div>
	);
};

export default AfkCard;
