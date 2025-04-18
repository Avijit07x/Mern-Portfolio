import { useEffect, useState } from "react";

type Activity = {
	name: string;
	details?: string;
	state?: string;
	timestamps?: {
		start: number;
		end?: number;
	};
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
		<div className="w-fit space-y-2 rounded-lg bg-gray-900 p-4 text-white shadow-lg">
			<p>
				🛠 <strong>{activity.details || "No details"}</strong>
			</p>
			<p>
				📂 <strong>{activity.state || "No state info"}</strong>
			</p>
			<p>
				⏱ Active since: <strong>{duration}</strong>
			</p>
		</div>
	);
};

export default DiscordActivity;
