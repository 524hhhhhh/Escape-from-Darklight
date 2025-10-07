import React from "react";
import { SpriteSheet } from "@/components/sprite-sheet/sprite-sheet";
import { TRIGGER_ASSETS, TRIGGER_TEMPLATES } from "@/constants/trigger";

type TriggerType = keyof typeof TRIGGER_TEMPLATES;

type Props = {
  type: TriggerType;
  x: number;
  y: number;
  tileSize: number;
  frame: number;
};

export default function TriggerSprite({ type, x, y, tileSize, frame }: Props) {
  const frames = TRIGGER_TEMPLATES[type].FRAMES;
  const source = TRIGGER_ASSETS[type];

  return (
    <SpriteSheet
      x={Math.round(x)}
      y={Math.round(y)}
      cols={frames}
      rows={1}
      frame={frame}
      cell={Math.round(tileSize)}
      source={source}
    />
  );
}
