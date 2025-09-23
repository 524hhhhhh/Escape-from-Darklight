import type { WorldPosition } from "@/types/position";
import type { FacingDirection } from "@/types/sprite";
import type { Player } from "@/types/world-state";

type CreatePlayerArgs = WorldPosition & { facing?: FacingDirection };

export const createPlayer = ({
  worldX,
  worldY,
  facing = "N",
}: CreatePlayerArgs): Player => ({
  position: { worldX, worldY },
  facing,
});
