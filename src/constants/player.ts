import { FacingDirection } from "@/types/sprite";

const PLAYER = {
  MOVE_SPEED: 200,
  MIN_FACING_SPEED: 0.05,
};

const SPRITE = {
  FRAME_SIZE: 64,
  ROWS: 1,
  FRAMES_PER_DIRECTION: 1,
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
  DIRECTION_TO_COLUMN: {
    S: 0,
    SE: 1,
    E: 2,
    NE: 3,
    N: 4,
    NW: 5,
    W: 6,
    SW: 7,
  } as const satisfies Record<FacingDirection, number>,
};

export { PLAYER, SPRITE };
