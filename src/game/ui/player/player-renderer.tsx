import React from "react";
import type { FacingDirection } from "@/types/sprite";
import PlayerSprite from "./player-sprite";
import type { Viewport } from "@/types/world-state";
import type { WorldPosition } from "@/types/position";

type PlayerRenderProps = {
  position: WorldPosition;
  facing: FacingDirection;
  view: Viewport;
};

export default function PlayerRenderer({
  position,
  facing,
  view,
}: PlayerRenderProps) {
  const { worldX, worldY } = position;
  const { offsetX, offsetY, zoom } = view;

  const screenX = (worldX - offsetX) * zoom;
  const screenY = (worldY - offsetY) * zoom;

  return (
    <PlayerSprite
      x={screenX}
      y={screenY}
      direction={facing}
      frame={0}
      scale={zoom}
    />
  );
}
