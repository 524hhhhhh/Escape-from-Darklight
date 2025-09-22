import type { FacingDirection } from "@/types/sprite";
import { WorldPosition } from "@/types/position";

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
};

type Renderable<TProps = unknown> = {
  renderer?: React.ComponentType<TProps>;
} & TProps;

type WorldState = {
  view: Viewport;
  world: World;
  input: InputVector;
  player: Player;
  entities: Record<string, Renderable & Record<string, unknown>>;
};

export type { Viewport, World, InputVector, Player, WorldState };
