import { TileGrid } from "@/lib/validator/map-schema";
import type {
  BaseSize,
  TilePosition,
  CenterPosition,
  WorldPosition,
} from "./position";

type TransformMeta = BaseSize & {
  tileSizeRender: number;
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

  solids: [];
  exits: TransformExit[];
  spawn: TransformSpawn;

  triggers?: unknown[];
  hazards?: unknown[];
};

type TileGridLayer = Pick<TransformMap, "grid" | "tileSize" | "meta">;

export type {
  TransformMeta,
  TransformSpawn,
  TransformExit,
  TransformMap,
  TileGridLayer,
};
