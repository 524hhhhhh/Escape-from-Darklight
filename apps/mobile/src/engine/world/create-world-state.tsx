import { createPlayer } from "@/engine/entities/create-player";
import type { Viewport, WorldSize } from "@/types/world-state";
import type { FacingDirection, PlayerSprite } from "@/types/sprite-animation";
import { loadMap } from "@/engine/map/load-map";
import { HintController } from "@/engine/systems/hint-system";
import type { LightingWorldState } from "@/types/light";
import { createTriggerRegistry } from "@/engine/map/collision/create-registries";
import { buildTriggerIndex } from "@/engine/map/collision/build-tile-index";

type CreateOptions = {
  mapJson: unknown;
  zoom?: number;
};

export function createWorldState({
  mapJson,
  zoom = 2,
}: CreateOptions): LightingWorldState & { version: number } {
  const loadedMap = loadMap(mapJson);

  const triggers = createTriggerRegistry();
  if (loadedMap.triggers.length) {
    buildTriggerIndex(loadedMap.triggers, triggers);
  }

  const worldSizePx: WorldSize = {
    width: loadedMap.grid[0].length * loadedMap.tileSize,
    height: loadedMap.grid.length * loadedMap.tileSize,
  };

  const start = {
    worldX: loadedMap.spawn.centerX,
    worldY: loadedMap.spawn.centerY,
    facing: "N" as FacingDirection,
  };

  const view: Viewport = { offsetX: 0, offsetY: 0, zoom, width: 0, height: 0 };
  const player = createPlayer(start);
  const playerSprite: PlayerSprite = {
    state: "IDLE",
    frameIndex: 0,
    frameTimer: 0,
  };

  const state: LightingWorldState & { version: number } = {
    view,
    world: worldSizePx,
    input: { x: 0, y: 0, power: 0 },
    entities: { player, playerSprite },
    light: { lightLife: 1 },
    lightFrame: {
      worldCenterX: start.worldX,
      worldCenterY: start.worldY,
      currentRadius: 0,
    },
    map: loadedMap,
    triggers,
    dt: 0,
    version: 0,
  };

  HintController.reset("LOW");
  return state;
}
