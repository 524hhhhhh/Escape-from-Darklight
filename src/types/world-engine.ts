import { WorldState } from "@/types/world-state";

type FrameInfo = { time: { delta: number; now: number } };

type WorldSystem = (worldState: WorldState, frameInfo: FrameInfo) => WorldState;

type WorldLoopHandle = {
  start: () => void;
  stop: () => void;
  resetWorld: (newWorld: WorldState) => void;
  getWorld: () => WorldState;
};

export type { FrameInfo, WorldSystem, WorldLoopHandle };
