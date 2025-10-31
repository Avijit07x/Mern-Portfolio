import React, { useEffect } from "react";

type Props = {
	activity?: IActivity;
};

const Duration: React.FC<Props> = ({ activity }) => {
	const [duration, setDuration] = React.useState<string>("");
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
	return <span className="text-green-600">{duration}</span>;
};

export default Duration;
