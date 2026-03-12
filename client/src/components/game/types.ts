export type GhostState = "PROWLING" | "LUNGING" | "DYING";
export type ScreenEdge = "top" | "bottom" | "left" | "right";

export interface Ghost {
	id: number;
	x: number;
	y: number;
	edge: ScreenEdge;
	state: GhostState;
	revealed: boolean;
	targetX?: number;
	targetY?: number;
	dialogue?: string;
}
