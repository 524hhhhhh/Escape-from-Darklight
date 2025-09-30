import type { TransformMap } from "@/types/map-transform";
import type { Player } from "@/types/player";
import type { PlayerSprite } from "@/types/sprite-animation";

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

type Entities = {
  player: Player;
  playerSprite: PlayerSprite;
};

type WorldState = {
  view: Viewport;
  world: World;
  input: InputVector;
  entities: Entities;
  map?: TransformMap;
  dt: number;
};

export type { Viewport, World, InputVector, Player, WorldState };
