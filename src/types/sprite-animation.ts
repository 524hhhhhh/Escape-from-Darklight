type FacingDirection = "S" | "SE" | "E" | "NE" | "N" | "NW" | "W" | "SW";

type AnimationState = "IDLE" | "RUN";

type PlayerAnimation = {
  state: AnimationState;
  frameIndex: number;
  frameTimer: number;
};

export type { FacingDirection, AnimationState, PlayerAnimation };
