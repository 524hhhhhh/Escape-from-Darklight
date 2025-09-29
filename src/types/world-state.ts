import type {
  FacingDirection,
  PlayerAnimation,
} from "@/types/sprite-animation";
import type { BaseSize, WorldPosition } from "@/types/position";
import type { TransformMap } from "@/types/map-transform";

type Viewport = {
  offsetX: number;
  offsetY: number;
  zoom: number;
  width?: number;
  height?: number;
};

type World = {
  width: number;
  height: number;
};

type InputVector = {
  x: number;
  y: number;
  power: number;
};

type Player = {
  position: WorldPosition;
  facing: FacingDirection;
  size?: BaseSize;
  animation: PlayerAnimation;
};

type PlayerSpriteProps = { playerRef: Player; view: Viewport };

type Entities = {
  player: Player;
};

type WorldState = {
  view: Viewport;
  world: World;
  input: InputVector;
  player: Player;
  entities: Entities;
  map?: TransformMap;
  dt?: number;
};

export type {
  Viewport,
  World,
  InputVector,
  Player,
  WorldState,
  PlayerSpriteProps,
};
