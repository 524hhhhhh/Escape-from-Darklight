import { HazardTemplateMap } from "@/types/hazard";
import type { HazardRegistry, SolidRegistry } from "@/types/registry";

function buildCollisionIndex(
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

function buildHazardIndex(
  grid: number[][],
  index: HazardRegistry,
  template: HazardTemplateMap,
): void {
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];

    for (let x = 0; x < row.length; x++) {
      const tileCode = row[x];
      const hazardTemplate = template[tileCode];

      if (hazardTemplate) {
        index.set(x, y, hazardTemplate);
      }
    }
  }
}

export { buildCollisionIndex, buildHazardIndex };
