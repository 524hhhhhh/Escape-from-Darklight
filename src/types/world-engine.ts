import { WorldState } from "@/types/world-state";

type WorldSystem = (
  worldState: WorldState,
  frameInfo: { time: { delta: number; now: number } },
) => WorldState;

type WorldLoopHandle = {
  start: () => void;
  stop: () => void;
};

export type { WorldSystem, WorldLoopHandle };
