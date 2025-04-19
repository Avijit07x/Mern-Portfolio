import { useEffect, useState } from "react";
import ActiveCard from "./ActiveCard";
import AfkCard from "./AfkCard";

export type Activity = {
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

const Activity = () => {
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
	return (
		<div className="mx-auto mt-8 flex max-w-screen-2xl flex-col items-center justify-center text-center px-3 md:px-10">
			<h2 className="text-xl font-semibold text-white">
				Activity — What I’m up to in real-time <br className="md:hidden" /> (yep, it’s live!)
			</h2>
			<p className="mt-1 mb-6 text-sm text-gray-200">
				Whether I’m writing code, vibing to music, or just staring at my screen
				pretending to debug — it all shows up here. Trust me 😅, this thing is
				actually live. 🛰️
			</p>

			{activity ? (
				<ActiveCard activity={activity} duration={duration} />
			) : (
				<AfkCard />
			)}
		</div>	
	);
};

export default Activity;
