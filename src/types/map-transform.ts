import { TileGrid } from "@/lib/validator/map-schema";
import type {
  BaseSize,
  TilePosition,
  CenterPosition,
  WorldPosition,
} from "@/types/position";
import type { SolidRegistry } from "@/types/registry";

type TransformMeta = BaseSize & {
  tileRenderSize: number;
  tileCollisionSize: number;
  version: string;
};

type TransformSpawn = TilePosition & WorldPosition & CenterPosition;

type TransformMap = {
  grid: TileGrid;
  tileSize: number;
  meta: TransformMeta;

  solids: SolidRegistry;
  spawn: TransformSpawn;

  triggers?: unknown[];
  hazards?: unknown[];
};

export type { TransformMeta, TransformSpawn, TransformMap };
