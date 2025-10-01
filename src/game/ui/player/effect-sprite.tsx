import React from "react";
import { SpriteSheet } from "@/components/sprite-sheet/sprite-sheet";

type Props = {
  x: number;
  y: number;
  frame: number;
  visible: boolean;
  size: number;
  scale?: number;
  anchorY?: number;
};

export default function EffectSprite({
  x,
  y,
  frame,
  visible,
  size,
  scale = 1,
  anchorY = 0,
}: Props) {
  if (!visible) {
    return null;
  }

  const cell = size * scale;
  const cols = 4;
  const rows = 4;

  return (
    <SpriteSheet
      x={x}
      y={y}
      frame={frame}
      cols={cols}
      rows={rows}
      cell={cell}
      source={require("@assets/exit-hint-yellow.png")}
      anchorY={anchorY}
    />
  );
}
