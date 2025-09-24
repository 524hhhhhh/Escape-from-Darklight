import { TileGrid } from "@/lib/validator/map-schema";
import type {
  BaseSize,
  TilePosition,
  CenterPosition,
  WorldPosition,
} from "./position";
import type { SolidRegistry } from "@/types/registry";

type TransformMeta = BaseSize & {
  tileRenderSize: number;
  tileCollisionSize: number;
  version: string;
};

type TransformSpawn = TilePosition & WorldPosition & CenterPosition;

type TransformExit = TilePosition &
  WorldPosition &
  CenterPosition & {
    id?: string;
  };

type TransformMap = {
  grid: TileGrid;
  tileSize: number;
  meta: TransformMeta;

  solids: SolidRegistry;
  exits: TransformExit[];
  spawn: TransformSpawn;

  triggers?: unknown[];
  hazards?: unknown[];
};

export type { TransformMeta, TransformSpawn, TransformExit, TransformMap };
