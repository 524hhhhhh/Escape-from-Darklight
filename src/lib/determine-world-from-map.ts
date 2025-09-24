import { World } from "@/types/world-state";
import { loadMap } from "../game/map/load-map";
import { FacingDirection } from "@/types/sprite";
import { WorldPosition } from "@/types/position";

function determineWorldSize(
  loadedMap: ReturnType<typeof loadMap> | undefined,
  fallback: World,
): World {
  if (!loadedMap) {
    return fallback;
  }

  const { meta, tileSize } = loadedMap;

  return { width: meta.width * tileSize, height: meta.height * tileSize };
}

function determinePlayerStart(
  loadedMap: ReturnType<typeof loadMap> | undefined,
  fallback: WorldPosition & { facing: FacingDirection },
): WorldPosition & { facing: FacingDirection } {
  if (!loadedMap) {
    return fallback;
  }

  return {
    worldX: loadedMap.spawn.centerX,
    worldY: loadedMap.spawn.centerY,
    facing: fallback.facing,
  };
}

export { determineWorldSize, determinePlayerStart };
