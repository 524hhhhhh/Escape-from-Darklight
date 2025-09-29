import { WorldState } from "@/types/world-state";

type FrameInfo = { time: { delta: number; now: number } };

type WorldSystem<T extends WorldState = WorldState> = (
  world: T,
  frameInfo: FrameInfo,
) => void;

export type { FrameInfo, WorldSystem };
