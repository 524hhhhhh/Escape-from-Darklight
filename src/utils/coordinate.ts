import { WorldState } from "@/types/world-state";

function tileToWorld(tileX: number, tileY: number, tileSize: number) {
  return { worldX: tileX * tileSize, worldY: tileY * tileSize };
}

function worldToTile(
  worldX: number,
  worldY: number,
  tileSize: number,
  width: number,
  height: number,
) {
  return {
    tileX: Math.max(0, Math.min(width - 1, Math.floor(worldX / tileSize))),
    tileY: Math.max(0, Math.min(height - 1, Math.floor(worldY / tileSize))),
  };
}

function tileCenterToWorld(tileX: number, tileY: number, tileSize: number) {
  return {
    centerX: (tileX + 0.5) * tileSize,
    centerY: (tileY + 0.5) * tileSize,
  };
}

function worldToScreen(
  worldX: number,
  worldY: number,
  view: WorldState["view"],
  tileSize: number,
) {
  const zoom = view.zoom ?? 1;
  return {
    screenX: (worldX - view.offsetX) * zoom,
    screenY: (worldY - view.offsetY) * zoom,
    tileRenderSize: tileSize * zoom,
  };
}

export { tileToWorld, worldToTile, tileCenterToWorld, worldToScreen };
