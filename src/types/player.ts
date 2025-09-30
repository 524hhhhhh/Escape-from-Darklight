import type { WorldPosition } from "@/types/position";
import type { FacingDirection } from "@/types/sprite-animation";

type Player = {
  position: WorldPosition;
  facing: FacingDirection;
  halfW: number;
  halfH: number;
  hazardCooldowns: Map<string, number>;
};

export { Player };
