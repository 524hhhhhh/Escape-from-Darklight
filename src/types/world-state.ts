import type { TransformMap } from "@/types/map-transform";
import type { Player } from "@/types/player";
import type { PlayerSprite } from "@/types/sprite-animation";
import type { TriggerRegistry } from "@/types/registry";

type Viewport = {
  offsetX: number;
  offsetY: number;
  zoom: number;
  width?: number;
  height?: number;
};

type WorldSize = {
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
  world: WorldSize;
  input: InputVector;
  entities: Entities;
  map: TransformMap;
  triggers: TriggerRegistry;
  dt: number;
};

export type { Viewport, WorldSize, InputVector, Player, WorldState };
