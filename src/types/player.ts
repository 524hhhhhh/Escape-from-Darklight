import type { WorldPosition } from "@/types/position";
import type { FacingDirection } from "@/types/sprite-animation";

type PlayerStats = {
  maxHp: number;
};

type PlayerRuntime = {
  position: WorldPosition;
  facing: FacingDirection;
  halfW: number;
  halfH: number;
  hp: number;
  hazardCooldowns: Map<string, number>;
};

type Player = PlayerRuntime & {
  stats: PlayerStats;
};

export { Player, PlayerRuntime, PlayerStats };
