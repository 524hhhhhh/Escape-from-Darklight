import type { Player } from "@/types/player";
import type { WorldPosition } from "@/types/position";
import type { FacingDirection } from "@/types/sprite-animation";
import { PLAYER } from "@/constants/player";

type Start = WorldPosition & { facing: FacingDirection };

export function createPlayer(start: Start): Player {
  return {
    position: { worldX: start.worldX, worldY: start.worldY },
    facing: start.facing,
    halfW: PLAYER.COLLIDER_W / 2,
    halfH: PLAYER.COLLIDER_H / 2,
    hazardCooldowns: new Map(),
  };
}
