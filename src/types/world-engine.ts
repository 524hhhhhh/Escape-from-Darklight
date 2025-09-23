import { WorldState } from "@/types/world-state";

type WorldSystem = (
  worldState: WorldState,
  frameInfo: { time: { delta: number; now: number } },
) => WorldState;

type WorldLoopHandle = {
  start: () => void;
  stop: () => void;
  resetWorld: (newWorld: WorldState) => void;
  getWorld: () => WorldState;
};

export type { WorldSystem, WorldLoopHandle };
