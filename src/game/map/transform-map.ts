import type { TransformMap, TransformSpawn } from "@/types/map-transform";
import { MapJson } from "@/lib/validator/map-schema";
import { transformWorldEntity } from "../../lib/transform-world-entity";
import { buildCollisionIndex } from "./collision/build-collision-index";
import { createSolidRegistry } from "./collision/create-collision-registries";
import { TILE, TILE_SIZE } from "@/constants/map";

export function transformMap(src: MapJson): TransformMap {
  const { meta, grid, spawn } = src;
  const tileSize = TILE_SIZE.RENDER;

  const transformSpawn: TransformSpawn = transformWorldEntity(spawn, tileSize);

  const solids = createSolidRegistry();
  buildCollisionIndex(grid, solids, TILE.WALL);

  const exits: { x: number; y: number }[] = [];
  for (let tileY = 0; tileY < grid.length; tileY++) {
    for (let tileX = 0; tileX < grid[0].length; tileX++) {
      if (grid[tileY][tileX] === TILE.EXIT) {
        exits.push({
          x: tileX * tileSize + tileSize / 2,
          y: tileY * tileSize + tileSize / 2,
        });
      }
    }
  }

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
    exits,
  };
}
