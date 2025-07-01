import { lazy, Suspense, useEffect, useState } from "react";
import ActivityLoader from "./ActivityLoader";
const AfkCard = lazy(() => import("./AfkCard"));
const ActiveCard = lazy(() => import("./ActiveCard"));

const Activity = () => {
	const [activity, setActivity] = useState<IActivity | null>(null);
	const [duration, setDuration] = useState<string>("");
	const [isReady, setIsReady] = useState<boolean>(false);
	useEffect(() => {
		let ws: WebSocket;
		let heartbeatInterval: NodeJS.Timeout;
		let reconnectTimeout: NodeJS.Timeout;

		const connect = () => {
			ws = new WebSocket("wss://api.lanyard.rest/socket");

			ws.onopen = () => {
				ws.send(
					JSON.stringify({
						op: 2,
						d: {
							subscribe_to_id: `${import.meta.env.VITE_ACTIVITY_ID}`,
						},
					}),
				);
			};

			ws.onmessage = (event) => {
				const data: ILanyardEvent = JSON.parse(event.data);

				// Heartbeat
				if (data.op === 1 && data.d?.heartbeat_interval) {
					clearInterval(heartbeatInterval);
					heartbeatInterval = setInterval(() => {
						if (ws.readyState === WebSocket.OPEN) {
							ws.send(JSON.stringify({ op: 3 }));
						}
					}, data.d.heartbeat_interval);
				}

				// Activity
				if (data.t === "INIT_STATE" || data.t === "PRESENCE_UPDATE") {
					const latestActivity = data.d.activities.find(
						(activity: IActivity) =>
							activity.application_id === "383226320970055681",
					);
					setActivity(latestActivity ?? null);
					setIsReady(true);
				}
			};

			ws.onclose = () => {
				clearInterval(heartbeatInterval);
				reconnectTimeout = setTimeout(connect, 5000);
			};

			ws.onerror = () => {
				ws.close(); // Force close so that onclose triggers reconnect
			};
		};

		connect();

		return () => {
			ws.close();
			clearInterval(heartbeatInterval);
			clearTimeout(reconnectTimeout);
		};
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
		<div className="mx-auto mt-8 flex max-w-screen-2xl flex-col items-center justify-center px-3 text-center md:px-10">
			<h2 className="text-2xl font-semibold text-white lg:text-3xl">
				Live Peek into My World
			</h2>

			<p className="mt-2 mb-6 text-gray-200 max-lg:text-sm lg:mt-1">
				Whether I’m writing code, editing a code file, or just staring at my
				screen — it all shows up here. <br className="max-md:hidden" /> And yes,
				it’s actually live. 🛰️
			</p>

			{!isReady ? (
				<ActivityLoader />
			) : (
				<Suspense fallback={<ActivityLoader />}>
					{activity ? (
						<ActiveCard activity={activity} duration={duration} />
					) : (
						<AfkCard />
					)}
				</Suspense>
			)}
		</div>
	);
};

export default Activity;
