import type {
  TransformExit,
  TransformMap,
  TransformSpawn,
} from "@/types/map-transform";
import { MapJson } from "@/lib/validator/map-schema";
import { transformWorldEntity } from "../../lib/transform-world-entity";
import { buildCollisionIndex } from "./collision/build-collision-index";
import { createSolidRegistry } from "./collision/create-collision-registries";
import { TILE, TILE_SIZE } from "@/constants/map";

export function transformMap(src: MapJson): TransformMap {
  const { meta, grid, spawn, exits } = src;
  const tileSize = TILE_SIZE.RENDER;

  const transformExits: TransformExit[] = (exits ?? []).map((exit) =>
    transformWorldEntity(exit, tileSize),
  );

  const transformSpawn: TransformSpawn = transformWorldEntity(spawn, tileSize);

  const solids = createSolidRegistry();
  buildCollisionIndex(grid, solids, TILE.WALL);

  return {
    grid,
    tileSize,
    meta: {
      width: meta.width,
      height: meta.height,
      tileRenderSize: TILE_SIZE.RENDER,
      tileCollisionSize: TILE_SIZE.COLLISION,
      version: meta.version,
    },
    solids,
    triggers: [],
    hazards: [],
    spawn: transformSpawn,
    exits: transformExits,
  };
}
