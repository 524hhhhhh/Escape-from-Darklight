import { WorldState } from "@/types/world-state";

type FrameInfo = { time: { delta: number; now: number } };

type WorldSystem = (worldState: WorldState, frameInfo: FrameInfo) => void;

export type { FrameInfo, WorldSystem };
