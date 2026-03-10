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
			className="relative z-10 border-t border-white/10 px-8 py-24 text-white lg:px-20"
		>
			{/* Structural Spine Line */}
			<div className="pointer-events-none absolute top-0 bottom-0 left-8 z-0 w-px bg-linear-to-b from-transparent via-white/10 to-transparent lg:left-20" />

			{/* Top Boundary HUD Label */}
			<div className="pointer-events-none absolute top-12 left-10 text-[9px] font-bold tracking-[0.3em] text-white/20 uppercase lg:left-24">
				[ STATUS: 0x21_REALTIME_MONITORING ]
			</div>

			{/* Corner Accents framing the cards */}
			<div className="pointer-events-none absolute inset-x-8 top-20 bottom-20 z-0 lg:inset-x-20">
				<div className="absolute top-0 left-0 h-12 w-px bg-white/10" />
				<div className="absolute top-0 left-0 h-px w-12 bg-white/10" />
				<div className="absolute right-0 bottom-0 h-12 w-px bg-white/10" />
				<div className="absolute right-0 bottom-0 h-px w-12 bg-white/10" />
			</div>

			{/* Supplementary Technical Label at bottom */}
			<div className="pointer-events-none absolute right-8 bottom-12 text-[9px] font-bold tracking-[0.3em] text-white/20 uppercase lg:right-20">
				COORD: 23_01_AV07X
			</div>

			{/* Diamonds */}
			<div className="pointer-events-none absolute top-[-6.5px] left-6 z-50 flex size-3 -translate-x-1/2 items-center justify-center lg:left-12">
				<div className="size-1.5 rotate-45 border border-white/30 bg-black" />
			</div>
			<div className="pointer-events-none absolute top-[-6.5px] right-6 z-50 flex size-3 translate-x-1/2 items-center justify-center lg:right-12">
				<div className="size-1.5 rotate-45 border border-white/30 bg-black" />
			</div>
			{/* Pulse bg */}
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

			{/* Text bg */}
			<div className="pointer-events-none absolute top-1/2 -right-20 -translate-y-1/2 text-[20vw] font-black tracking-tighter text-white/1 select-none">
				LIVE
			</div>

			<div className="relative z-10 mx-auto w-full pl-6 lg:pl-10">
				<div className="mb-10 flex flex-col space-y-4">
					<motion.h2
						variants={titleVariants}
						className="bg-linear-to-b from-white to-white/60 bg-clip-text text-4xl font-bold tracking-tighter text-transparent md:text-5xl lg:text-7xl"
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
