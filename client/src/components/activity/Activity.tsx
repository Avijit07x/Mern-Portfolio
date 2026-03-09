import { motion } from "motion/react";
import { lazy, Suspense, useEffect, useState } from "react";
import ActivityLoader from "./ActivityLoader";
const AfkCard = lazy(() => import("./AfkCard"));
const ActiveCard = lazy(() => import("./ActiveCard"));

const Activity = () => {
	const [activity, setActivity] = useState<IActivity | null>(null);
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

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any },
		},
	};

	const titleVariants = {
		hidden: { opacity: 0, x: -20 },
		visible: {
			opacity: 1,
			x: 0,
			transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any },
		},
	};

	return (
		<motion.section
			variants={containerVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.3 }}
			className="relative z-10 overflow-hidden border-t border-white/10 px-8 py-24 text-white lg:px-20"
		>
			{/* Technical Pulse Waveform Background */}
			<div
				className="absolute inset-0 z-0 opacity-[0.08]"
				style={{
					backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(255,255,255,0.1) 81px, transparent 82px)`,
					maskImage:
						"linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
					WebkitMaskImage:
						"linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
				}}
			/>

			{/* Suble Background Watermark */}
			<div className="pointer-events-none absolute top-1/2 -right-20 -translate-y-1/2 text-[20vw] font-black tracking-tighter text-white/1 select-none">
				LIVE
			</div>

			<div className="relative z-10 mx-auto w-full">
				<div className="mb-10 flex flex-col space-y-4">
					<motion.h2
						variants={titleVariants}
						className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl"
					>
						Activity<span className="text-white/30">.</span>
					</motion.h2>

					<motion.div
						variants={itemVariants}
						className="relative pl-6 before:absolute before:inset-y-1 before:left-0 before:w-px before:bg-linear-to-b before:from-transparent before:via-white/20 before:to-transparent"
					>
						<p className="max-w-2xl text-lg leading-relaxed font-light text-white/50 md:text-xl">
							Live peek into my world. Whether I’m writing code, editing a file,
							or just staring at my screen, it all shows up here in real-time.
						</p>
					</motion.div>
				</div>

				<motion.div variants={itemVariants} className="flex w-full items-start">
					<div className="w-full max-w-2xl">
						{!isReady ? (
							<ActivityLoader />
						) : (
							<Suspense fallback={<ActivityLoader />}>
								{activity ? <ActiveCard activity={activity} /> : <AfkCard />}
							</Suspense>
						)}
					</div>
				</motion.div>
			</div>
		</motion.section>
	);
};

export default Activity;
