import React from "react";
import TileLayer from "@/game/ui/overlay/tile-layer";
import LightOverlay from "@/game/ui/overlay/light-overlay";
import type { LightingWorldState } from "@/types/light";
import PlayerRenderer from "@/game/ui/player/player-renderer";

type Props = { world: LightingWorldState };

export function WorldRenderLayer({ world }: Props) {
  const { lightFrame, view, map } = world;

  const viewW = view.width ?? 0;
  const viewH = view.height ?? 0;
  if (!viewW || !viewH) {
    return map ? <TileLayer map={map} view={view} /> : null;
  }

  if (!lightFrame) {
    return map ? <TileLayer map={map} view={view} /> : null;
  }

  const zoom = view.zoom ?? 1;
  const offX = view.offsetX ?? 0;
  const offY = view.offsetY ?? 0;

  const screenX = lightFrame ? (lightFrame.worldCenterX - offX) * zoom : 0;
  const screenY = lightFrame ? (lightFrame.worldCenterY - offY) * zoom : 0;
  const screenRadius = lightFrame ? lightFrame.currentRadius * zoom : 0;

  return (
    <>
      {map && <TileLayer map={map} view={view} />}
      {screenRadius > 0 && (
        <LightOverlay
          width={viewW}
          height={viewH}
          screenCenterX={screenX}
          screenCenterY={screenY}
          screenRadius={screenRadius}
          zIndex={2}
        />
      )}

      <PlayerRenderer
        position={world.entities.player.position}
        facing={world.entities.player.facing}
        view={world.view}
        state={world.entities.playerSprite.state}
        frame={world.entities.playerSprite.frameIndex}
      />
    </>
  );
}
