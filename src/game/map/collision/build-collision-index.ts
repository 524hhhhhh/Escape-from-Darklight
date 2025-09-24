import type { SolidRegistry } from "@/types/registry";

export function buildCollisionIndex(
  grid: number[][],
  index: SolidRegistry,
  targetTile: number,
): void {
  for (let tileY = 0; tileY < grid.length; tileY++) {
    const row = grid[tileY];

    for (let tileX = 0; tileX < row.length; tileX++) {
      if (row[tileX] === targetTile) {
        index.add(tileX, tileY);
      }
    }
  }
}
