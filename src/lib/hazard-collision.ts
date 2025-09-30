import { Hazard } from "@/types/hazard";
import { TransformMap } from "@/types/map-transform";
import { worldToTile } from "@/utils/coordinate";

function getHazardAtWorld(
  map: TransformMap,
  worldX: number,
  worldY: number,
): Hazard | undefined {
  const { tileX, tileY } = worldToTile(
    worldX,
    worldY,
    map.tileSize,
    map.meta.width,
    map.meta.height,
  );

  return map.hazards.get(tileX, tileY);
}

function findHazardOnAABB(
  map: TransformMap,
  centerX: number,
  centerY: number,
  halfW: number,
  halfH: number,
): Hazard | undefined {
  const points = [
    { x: centerX - halfW, y: centerY - halfH },
    { x: centerX + halfW, y: centerY - halfH },
    { x: centerX - halfW, y: centerY + halfH },
    { x: centerX + halfW, y: centerY + halfH },
  ];

  const hits: Hazard[] = [];
  for (const point of points) {
    const hazard = getHazardAtWorld(map, point.x, point.y);

    if (hazard) {
      hits.push(hazard);
    }
  }

  if (hits.length === 0) {
    return;
  }
  const hazardRank = (kind: Hazard["kind"]) => (kind === "spike" ? 1 : 0);

  hits.sort((hazardA, hazardB) => {
    return hazardRank(hazardB.kind) - hazardRank(hazardA.kind);
  });
  return hits[0];
}

export { findHazardOnAABB };
