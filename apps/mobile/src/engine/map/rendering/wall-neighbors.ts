import type { TileIsWallFn, WallNeighbors } from "@/types/tile-render";

export function getWallNeighbors(
  isWall: TileIsWallFn,
  tileX: number,
  tileY: number,
): WallNeighbors {
  return {
    east: isWall(tileX + 1, tileY),
    west: isWall(tileX - 1, tileY),
    south: isWall(tileX, tileY + 1),
    north: isWall(tileX, tileY - 1),
    southEast: isWall(tileX + 1, tileY + 1),
    southWest: isWall(tileX - 1, tileY + 1),
    northEast: isWall(tileX + 1, tileY - 1),
    northWest: isWall(tileX - 1, tileY - 1),
  };
}
