import React from "react";
import { createPlayer } from "@/game/entities/player";
import PlayerRenderer from "@/game/ui/player/player-renderer";
import type {
  PlayerSpriteProps,
  Viewport,
  World,
  WorldState,
} from "@/types/world-state";
import type { FacingDirection } from "@/types/sprite";
import { loadMap } from "@/game/map/load-map";
import { WorldPosition } from "@/types/position";

type CreateOptions = {
  mapJson?: unknown;
  world?: World;
  zoom?: number;
  playerStart?: WorldPosition & { facing: FacingDirection };
};

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

export function createWorldState({
  mapJson,
  world = { width: 2000, height: 1200 },
  zoom = 2,
  playerStart = { worldX: 240, worldY: 160, facing: "N" as FacingDirection },
}: CreateOptions = {}): WorldState & { version: number } {
  const loadedMap = mapJson ? loadMap(mapJson) : undefined;

  const worldSizePx: World = determineWorldSize(loadedMap, world);
  const start = determinePlayerStart(loadedMap, playerStart);

  const view: Viewport = { offsetX: 0, offsetY: 0, zoom, width: 0, height: 0 };
  const player = createPlayer(start);

  const state: WorldState & { version: number } = {
    view,
    world: worldSizePx,
    input: { x: 0, y: 0, power: 0 },
    player,
    entities: {
      playerSprite: {
        renderer: ({ playerRef, view: viewport }: PlayerSpriteProps) => (
          <PlayerRenderer
            position={playerRef.position}
            facing={playerRef.facing}
            view={viewport}
          />
        ),
        props: { playerRef: player, view },
      },
    },
    version: 0,
  };

  if (loadedMap) {
    state.map = {
      grid: loadedMap.grid,
      tileSize: loadedMap.tileSize,
      meta: loadedMap.meta,
    };
  }

  return state;
}
