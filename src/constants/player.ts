import type { FacingDirection } from "@/types/sprite-animation";
import { TILE_SIZE } from "./map";

const PLAYER = {
  SPEED: 120,
  MAX_HP: 20,
  MIN_FACING_SPEED: 0.05,
  COLLIDER_W: Math.round(0.3 * TILE_SIZE.COLLISION),
  COLLIDER_H: Math.round(0.5 * TILE_SIZE.COLLISION),
  RENDER_SCALE: 3,
  ANCHOR_Y: 0.1,
};

const SPRITE = {
  FRAME_SIZE: 24,
  CLIPS: {
    IDLE: { FRAMES: 4, SOURCE: require("@assets/player/pink_idle.png") },
    RUN: { FRAMES: 4, SOURCE: require("@assets/player/pink_run.png") },
    HIT: { FRAMES: 4, SOURCE: require("@assets/player/pink_hit.png") },
  } as const,
  DIRECTIONS: [
    "S",
    "SE",
    "E",
    "NE",
    "N",
    "NW",
    "W",
    "SW",
  ] as const satisfies FacingDirection[],
};

const FRAME_RATE = {
  IDLE: 4,
  RUN: 10,
  HIT: 8,
};

const INPUT_DEADZONE = 0.08;

const isRightFacing = (direction: FacingDirection) =>
  direction === "E" || direction === "NE" || direction === "SE";

export { PLAYER, SPRITE, isRightFacing, FRAME_RATE, INPUT_DEADZONE };
