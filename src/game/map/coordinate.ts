import { TILE } from "@/constants/map";
import { TileCode } from "@/lib/validator/map-schema";

function tileToWorld(tileX: number, tileY: number, tileSize: number) {
  return { x: tileX * tileSize, y: tileY * tileSize };
}

function tileCenterToWorld(tileX: number, tileY: number, tileSize: number) {
  return { cx: (tileX + 0.5) * tileSize, cy: (tileY + 0.5) * tileSize };
}

function isWall(tileCode: TileCode | null) {
  return tileCode === TILE.WALL;
}

function isExit(tileCode: TileCode | null) {
  return tileCode === TILE.EXIT;
}

function isWalkable(tileCode: TileCode | null) {
  return tileCode !== TILE.WALL && tileCode !== null;
}

export { tileToWorld, tileCenterToWorld, isWall, isExit, isWalkable };
