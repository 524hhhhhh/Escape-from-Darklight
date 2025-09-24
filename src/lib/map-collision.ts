import type { TransformMap } from "@/types/map-transform";
import { worldToTile } from "@/utils/coordinate";

function isSolidAtWorld(map: TransformMap, x: number, y: number): boolean {
  const { tileSize } = map;
  const { width, height } = map.meta;
  const { tileX, tileY } = worldToTile(x, y, tileSize, width, height);

  return map.solids?.has(tileX, tileY) ?? false;
}

function checkAABBCollision(
  map: TransformMap,
  centerX: number,
  centerY: number,
  halfW: number,
  halfH: number,
): boolean {
  return (
    isSolidAtWorld(map, centerX - halfW, centerY - halfH) ||
    isSolidAtWorld(map, centerX + halfW, centerY - halfH) ||
    isSolidAtWorld(map, centerX - halfW, centerY + halfH) ||
    isSolidAtWorld(map, centerX + halfW, centerY + halfH)
  );
}

export { isSolidAtWorld, checkAABBCollision };
