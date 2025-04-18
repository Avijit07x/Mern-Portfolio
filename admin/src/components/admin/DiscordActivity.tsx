import { useEffect, useState } from "react";

type Activity = {
	name: string;
	details?: string;
	state?: string;
	timestamps?: {
		start: number;
		end?: number;
	};
	assets?: {
		large_image?: string;
		small_image?: string;
	};
	application_id?: string;
};

type LanyardEvent = {
	op: number;
	t?: string;
	d: {
		discord_status: string;
		activities: Activity[];
		user_id: string;
	};
};

const DiscordActivity: React.FC = () => {
	const [activity, setActivity] = useState<Activity | null>(null);
	const [duration, setDuration] = useState<string>("");

	useEffect(() => {
		const ws = new WebSocket("wss://api.lanyard.rest/socket");

		ws.onopen = () => {
			ws.send(
				JSON.stringify({
					op: 2,
					d: {
						subscribe_to_id: "486217717238726656",
					},
				}),
			);
		};

		ws.onmessage = (event) => {
			const message: LanyardEvent = JSON.parse(event.data);

			if (message.t === "INIT_STATE" || message.t === "PRESENCE_UPDATE") {
				const latestActivity = message.d.activities[0];
				if (latestActivity) {
					setActivity(latestActivity);
				}
			}
		};

		return () => ws.close();
	}, []);

	useEffect(() => {
		if (!activity?.timestamps?.start) return;

		const updateDuration = () => {
			const now = Date.now();
			const start = activity.timestamps!.start;
			const durationMs = now - start;

			const totalSeconds = Math.floor(durationMs / 1000);
			const hours = Math.floor(totalSeconds / 3600);
			const minutes = Math.floor((totalSeconds % 3600) / 60);
			const seconds = totalSeconds % 60;

			setDuration(`${hours}h ${minutes}m ${seconds}s`);
		};

		updateDuration();
		const timer = setInterval(updateDuration, 1000);
		return () => clearInterval(timer);
	}, [activity]);

	if (!activity) return <p className="text-white">Loading activity...</p>;

	return (
		<div className="flex w-fit justify-center gap-2.5 rounded-lg bg-gray-900 p-4 text-sm font-medium text-white shadow-lg">
			<div className="relative size-18">
				<img
					className="h-full w-full rounded-md"
					src={`https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets?.large_image}.png?size=160`}
					alt=""
				/>
				<img
					className="absolute -right-1.5 -bottom-1.5 z-100 size-7 rounded-full border-3 border-gray-900"
					src={`https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets?.small_image}.png?size=160`}
					alt=""
				/>
			</div>
			<div className="space-y-0.5">
				<p className="text-base font-bold">{activity.name}</p>
				<p>{activity.details || "No details"}</p>
				<p>
					<span className="text-green-800">{duration}</span>
				</p>
			</div>
		</div>
	);
};

export default DiscordActivity;
