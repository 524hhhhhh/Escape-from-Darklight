import React from "react";
import { TILE } from "@/constants/map";
import type { Viewport } from "@/types/world-state";
import { TileCode } from "@/lib/validator/map-schema";
import { COLORS } from "@/constants/theme";
import { renderCellBox } from "./render-cell-box";
import { TransformMap } from "@/types/map-transform";

type Props = {
  map: TransformMap;
  view: Viewport;
};

export default function TileLayer({ map, view }: Props) {
  const { grid, tileSize } = map;
  const TILE_COLORS: Record<TileCode, string> = {
    [TILE.ROAD]: COLORS.MAP.ROAD,
    [TILE.WALL]: COLORS.MAP.WALL,
    [TILE.EXIT]: COLORS.MAP.EXIT,
  };

  const zoom = view.zoom ?? 1;
  const left = Math.max(0, Math.floor(view.offsetX / tileSize));
  const top = Math.max(0, Math.floor(view.offsetY / tileSize));
  const right = Math.min(
    grid[0].length - 1,
    Math.ceil((view.offsetX + (view.width ?? 0) / zoom) / tileSize),
  );
  const bottom = Math.min(
    grid.length - 1,
    Math.ceil((view.offsetY + (view.height ?? 0) / zoom) / tileSize),
  );

  const cells: React.ReactNode[] = [];
  for (let ty = top; ty <= bottom; ty++) {
    const row = grid[ty];
    for (let tx = left; tx <= right; tx++) {
      const value = row[tx];
      if (value === TILE.ROAD) continue;

      const screenX = tx * tileSize - view.offsetX;
      const screenY = ty * tileSize - view.offsetY;

      const color = TILE_COLORS[value] ?? COLORS.MAP.ROAD;

      cells.push(
        renderCellBox(
          `${tx}-${ty}`,
          {
            left: screenX * zoom,
            top: screenY * zoom,
            width: tileSize * zoom,
            height: tileSize * zoom,
          },
          color,
        ),
      );
    }
  }

  return <>{cells}</>;
}
