import { SPRITE } from "@/constants/player";
import { FacingDirection } from "@/types/sprite";

export const getSpriteColumn = (direction: FacingDirection, frame: number) =>
  SPRITE.DIRECTION_TO_COLUMN[direction] * SPRITE.FRAMES_PER_DIRECTION + frame;
