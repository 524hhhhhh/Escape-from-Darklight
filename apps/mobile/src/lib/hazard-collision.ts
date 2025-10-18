import { HazardTile } from "@/types/hazard";
import { TransformMap } from "@/types/map-transform";
import { worldToTile } from "../utils/coordinate";

function getHazardAtWorld(
  map: TransformMap,
  worldX: number,
  worldY: number,
): HazardTile | undefined {
  const { tileX, tileY } = worldToTile(
    worldX,
    worldY,
    map.tileSize,
    map.meta.width,
    map.meta.height,
  );

  const hazardInfo = map.hazards.get(tileX, tileY);
  if (!hazardInfo) {
    return;
  }

  return { ...hazardInfo, tileX, tileY };
}

function findHazardOnAABB(
  map: TransformMap,
  centerX: number,
  centerY: number,
  halfW: number,
  halfH: number,
): HazardTile | undefined {
  const points = [
    { x: centerX - halfW, y: centerY - halfH },
    { x: centerX + halfW, y: centerY - halfH },
    { x: centerX - halfW, y: centerY + halfH },
    { x: centerX + halfW, y: centerY + halfH },
  ];

  const hits: HazardTile[] = [];
  for (const point of points) {
    const hazard = getHazardAtWorld(map, point.x, point.y);

    if (hazard) {
      hits.push(hazard);
    }
  }

  if (hits.length === 0) {
    return;
  }

  const hazardRank = (kind: HazardTile["kind"]) => (kind === "spike" ? 1 : 0);

  hits.sort(
    (hazardA, hazardB) => hazardRank(hazardB.kind) - hazardRank(hazardA.kind),
  );
  return hits[0];
}

export { findHazardOnAABB };
