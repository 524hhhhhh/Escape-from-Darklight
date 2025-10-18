import type { WorldState } from "./world-state";

type LightFrame = {
  worldCenterX: number;
  worldCenterY: number;
  currentRadius: number;
};

type LightState = {
  lightLife?: number;
};

type LightingWorldState = WorldState & {
  light: LightState;
  lightFrame?: LightFrame;
};

export type { LightFrame, LightState, LightingWorldState };
