import type {
  TransformExit,
  TransformMap,
  TransformSpawn,
} from "@/types/map-transform";
import { MapJson } from "@/lib/validator/map-schema";
import { transformWorldEntity } from "./shared/transform-world-entity";

export function transformMap(src: MapJson): TransformMap {
  const { meta, grid, spawn, exits } = src;
  const tile = meta.tileSizeRender;

  const transformExits: TransformExit[] = (exits ?? []).map((exit) =>
    transformWorldEntity(exit, tile),
  );

  const transformSpawn: TransformSpawn = transformWorldEntity(spawn, tile);

  return {
    grid,
    tileSize: tile,
    meta: {
      width: meta.width,
      height: meta.height,
      tileSizeRender: meta.tileSizeRender,
      version: meta.version,
    },
    solids: [],
    triggers: transformExits,
    hazards: [],
    spawn: transformSpawn,
    exits: transformExits,
  };
}
