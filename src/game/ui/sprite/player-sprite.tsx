import { SPRITE, isRightFacing, PLAYER } from "@/constants/player";
import type { AnimationState, FacingDirection } from "@/types/sprite-animation";
import React from "react";
import { SpriteSheet } from "@/components/sprite-sheet/sprite-sheet";

type Props = {
  x: number;
  y: number;
  direction: FacingDirection;
  state: AnimationState;
  frame: number;
  scale?: number;
};

export default function PlayerSprite({
  x,
  y,
  direction,
  state,
  frame,
  scale = 1,
}: Props) {
  const cell = SPRITE.FRAME_SIZE * scale;
  const cols = SPRITE.CLIPS[state].FRAMES;
  const flipX = isRightFacing(direction);
  const anchorY = PLAYER.ANCHOR_Y ?? 0;

  return (
    <SpriteSheet
      x={x}
      y={y}
      frame={frame}
      cols={cols}
      rows={1}
      cell={cell}
      source={SPRITE.CLIPS[state].SOURCE}
      anchorY={anchorY}
      flipX={flipX}
    />
  );
}
