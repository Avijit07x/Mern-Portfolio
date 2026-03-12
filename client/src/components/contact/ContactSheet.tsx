import { Send } from "lucide-react";
import { AnimatePresence, motion, useMotionValue } from "motion/react";
import React, {
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";
import { createPortal } from "react-dom";
import Socials from "../socials/Socials";
import ContactForm from "./ContactForm";

type Props = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

const ContactSheet: React.FC<Props> = ({ open, setOpen }) => {
	const y = useMotionValue(0);
	const startY = useRef(0);
	const [isSent, setIsSent] = useState(false);

	useEffect(() => {
		if (open) {
			y.set(0);
			setIsSent(false);
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

	return createPortal(
		<AnimatePresence>
			{open && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: isSent ? 0 : 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className={`fixed inset-0 z-200 bg-black/60 backdrop-blur-sm ${isSent ? "pointer-events-none" : ""}`}
						onClick={() => setOpen(false)}
					/>

					<motion.div
						initial={{ y: "100%", opacity: 0, scale: 0.95 }}
						animate={
							isSent
								? {
										y: [0, 0, -1000],
										x: [0, 0, 1000],
										scale: [1, 0.4, 0],
										rotateX: [0, 45, 0],
										rotateY: [0, 90, 0],
										rotateZ: [0, 20, 45],
										opacity: [1, 1, 0],
										transition: {
											duration: 1.8,
											times: [0, 0.4, 1],
											ease: ["easeInOut", "easeIn"],
										},
									}
								: {
										y: 0,
										opacity: 1,
										scale: 1,
										transition: {
											type: "spring",
											damping: 25,
											stiffness: 220,
											mass: 0.8,
										},
									}
						}
						exit={{ y: "100%", opacity: 0, scale: 0.95 }}
						onAnimationComplete={() => {
							if (isSent) {
								setOpen(false);
								setIsSent(false);
								y.set(0);
							}
						}}
						className="pointer-events-none fixed inset-x-0 bottom-0 z-210 flex w-full justify-center sm:px-6"
						style={{ perspective: "1500px" }}
					>
						<motion.div
							layout
							className={`pointer-events-auto w-full touch-none overflow-hidden border-white/10 bg-black shadow-[0_-10px_50px_rgba(0,0,0,0.8)] backdrop-blur-3xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:w-lg ${
								isSent
									? "flex aspect-square w-16! items-center justify-center rounded-xl bg-white p-0! text-black"
									: "rounded-none border-x border-t"
							}`}
							style={{ y }}
							drag={false}
							onPointerDown={handlePointerDown}
						>
							<AnimatePresence mode="wait">
								{!isSent ? (
									<motion.div
										key="form-content"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{
											opacity: 0,
											scaleX: 0.1,
											scaleY: 0.1,
											rotateY: 90,
											filter: "blur(5px)",
										}}
										transition={{ duration: 0.5, ease: "easeInOut" }}
									>
										<div className="flex h-12 w-full items-center justify-center border-b border-white/5">
											<div className="h-1 w-12 rounded-full bg-white/10" />
										</div>

										<div className="space-y-6 px-8 py-8 pb-12">
											<div className="space-y-1 text-center">
												<h2 className="bg-linear-to-b from-white to-white/60 bg-clip-text text-2xl font-bold tracking-tighter text-transparent">
													Work with me<span className="text-white/20">.</span>
												</h2>
												<p className="text-[10px] font-light tracking-widest text-white/40 uppercase">
													Segmented inquiry
												</p>
											</div>

											<ContactForm onSuccess={() => setIsSent(true)} />

											<div className="flex items-center gap-6 opacity-20">
												<div className="h-px w-full bg-linear-to-r from-transparent to-white"></div>
												<span className="text-[8px] font-bold tracking-[0.2em] text-white uppercase">
													OR
												</span>
												<div className="h-px w-full bg-linear-to-l from-transparent to-white"></div>
											</div>

											<div className="flex scale-90 justify-center opacity-60 transition-opacity hover:opacity-100">
												<Socials />
											</div>
										</div>
									</motion.div>
								) : (
									<motion.div
										key="plane-icon"
										initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
										animate={{
											opacity: 1,
											scale: 1,
											rotate: 0,
											transition: {
												delay: 0.4,
												duration: 0.4,
												ease: "backOut",
											},
										}}
										className="flex h-full w-full items-center justify-center"
									>
										<Send size={28} className="text-black" />
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>
					</motion.div>
				</>
			)}
		</AnimatePresence>,
		document.body,
	);
};

export default ContactSheet;
