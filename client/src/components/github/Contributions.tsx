import { motion } from "motion/react";
import { GitHubCalendar } from "react-github-calendar";
import { Link } from "react-router";
import { GithubIcon } from "../ui/GithubIcon";

const Contributions: React.FC = () => {
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
			className="relative z-10 border-t border-white/10 py-24 text-white"
		>
			<div className="pointer-events-none absolute top-0 left-1/2 z-50 hidden w-full max-w-7xl -translate-x-1/2 xl:flex">
				<div className="absolute top-0 left-0 flex size-3 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
					<div className="size-1.5 rotate-45 border border-white/30 bg-black" />
				</div>
				<div className="absolute top-0 right-0 flex size-3 translate-x-1/2 -translate-y-1/2 items-center justify-center">
					<div className="size-1.5 rotate-45 border border-white/30 bg-black" />
				</div>
			</div>

			<div className="relative mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-8 lg:px-20">
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

				<div className="pointer-events-none absolute top-1/2 -left-10 -translate-y-1/2 text-[20vw] font-black tracking-tighter text-white/1 uppercase select-none">
					GitHub
				</div>

				<div className="relative z-10 mx-auto w-full">
					<div className="mb-16 flex w-full flex-col gap-8 md:flex-row md:items-end md:justify-between">
						<div className="flex flex-col space-y-4">
							<motion.h2
								variants={titleVariants}
								className="3xl:text-6xl bg-linear-to-b from-white to-white/60 bg-clip-text text-4xl font-bold tracking-tighter text-transparent md:text-5xl"
							>
								Contributions<span className="text-white/30">.</span>
							</motion.h2>
							<motion.div
								variants={itemVariants}
								className="relative pl-6 before:absolute before:inset-y-1 before:left-0 before:w-px before:bg-linear-to-b before:from-transparent before:via-white/20 before:to-transparent"
							>
								<p className="max-w-2xl text-base leading-relaxed font-light text-white/50">
									A visual footprint of my daily code commits. <br />
									<span className="text-white/80">
										Building consistently
									</span>{" "}
									in the open.
								</p>
							</motion.div>
						</div>
						<motion.div
							variants={{
								hidden: { opacity: 0, scale: 0.9 },
								visible: {
									opacity: 1,
									scale: 1,
									transition: {
										duration: 0.6,
										ease: [0.22, 1, 0.36, 1] as any,
									},
								},
							}}
							className="mb-2 flex flex-wrap items-center gap-4"
						>
							<Link
								to="https://github.com/avijit07x"
								target="_blank"
								rel="noopener noreferrer"
								className="group flex items-center gap-3 border border-white/5 bg-white/3 px-5 py-2.5 text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase backdrop-blur-sm transition-all hover:border-white/10 hover:bg-white/5 hover:text-white md:w-41"
							>
								<GithubIcon
									size={14}
									className="transition-transform group-hover:scale-110"
								/>
								View Profile
							</Link>
							<div className="flex items-center gap-4 border border-white/5 bg-white/3 px-5 py-2.5 text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase backdrop-blur-sm md:w-41">
								<span className="relative flex size-2.5">
									<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500/40 opacity-75"></span>
									<span className="absolute inline-flex h-full w-full scale-150 animate-pulse rounded-full bg-green-500/10"></span>
									<span className="relative inline-flex size-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
								</span>
								Live Graph
							</div>
						</motion.div>
					</div>

					<div className="group relative">
						<div className="pointer-events-none absolute -top-6 left-0 flex items-center gap-4 text-[7px] font-bold tracking-[0.2em] text-white/10 uppercase">
							<span>[ SCAN_START ]</span>
							<div className="h-px w-10 bg-white/5" />
						</div>
						<div className="pointer-events-none absolute right-0 -bottom-6 flex items-center gap-4 text-right text-[7px] font-bold tracking-[0.2em] text-white/10 uppercase">
							<div className="h-px w-10 bg-white/5" />
							<span>[ SCAN_END ]</span>
						</div>

						<motion.div
							variants={{
								hidden: { opacity: 0, scaleY: 0.5, originY: 0 },
								visible: {
									opacity: 1,
									scaleY: 1,
									transition: { duration: 0.8 },
								},
							}}
							className="relative w-full overflow-x-auto border-y border-white/5 bg-linear-to-r from-transparent via-white/2 to-transparent py-14"
						>
							<div className="min-w-max px-4 text-white/80 transition-all duration-300 duration-500 hover:text-white">
								<GitHubCalendar
									username="avijit07x"
									blockSize={11}
									blockMargin={6}
									fontSize={12}
									blockRadius={0}
									theme={{
										light: [
											"#111111",
											"#27272a",
											"#52525b",
											"#a1a1aa",
											"#ffffff",
										],
										dark: [
											"#111111",
											"#27272a",
											"#52525b",
											"#a1a1aa",
											"#ffffff",
										],
									}}
								/>
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</motion.section>
	);
};

export default Contributions;
