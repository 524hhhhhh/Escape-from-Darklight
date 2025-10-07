import React from "react";
import type { LightingWorldState } from "@/types/light";
import { TileView } from "@/game/ui/view/tile-view";
import { createTileRenderables } from "@/game/map/rendering/create-tile-renderables";
import PlayerRenderer from "@/game/ui/view/player-view";
import LightView from "@/game/ui/view/light-view";
import {
  TriggerDoorView,
  TriggerGroundView,
} from "@/game/ui/view/trigger-view";

type Props = { world: LightingWorldState };

export function WorldRenderLayer({ world }: Props) {
  const { lightFrame, view, map } = world;
  const { offsetX, offsetY, width, height } = view;

  const viewW = width ?? 0;
  const viewH = height ?? 0;

  const items = map ? createTileRenderables(map, view) : [];

  if (!viewW || !viewH) {
    return <TileView items={items} />;
  }

  const zoom = view.zoom ?? 1;

  const screenX = lightFrame ? (lightFrame.worldCenterX - offsetX) * zoom : 0;
  const screenY = lightFrame ? (lightFrame.worldCenterY - offsetY) * zoom : 0;
  const screenRadius = lightFrame ? lightFrame.currentRadius * zoom : 0;

  return (
    <>
      <TileView items={items} />

      <TriggerGroundView world={world} />

      <PlayerRenderer
        position={world.entities.player.position}
        facing={world.entities.player.facing}
        view={world.view}
        state={world.entities.playerSprite.state}
        frame={world.entities.playerSprite.frameIndex}
      />

      <TriggerDoorView world={world} />

      {lightFrame && screenRadius > 0 && (
        <LightView
          width={viewW}
          height={viewH}
          screenCenterX={screenX}
          screenCenterY={screenY}
          screenRadius={screenRadius}
          zIndex={2}
        />
      )}
    </>
  );
}
