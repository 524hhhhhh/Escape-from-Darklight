import type { TransformMap, TransformSpawn } from "@/types/map-transform";
import { MapJson } from "@/lib/validator/map-schema";
import { transformWorldEntity } from "@/lib/transform-world-entity";
import {
  buildSolidIndex,
  buildHazardIndex,
} from "@/engine/map/collision/build-tile-index";
import {
  createHazardRegistry,
  createSolidRegistry,
} from "@/engine/map/collision/create-registries";
import { HAZARDS_TEMPLATES, TILE, TILE_SIZE } from "@/constants/map";

export function transformMap(src: MapJson): TransformMap {
  const { meta, grid, spawn, triggers } = src;
  const tileSize = TILE_SIZE.RENDER;

  const height = grid.length;
  const width = grid[0]?.length ?? 0;

  const transformSpawn: TransformSpawn = transformWorldEntity(spawn, tileSize);

  const solids = createSolidRegistry();
  buildSolidIndex(grid, solids, TILE.WALL);

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

  for (const trigger of triggers) {
    if (trigger.type === "door") {
      solids.add(trigger.tileX, trigger.tileY);
    }
  }

  return {
    grid,
    tileSize,
    meta: {
      width,
      height,
      tileRenderSize: TILE_SIZE.RENDER,
      tileCollisionSize: TILE_SIZE.COLLISION,
      version: meta.version,
    },
    solids,
    hazards,
    triggers,

    spawn: transformSpawn,
    exits,
  };
}
