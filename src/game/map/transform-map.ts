import type { TransformMap, TransformSpawn } from "@/types/map-transform";
import { MapJson } from "@/lib/validator/map-schema";
import { transformWorldEntity } from "@/lib/transform-world-entity";
import {
  buildCollisionIndex,
  buildHazardIndex,
} from "@/game/map/collision/build-tile-index";
import {
  createHazardRegistry,
  createSolidRegistry,
} from "@/game/map/collision/create-collision-registries";
import { HAZARDS_TEMPLATES, TILE, TILE_SIZE } from "@/constants/map";

export function transformMap(src: MapJson): TransformMap {
  const { meta, grid, spawn } = src;
  const tileSize = TILE_SIZE.RENDER;

  const transformSpawn: TransformSpawn = transformWorldEntity(spawn, tileSize);

  const solids = createSolidRegistry();
  buildCollisionIndex(grid, solids, TILE.WALL);

  const hazards = createHazardRegistry();
  buildHazardIndex(grid, hazards, HAZARDS_TEMPLATES);

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
    hazards,
    spawn: transformSpawn,
    exits,
  };
}
