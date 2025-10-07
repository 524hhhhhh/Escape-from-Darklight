import React from "react";
import { tileCenterToWorld, worldToScreen } from "@/utils/coordinate";
import TriggerSprite from "@/game/ui/sprite/trigger-sprite";
import type { Viewport } from "@/types/world-state";
import type { DoorState } from "@/types/trigger";
import { TransformMap } from "@/types/map-transform";

type Props = {
  door: DoorState;
  map: TransformMap;
  view: Viewport;
};

export function DoorItem({ door, map, view }: Props) {
  const { centerX, centerY } = tileCenterToWorld(
    door.tileX,
    door.tileY,
    map.tileSize,
  );
  const { screenX, screenY, tileRenderSize } = worldToScreen(
    centerX,
    centerY,
    view,
    map.tileSize,
  );

  return (
    <TriggerSprite
      type="door"
      x={Math.round(screenX)}
      y={Math.round(screenY)}
      tileSize={tileRenderSize}
      frame={door.sprite.frameIndex}
    />
  );
}
