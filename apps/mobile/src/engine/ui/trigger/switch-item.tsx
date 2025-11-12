import { useEffect, useRef } from "react";
import { tileCenterToWorld, worldToScreen } from "@/utils/coordinate";
import TriggerSprite from "@/engine/ui/sprite/trigger-sprite";
import { TRIGGER_TEMPLATES } from "@/constants/trigger";
import type { Viewport } from "@/types/world-state";
import type { SwitchState } from "@/types/trigger";
import SwitchHoldProgress from "./switch-hold-progress";
import { TransformMap } from "@/types/map-transform";
import { clampToRatio } from "@/utils/math";
import { useAudioPlayer } from "expo-audio";
import {
  GAME_EFFECT_ASSETS,
  SWITCH_SOUND_DELAY,
} from "@/constants/assets/sound";

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

  const switchSound = useAudioPlayer(GAME_EFFECT_ASSETS.SWITCH);
  const lastPlayAtRef = useRef(0);

  useEffect(() => {
    switchSound.loop = false;
  }, [switchSound]);

  useEffect(() => {
    const holding = swt.isHolding && !swt.isCompleted;

    if (holding) {
      const now = Date.now();
      if (now - lastPlayAtRef.current >= SWITCH_SOUND_DELAY) {
        lastPlayAtRef.current = now;
        switchSound.seekTo(0);
        switchSound.play();
      }
    } else {
      lastPlayAtRef.current = 0;
      switchSound.pause();
      switchSound.seekTo(0);
    }
  }, [swt.isHolding, swt.isCompleted, swt.progressMs, switchSound]);

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
