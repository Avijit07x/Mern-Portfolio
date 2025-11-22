import { AnimatePresence, motion, useMotionValue } from "motion/react";
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import Socials from "../socials/Socials";
import ContactForm from "./ContactForm";

type Props = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

const ContactSheet: React.FC<Props> = ({ open, setOpen }) => {
	const y = useMotionValue(0);
	const startY = useRef(0);

	useEffect(() => {
		if (open) {
			y.set(0);
		}
	}, [open, y]);

	const handlePointerDown = (e: React.PointerEvent) => {
		startY.current = e.clientY;
		window.addEventListener("pointermove", handlePointerMove);
		window.addEventListener("pointerup", handlePointerUp);
	};

	const handlePointerMove = (e: PointerEvent) => {
		const diff = e.clientY - startY.current;
		if (diff > 0) {
			y.set(diff);
		}
	};

	const handlePointerUp = (e: PointerEvent) => {
		const diff = e.clientY - startY.current;
		if (diff > 80) {
			setOpen(false);
		} else {
			y.set(0);
		}
		window.removeEventListener("pointermove", handlePointerMove);
		window.removeEventListener("pointerup", handlePointerUp);
	};

	return (
		<AnimatePresence>
			{open && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 z-90 bg-black/20 backdrop-blur-sm"
						onClick={() => setOpen(false)}
					/>

					<motion.div
						initial={{ y: "100%" }}
						animate={{ y: 0 }}
						exit={{ y: "100%" }}
						transition={{ type: "spring", damping: 30, stiffness: 350 }}
						className="fixed inset-x-0 bottom-0 z-100 flex w-full justify-center sm:mx-auto sm:w-fit"
					>
						<motion.div
							className="w-full touch-none rounded-t-xl bg-white/5 shadow-lg backdrop-blur-2xl md:w-lg"
							style={{ y }}
							drag={false}
							onPointerDown={handlePointerDown}
						>
							{/* Drag Handle */}
							<div className="mx-auto my-2 h-1.5 w-12 cursor-grabbing rounded-full bg-gray-300" />

							{/* Content */}
							<div className="space-y-6 px-7 py-6">
								<ContactForm />
								<div className="flex items-center gap-5">
									<div className="h-px w-full bg-white/10"></div>
									<span>or</span>
									<div className="h-px w-full bg-white/10"></div>
								</div>
								<Socials />
							</div>
						</motion.div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default ContactSheet;
