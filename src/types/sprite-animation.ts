type FacingDirection = "S" | "SE" | "E" | "NE" | "N" | "NW" | "W" | "SW";

type AnimationState = "IDLE" | "RUN" | "HIT";

type PlayerSprite = {
  state: AnimationState;
  frameIndex: number;
  frameTimer: number;

  hitFrameRate?: number;
  hitEndAt?: number;
};

export type { FacingDirection, AnimationState, PlayerSprite };
