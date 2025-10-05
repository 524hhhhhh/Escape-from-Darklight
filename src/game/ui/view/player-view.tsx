import React from "react";
import type { AnimationState, FacingDirection } from "@/types/sprite-animation";
import type { Viewport } from "@/types/world-state";
import type { WorldPosition } from "@/types/position";
import { PLAYER } from "@/constants/player";
import { HintController } from "@/game/systems/hint-system";
import PlayerSprite from "@/game/ui/sprite/player-sprite";
import HintSprite from "@/game/ui/sprite/hint-sprite";

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

  const hintFrame = HintController.getFrame();

  return (
    <>
      <PlayerSprite
        x={screenX}
        y={screenY}
        direction={facing}
        state={state}
        frame={frame}
        scale={zoom * PLAYER.RENDER_SCALE}
      />

      {hintFrame !== null && (
        <HintSprite
          x={screenX}
          y={screenY}
          frame={hintFrame}
          visible={true}
          size={64}
          anchorY={1.2}
        />
      )}
    </>
  );
}
