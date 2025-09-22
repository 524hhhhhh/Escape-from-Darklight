import { WorldPosition } from "@/types/position";
import { FacingDirection } from "@/types/sprite";
import { Player } from "@/types/world-state";

type CreatePlayerArgs = WorldPosition & { facing?: FacingDirection };

export const createPlayer = ({
  x,
  y,
  facing = "N",
}: CreatePlayerArgs): Player => ({
  position: { x, y },
  facing,
});
