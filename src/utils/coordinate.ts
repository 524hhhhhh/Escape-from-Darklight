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

export { tileToWorld, worldToTile, tileCenterToWorld };
