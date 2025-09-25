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
import type { WorldPosition } from "@/types/position";
import {
  determinePlayerStart,
  determineWorldSize,
} from "@/lib/determine-world-from-map";

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
    state.map = loadedMap;
  }

  return state;
}
