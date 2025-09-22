import React from "react";
import type { FacingDirection } from "@/types/sprite";
import PlayerSprite from "./player-sprite";
import { ScreenPosition, WorldPosition } from "@/types/position";
import { Viewport } from "@/types/world-state";

type Props = {
  position: WorldPosition;
  facing: FacingDirection;
  view: Viewport;
};

export default function PlayerRenderer({ position, facing, view }: Props) {
  const screen: ScreenPosition = {
    x: (position.x - view.offsetX) * view.zoom,
    y: (position.y - view.offsetY) * view.zoom,
  };

  return (
    <PlayerSprite
      x={screen.x}
      y={screen.y}
      direction={facing}
      frame={0}
      scale={view.zoom}
    />
  );
}
