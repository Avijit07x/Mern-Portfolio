import React from "react";

type Props = {
	activity: IActivity;
	duration: string;
};

const ActiveCard: React.FC<Props> = ({ activity, duration }) => {
	return (
		<div className="flex w-fit justify-center gap-2.5 rounded-lg border border-white/[0.1] bg-[#0f132e] p-4 text-start text-sm font-medium text-white drop-shadow-md">
			<div className="relative size-18">
				<img
					className="h-full w-full rounded-md"
					src={`https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets?.large_image}.png?size=160`}
					alt=""
				/>
				<img
					className="absolute -right-1.5 -bottom-1.5 z-10 size-7 rounded-full border-3 border-gray-900"
					src={`https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets?.small_image}.png?size=160`}
					alt=""
				/>
			</div>
			<div className="space-y-0.5">
				<p className="text-base font-bold">{activity.name}</p>
				<p>{activity.details || "No details"}</p>
				<p>
					<span className="text-green-600">{duration}</span>
				</p>
			</div>
		</div>
	);
};

export default ActiveCard;
