import { selectWallPieces } from "@/engine/map/rendering/wall-pieces-rules";
import { getWallNeighbors } from "@/engine/map/rendering/wall-neighbors";
import type { TransformMap } from "@/types/map-transform";
import type { Viewport } from "@/types/world-state";
import type { TileRenderable } from "@/types/tile-render";
import { TILE } from "@/constants/map";
import { TILE_ASSETS, WALL_ASSETS } from "@/constants/assets/map";

export function createTileRenderables(
  map: TransformMap,
  view: Viewport,
): TileRenderable[] {
  const { grid, tileSize } = map;

  const zoom = view.zoom ?? 1;
  const offX = view.offsetX ?? 0;
  const offY = view.offsetY ?? 0;
  const vw = view.width ?? 0;
  const vh = view.height ?? 0;

  const left = Math.max(0, Math.floor(offX / tileSize));
  const top = Math.max(0, Math.floor(offY / tileSize));
  const right = Math.min(
    grid[0].length - 1,
    Math.ceil((offX + vw / zoom) / tileSize),
  );
  const bottom = Math.min(
    grid.length - 1,
    Math.ceil((offY + vh / zoom) / tileSize),
  );

  const isWall = (x: number, y: number) => {
    if (y < 0 || y >= grid.length) {
      return false;
    }

    if (x < 0 || x >= grid[0].length) {
      return false;
    }

    return grid[y][x] === TILE.WALL;
  };

  const groundItems: TileRenderable[] = [];
  const wallItems: TileRenderable[] = [];

  for (let tileY = top; tileY <= bottom; tileY++) {
    const row = grid[tileY];
    for (let tileX = left; tileX <= right; tileX++) {
      const value = row[tileX];

      const screenX = (tileX * tileSize - offX) * zoom;
      const screenY = (tileY * tileSize - offY) * zoom;
      const screenSize = tileSize * zoom;

      if (value !== TILE.WALL) {
        const groundSource = TILE_ASSETS[value];
        if (groundSource) {
          groundItems.push({
            key: `ground-${tileX}-${tileY}`,
            screenX,
            screenY,
            screenW: screenSize,
            screenH: screenSize,
            source: groundSource,
          });
        }
      } else {
        const neighbors = getWallNeighbors(isWall, tileX, tileY);
        const pieces = selectWallPieces(neighbors);

        for (let i = 0; i < pieces.length; i++) {
          const piece = pieces[i];
          const src =
            piece.kind === "cross"
              ? WALL_ASSETS.cross
              : piece.kind === "edge"
                ? WALL_ASSETS.edge[piece.direction]
                : WALL_ASSETS.corner[piece.direction];

          wallItems.push({
            key: `wall-${tileX}-${tileY}-${piece.kind}-${piece.kind === "cross" ? "cross" : piece.direction}-${i}`,
            screenX,
            screenY,
            screenW: screenSize,
            screenH: screenSize,
            source: src,
          });
        }
      }
    }
  }

  const renderables = [...groundItems, ...wallItems];

  return renderables;
}
