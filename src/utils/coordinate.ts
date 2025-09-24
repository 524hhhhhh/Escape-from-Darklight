function tileToWorld(tileX: number, tileY: number, tileSize: number) {
  return { x: tileX * tileSize, y: tileY * tileSize };
}

function worldToTile(
  x: number,
  y: number,
  tileSize: number,
  width: number,
  height: number,
) {
  return {
    tileX: Math.max(0, Math.min(width - 1, Math.floor(x / tileSize))),
    tileY: Math.max(0, Math.min(height - 1, Math.floor(y / tileSize))),
  };
}

function tileCenterToWorld(tileX: number, tileY: number, tileSize: number) {
  return {
    centerX: (tileX + 0.5) * tileSize,
    centerY: (tileY + 0.5) * tileSize,
  };
}

export { tileToWorld, worldToTile, tileCenterToWorld };
