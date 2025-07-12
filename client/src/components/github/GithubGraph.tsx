import React from "react";

interface Props {
	contributions: {
		date: string;
		count: number;
	}[];
}

const boxSize = 10;
const boxGap = 4;

const getColor = (count: number) => {
	if (count === 0) return "#050817";
	if (count <= 2) return "#2e3355";
	if (count <= 4) return "#4c5280";
	if (count <= 6) return "#6d73aa";
	return "#a2a8d8";
};

const legendColors = ["#050817", "#2e3355", "#4c5280", "#6d73aa", "#a2a8d8"];

const getDayOfWeek = (dateStr: string) => {
	return new Date(dateStr).getDay(); // 0 (Sun) - 6 (Sat)
};

const getWeekIndex = (startDate: string, currentDate: string) => {
	const start = new Date(startDate);
	const current = new Date(currentDate);
	const diff = Math.floor((+current - +start) / (1000 * 60 * 60 * 24));
	return Math.floor(diff / 7);
};

const GithubGraph: React.FC<Props> = ({ contributions }) => {
	if (!contributions?.length) return null;

	const startDate = contributions[0].date;
	const totalWeeks =
		getWeekIndex(startDate, contributions[contributions.length - 1].date) + 1;

	const width = totalWeeks * (boxSize + boxGap);
	const height = 7 * (boxSize + boxGap) + 20; // extra for month labels

	return (
		<div className="mx-auto w-fit rounded pt-0 p-4">
			<svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
				{/* Contribution Rectangles */}
				{contributions.map((day, index) => {
					const x = getWeekIndex(startDate, day.date) * (boxSize + boxGap);
					const y = getDayOfWeek(day.date) * (boxSize + boxGap) + 15;

					return (
						<rect
							key={index}
							x={x}
							y={y}
							width={boxSize}
							height={boxSize}
							rx="2"
							ry="2"
							fill={getColor(day.count)}
						>
							<title>{`${day.date}: ${day.count} contributions`}</title>
						</rect>
					);
				})}
			</svg>

			<div className="flex items-center justify-between">
				<p className="text-sm text-white">
					{contributions.reduce((sum, d) => sum + d.count, 0)} contributions in
					the last year
				</p>
				{/* Legend */}
				<div className="flex items-center gap-2 text-sm text-gray-400">
					<span>Less</span>
					<div className="flex gap-1">
						{legendColors.map((color, i) => (
							<div
								key={i}
								className="size-2.5 rounded-[2px]"
								style={{ backgroundColor: color }}
							/>
						))}
					</div>
					<span>More</span>
				</div>
			</div>
		</div>
	);
};

export default GithubGraph;
