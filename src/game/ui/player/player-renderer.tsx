import React from "react";
import type { AnimationState, FacingDirection } from "@/types/sprite-animation";
import PlayerSprite from "./player-sprite";
import type { Viewport } from "@/types/world-state";
import type { WorldPosition } from "@/types/position";
import { PLAYER } from "@/constants/player";

type PlayerRenderProps = {
  position: WorldPosition;
  facing: FacingDirection;
  view: Viewport;
  state: AnimationState;
  frame: number;
};

export default function PlayerRenderer({
  position,
  facing,
  view,
  state,
  frame,
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
      state={state}
      frame={frame}
      scale={zoom * PLAYER.RENDER_SCALE}
    />
  );
}
