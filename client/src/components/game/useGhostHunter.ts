import { useMotionValue } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
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
	const lastMoveTime = useRef(0);
	const pendingImpacts = useRef<Set<number>>(new Set());
	const introPlayed = useRef(false);
	const timeouts = useRef<number[]>([]);
	const dialogueInterval = useRef<number | null>(null);

	const clearAllTimeouts = useCallback(() => {
		timeouts.current.forEach(clearTimeout);
		timeouts.current = [];
	}, []);

	useEffect(() => {
		lastMoveTime.current = Date.now();
		return () => {
			clearAllTimeouts();
			if (dialogueInterval.current) clearInterval(dialogueInterval.current);
		};
	}, [clearAllTimeouts]);

	const spawnGhost = (edge?: ScreenEdge) => {
		const edges: ScreenEdge[] = ["top", "bottom", "left", "right"];
		const selectedEdge = edge || edges[Math.floor(Math.random() * 4)];
		const pos = getEdgePosition(selectedEdge);
		const id = Date.now() + Math.random();

		const newGhost: Ghost = {
			id,
			...pos,
			edge: selectedEdge,
			state: "PROWLING",
			revealed: false,
		};

		setGhosts((prev) => [...prev, newGhost]);
		return id;
	};

	useEffect(() => {
		if (introPlayed.current) return;
		introPlayed.current = true;

		const introEdge: ScreenEdge = (["top", "bottom", "left", "right"] as const)[
			Math.floor(Math.random() * 4)
		];
		
		let scoutId: number;
		const t1 = window.setTimeout(() => {
			scoutId = spawnGhost(introEdge);
		}, 0);
		timeouts.current.push(t1);

		const t2 = window.setTimeout(() => {
			setGhosts((prev) =>
				prev.map((g) =>
					g.id === scoutId
						? {
								...g,
								x: window.innerWidth / 2 - 100 + Math.random() * 200,
								y: window.innerHeight / 2 - 100 + Math.random() * 200,
								dialogue: "Who's peeking into the void?",
								revealed: true,
							}
						: g,
				),
			);
		}, 1500);
		timeouts.current.push(t2);

		const t3 = window.setTimeout(() => {
			setGhosts((prev) =>
				prev.map((g) =>
					g.id === scoutId ? { ...g, dialogue: "I'll call the others!" } : g,
				),
			);
		}, 4500);
		timeouts.current.push(t3);

		const t4 = window.setTimeout(() => {
			const pos = getEdgePosition(introEdge);
			setGhosts((prev) =>
				prev.map((g) =>
					g.id === scoutId ? { ...g, ...pos, dialogue: undefined } : g,
				),
			);

			const t5 = window.setTimeout(() => {
				setGhosts((prev) => prev.filter((g) => g.id !== scoutId));

				for (let i = 0; i < BASE_MAX_GHOSTS; i++) {
					spawnGhost();
				}
			}, 1000);
			timeouts.current.push(t5);
		}, 7000);
		timeouts.current.push(t4);

		return () => {
			introPlayed.current = false;
		};
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
					const distSq = dx * dx + dy * dy;
					if (distSq < SPOTLIGHT_RADIUS * SPOTLIGHT_RADIUS)
						return { ...g, revealed: true };
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
	}, [isVisible, isGameActive, mouseX, mouseY]);

	const handleImpact = useCallback(() => {
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
	}, [isGameActive, isCombat]);

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
	}, [ghosts, handleImpact]);

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
					// Trigger side effects outside of the update function
					setTimeout(() => {
						setIsCombat(false);
						if (isGameActive) {
							setIsGameActive(false);
							setCorruptionLevel(0);
							setTimeout(resetToPassive, 3000);
						}
					}, 0);
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
		setGhosts([]);
		for (let i = 0; i < BASE_MAX_GHOSTS; i++) {
			spawnGhost();
		}
	};

	const startHunt = () => {
		setIsGameActive(true);
		setIsCombat(true);
		if (ghosts.length === 0) {
			for (let i = 0; i < BASE_MAX_GHOSTS; i++) {
				spawnGhost();
			}
		}
	};

	useEffect(() => {
		dialogueInterval.current = window.setInterval(() => {
			setGhosts((prev) => {
				const prowlers = prev.filter((g) => g.state === "PROWLING");
				if (prowlers.length === 0) return prev;

				const target = prowlers[Math.floor(Math.random() * prowlers.length)];
				const dialogue =
					GHOST_DIALOGUES[Math.floor(Math.random() * GHOST_DIALOGUES.length)];

				const updated = prev.map((g) =>
					g.id === target.id ? { ...g, dialogue } : g,
				);

				const timer = window.setTimeout(() => {
					setGhosts((current) =>
						current.map((g) =>
							g.id === target.id ? { ...g, dialogue: undefined } : g,
						),
					);
				}, 3000);
				timeouts.current.push(timer);

				return updated;
			});
		}, 3500);

		return () => {
			if (dialogueInterval.current) clearInterval(dialogueInterval.current);
		};
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
