import { createPlayer } from "@/game/entities/player";
import type { Viewport, World } from "@/types/world-state";
import type { FacingDirection } from "@/types/sprite-animation";
import { loadMap } from "@/game/map/load-map";
import type { WorldPosition } from "@/types/position";
import {
  determinePlayerStart,
  determineWorldSize,
} from "@/lib/determine-world-from-map";
import { HintController } from "@/game/systems/hint-system";
import type { LightingWorldState } from "@/types/light";

type CreateOptions = {
  mapJson?: unknown;
  world?: World;
  zoom?: number;
  playerStart?: WorldPosition & { facing: FacingDirection };
};

export function createWorldState({
  mapJson,
  world = { width: 2000, height: 1200 },
  zoom = 2,
  playerStart = { worldX: 240, worldY: 160, facing: "N" as FacingDirection },
}: CreateOptions = {}): LightingWorldState & { version: number } {
  const loadedMap = mapJson ? loadMap(mapJson) : undefined;

  const worldSizePx: World = determineWorldSize(loadedMap, world);
  const start = determinePlayerStart(loadedMap, playerStart);

  const view: Viewport = { offsetX: 0, offsetY: 0, zoom, width: 0, height: 0 };
  const player = createPlayer(start);

  const state: LightingWorldState & { version: number } = {
    view,
    world: worldSizePx,
    input: { x: 0, y: 0, power: 0 },
    player,
    entities: {
      player,
    },
    light: {
      lightLife: 1,
    },
    lightFrame: {
      worldCenterX: start.worldX,
      worldCenterY: start.worldY,
      currentRadius: 0,
    },
    map: loadedMap,
    version: 0,
  };

  HintController.reset("LOW");
  return state;
}
