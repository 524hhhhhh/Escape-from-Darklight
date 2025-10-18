import React from "react";
import { tileCenterToWorld, worldToScreen } from "@/utils/coordinate";
import TriggerSprite from "@/engine/ui/sprite/trigger-sprite";
import { TRIGGER_TEMPLATES } from "@/constants/trigger";
import type { Viewport } from "@/types/world-state";
import type { SwitchState } from "@/types/trigger";
import SwitchHoldProgress from "./switch-hold-progress";
import { TransformMap } from "@/types/map-transform";
import { clampToRatio } from "@/utils/math";

type Props = {
  swt: SwitchState;
  map: TransformMap;
  view: Viewport;
};

export function SwitchItem({ swt, map, view }: Props) {
  const { centerX, centerY } = tileCenterToWorld(
    swt.tileX,
    swt.tileY,
    map.tileSize,
  );
  const { screenX, screenY, tileRenderSize } = worldToScreen(
    centerX,
    centerY,
    view,
    map.tileSize,
  );

  const progress = clampToRatio(
    swt.progressMs / TRIGGER_TEMPLATES.switch.HOLD_MS,
  );

  return (
    <>
      <TriggerSprite
        type="switch"
        x={Math.round(screenX)}
        y={Math.round(screenY)}
        tileSize={tileRenderSize}
        frame={swt.sprite.frameIndex}
      />

      {!swt.isCompleted && progress > 0 && (
        <SwitchHoldProgress
          x={screenX}
          y={screenY - tileRenderSize * 0.6}
          size={tileRenderSize * 0.8}
          progress={progress}
          active={swt.isCompleted}
        />
      )}
    </>
  );
}
