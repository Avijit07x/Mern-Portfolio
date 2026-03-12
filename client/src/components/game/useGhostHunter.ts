import { useMotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
	BASE_MAX_GHOSTS,
	GHOST_DIALOGUES,
	IDLE_ATTACK_THRESHOLD,
	PEAK_MAX_GHOSTS,
	SPOTLIGHT_RADIUS,
} from "./constants";
import { Ghost, GhostState, ScreenEdge } from "./types";

const INSIDE_OFFSET = 60;

const getEdgePosition = (edge: ScreenEdge) => {
	const margin = 150;
	switch (edge) {
		case "top":
			return {
				x: margin + Math.random() * (window.innerWidth - margin * 2),
				y: INSIDE_OFFSET,
			};
		case "bottom":
			return {
				x: margin + Math.random() * (window.innerWidth - margin * 2),
				y: window.innerHeight - INSIDE_OFFSET - 40,
			};
		case "left":
			return {
				x: INSIDE_OFFSET,
				y: margin + Math.random() * (window.innerHeight - margin * 2),
			};
		case "right":
			return {
				x: window.innerWidth - INSIDE_OFFSET - 40,
				y: margin + Math.random() * (window.innerHeight - margin * 2),
			};
	}
};

export const useGhostHunter = () => {
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const [isVisible, setIsVisible] = useState(false);
	const [ghosts, setGhosts] = useState<Ghost[]>([]);
	const [isCombat, setIsCombat] = useState(false);
	const [corruptionLevel, setCorruptionLevel] = useState(0);
	const [isHit, setIsHit] = useState(false);
	const [isGameActive, setIsGameActive] = useState(true);
	const attackCount = useRef(0);
	const lastMoveTime = useRef(Date.now());
	const pendingImpacts = useRef<Set<number>>(new Set());

	useEffect(() => {
		const edges: ScreenEdge[] = ["bottom", "top", "left", "right"];
		let spawnCount = 0;
		const spawnInterval = setInterval(() => {
			if (spawnCount < BASE_MAX_GHOSTS) {
				const edge = edges[spawnCount % 4];
				const pos = getEdgePosition(edge);
				setGhosts((prev) => {
					if (prev.length >= BASE_MAX_GHOSTS) return prev;
					return [
						...prev,
						{
							id: Date.now() + Math.random(),
							...pos,
							edge,
							state: "PROWLING",
							revealed: false,
						},
					];
				});
				spawnCount++;
			} else {
				clearInterval(spawnInterval);
			}
		}, 3000);

		return () => clearInterval(spawnInterval);
	}, []);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			mouseX.set(e.clientX);
			mouseY.set(e.clientY);
			setIsVisible(true);
			lastMoveTime.current = Date.now();

			setGhosts((prev) =>
				prev.map((g) => {
					const dx = e.clientX - g.x;
					const dy = e.clientY - g.y;
					const dist = Math.sqrt(dx * dx + dy * dy);
					if (dist < SPOTLIGHT_RADIUS) return { ...g, revealed: true };
					return g;
				}),
			);
		};
		const handleMouseLeave = () => setIsVisible(false);
		window.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseleave", handleMouseLeave);
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, [mouseX, mouseY]);

	useEffect(() => {
		const interval = setInterval(() => {
			const isIdle = Date.now() - lastMoveTime.current > IDLE_ATTACK_THRESHOLD;

			setGhosts((prev) =>
				prev.map((g) => {
					if (g.state === "DYING" || g.state === "LUNGING") return g;
					const chance = Math.random();

					if (isGameActive && (isIdle || chance < 0.05) && isVisible) {
						return {
							...g,
							state: "LUNGING",
							targetX: mouseX.get(),
							targetY: mouseY.get(),
							dialogue: undefined,
						};
					}

					if (g.state === "PROWLING" && !isIdle) {
						const move = (Math.random() - 0.5) * 30;
						if (g.edge === "top" || g.edge === "bottom") {
							return {
								...g,
								x: Math.max(100, Math.min(window.innerWidth - 100, g.x + move)),
							};
						} else {
							return {
								...g,
								y: Math.max(
									100,
									Math.min(window.innerHeight - 100, g.y + move),
								),
							};
						}
					}
					return g;
				}),
			);
		}, 1000);
		return () => clearInterval(interval);
	}, [isVisible, isGameActive]);

	useEffect(() => {
		ghosts.forEach((ghost) => {
			if (ghost.state === "LUNGING" && !pendingImpacts.current.has(ghost.id)) {
				pendingImpacts.current.add(ghost.id);
				setTimeout(() => {
					setGhosts((prev) => {
						const g = prev.find((p) => p.id === ghost.id);
						if (!g) {
							pendingImpacts.current.delete(ghost.id);
							return prev;
						}

						if (g.state === "LUNGING") {
							handleImpact();
						}
						pendingImpacts.current.delete(ghost.id);

						const pos = getEdgePosition(g.edge);
						return prev.map((p) =>
							p.id === ghost.id ? { ...p, ...pos, state: "PROWLING" } : p,
						);
					});
				}, 600);
			}
		});
	}, [ghosts]);

	const handleImpact = () => {
		if (!isGameActive) return;
		attackCount.current += 1;
		setCorruptionLevel((c) => {
			const next = Math.min(c + 1, 20);
			if (next === 20) {
				setGhosts((prev) => {
					if (prev.length >= PEAK_MAX_GHOSTS) return prev;
					const reinforcements = [];
					const edges: ScreenEdge[] = ["top", "bottom", "left", "right"];
					for (let i = prev.length; i < PEAK_MAX_GHOSTS; i++) {
						const edge = edges[i % 4];
						const pos = getEdgePosition(edge);
						reinforcements.push({
							id: Date.now() + Math.random() + i,
							...pos,
							edge,
							state: "PROWLING" as GhostState,
							revealed: false,
						});
					}
					return [...prev, ...reinforcements];
				});
			}
			return next;
		});
		setIsHit(true);
		setTimeout(() => setIsHit(false), 200);
		if (attackCount.current >= 3 && !isCombat) {
			setIsCombat(true);
		}
	};

	const killGhost = (id: number) => {
		let wasDying = false;
		setGhosts((prev) => {
			const ghost = prev.find((g) => g.id === id);
			if (!ghost || ghost.state === "DYING") {
				wasDying = true;
				return prev;
			}
			return prev.map((g) => (g.id === id ? { ...g, state: "DYING" } : g));
		});

		if (wasDying) return;

		setCorruptionLevel((c) => Math.max(c - 5, 0));

		setTimeout(() => {
			setGhosts((prev) => {
				const remaining = prev.filter((g) => g.id !== id);
				if (remaining.length === 0) {
					setIsCombat(false);
					if (isGameActive) {
						setIsGameActive(false);
						setCorruptionLevel(0);
						setTimeout(() => {
							resetToPassive();
						}, 3000);
					}
				}
				return remaining;
			});

			if (!isGameActive) {
				setTimeout(() => {
					setGhosts((prev) => {
						const currentLimit =
							corruptionLevel >= 15 ? PEAK_MAX_GHOSTS : BASE_MAX_GHOSTS;
						if (prev.length >= currentLimit) return prev;
						const edges: ScreenEdge[] = ["top", "bottom", "left", "right"];
						const edge = edges[Math.floor(Math.random() * 4)];
						const pos = getEdgePosition(edge);
						return [
							...prev,
							{
								id: Date.now() + Math.random(),
								...pos,
								edge,
								state: "PROWLING",
								revealed: false,
							},
						];
					});
				}, 8000);
			}
		}, 400);
	};

	const resetToPassive = () => {
		setCorruptionLevel(0);
		setIsCombat(false);
		setIsGameActive(false);
		attackCount.current = 0;
		setGhosts(() => {
			const edges: ScreenEdge[] = ["bottom", "top", "left", "right"];
			return Array.from({ length: BASE_MAX_GHOSTS }).map((_, i) => {
				const edge = edges[i % 4];
				const pos = getEdgePosition(edge);
				return {
					id: Date.now() + Math.random() + i,
					...pos,
					edge,
					state: "PROWLING" as GhostState,
					revealed: false,
				};
			});
		});
	};

	const startHunt = () => {
		setIsGameActive(true);
		setIsCombat(true);
		setGhosts((prev) => {
			if (prev.length > 0) return prev;
			const edges: ScreenEdge[] = ["bottom", "top", "left", "right"];
			return Array.from({ length: BASE_MAX_GHOSTS }).map((_, i) => {
				const edge = edges[i % 4];
				const pos = getEdgePosition(edge);
				return {
					id: Date.now() + Math.random() + i,
					...pos,
					edge,
					state: "PROWLING" as GhostState,
					revealed: false,
				};
			});
		});
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setGhosts((prev) => {
				const prowlers = prev.filter((g) => g.state === "PROWLING");
				if (prowlers.length === 0) return prev;

				const target = prowlers[Math.floor(Math.random() * prowlers.length)];
				const dialogue =
					GHOST_DIALOGUES[Math.floor(Math.random() * GHOST_DIALOGUES.length)];

				const updated = prev.map((g) =>
					g.id === target.id ? { ...g, dialogue } : g,
				);

				setTimeout(() => {
					setGhosts((current) =>
						current.map((g) =>
							g.id === target.id ? { ...g, dialogue: undefined } : g,
						),
					);
				}, 3000);

				return updated;
			});
		}, 3500);

		return () => clearInterval(interval);
	}, []);

	const giveUp = () => {
		resetToPassive();
	};

	return {
		mouseX,
		mouseY,
		isVisible,
		ghosts,
		isCombat,
		corruptionLevel,
		isHit,
		isGameActive,
		killGhost,
		startHunt,
		giveUp,
	};
};
