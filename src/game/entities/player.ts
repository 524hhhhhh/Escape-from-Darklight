import type { WorldPosition } from "@/types/position";
import type { AnimationState, FacingDirection } from "@/types/sprite-animation";

type CreatePlayerArgs = WorldPosition & { facing?: FacingDirection };

export const createPlayer = ({
  worldX,
  worldY,
  facing = "N",
}: CreatePlayerArgs) => ({
  position: { worldX, worldY },
  facing,
  animation: {
    state: "IDLE" as AnimationState,
    frameIndex: 0,
    frameTimer: 0,
  },
});
