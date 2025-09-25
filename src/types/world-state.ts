import type { FacingDirection } from "@/types/sprite";
import type { BaseSize, WorldPosition } from "@/types/position";
import { TransformMap } from "./map-transform";

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
};

type Renderable<TProps> = {
  renderer: React.ComponentType<TProps>;
  props: TProps;
};

type PlayerSpriteProps = { playerRef: Player; view: Viewport };

type Entities = {
  playerSprite: Renderable<PlayerSpriteProps>;
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
