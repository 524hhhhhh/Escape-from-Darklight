type FacingDirection = "S" | "SE" | "E" | "NE" | "N" | "NW" | "W" | "SW";

type AnimationState = "IDLE" | "RUN" | "HIT" | "DEATH";

type FrameSprite = {
  frameIndex: number;
  frameTimer: number;
};

type PlayerSprite = {
  state: AnimationState;
  frameIndex: number;
  frameTimer: number;

  hitFrameRate?: number;
  hitEndAt?: number;
  deathEndAt?: number;
};

export type { FacingDirection, AnimationState, PlayerSprite, FrameSprite };
