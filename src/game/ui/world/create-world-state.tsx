import React from "react";
import { createPlayer } from "@/game/entities/player";
import PlayerRenderer from "@/game/ui/player/player-renderer";
import type { Player, Viewport, World, WorldState } from "@/types/world-state";
import { FacingDirection } from "@/types/sprite";

type CreateOptions = {
  world?: World;
  zoom?: number;
  playerStart?: { x: number; y: number; facing: FacingDirection };
};

type PlayerSpriteProps = { playerRef: Player; view: Viewport };

export function createWorldState({
  world = { width: 2000, height: 1200 },
  zoom = 2,
  playerStart = { x: 240, y: 160, facing: "N" },
}: CreateOptions = {}): WorldState {
  const view: Viewport = { offsetX: 0, offsetY: 0, zoom, width: 0, height: 0 };
  const player = createPlayer(playerStart);

  return {
    view,
    world,
    input: { x: 0, y: 0, power: 0 },
    player,
    entities: {
      playerSprite: {
        playerRef: player,
        view,
        renderer: ({ playerRef, view: viewport }: PlayerSpriteProps) => (
          <PlayerRenderer
            position={playerRef.position}
            facing={playerRef.facing}
            view={viewport}
          />
        ),
      },
    },
  };
}
