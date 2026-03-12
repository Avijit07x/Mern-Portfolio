import { motion, MotionValue, useTransform } from "motion/react";

interface GhostEyeProps {
	mouseX: MotionValue<number>;
	mouseY: MotionValue<number>;
	ghostX: number;
	ghostY: number;
	eyeOffsetX: number;
	eyeOffsetY: number;
}

const GhostEye = ({
	mouseX,
	mouseY,
	ghostX,
	ghostY,
	eyeOffsetX,
	eyeOffsetY,
}: GhostEyeProps) => {
	const pupilX = useTransform([mouseX, mouseY], ([x, y]) => {
		const dx = (x as number) - ghostX;
		const dy = (y as number) - ghostY;
		const angle = Math.atan2(dy, dx);
		return eyeOffsetX + Math.cos(angle) * 2.5;
	});

	const pupilY = useTransform([mouseX, mouseY], ([x, y]) => {
		const dx = (x as number) - ghostX;
		const dy = (y as number) - ghostY;
		const angle = Math.atan2(dy, dx);
		return eyeOffsetY + Math.sin(angle) * 2.5;
	});

	return (
		<>
			<circle cx={eyeOffsetX} cy={eyeOffsetY} r="3" fill="white" />
			<motion.circle cx={pupilX} cy={pupilY} r="1.5" fill="black" />
		</>
	);
};

export default GhostEye;
