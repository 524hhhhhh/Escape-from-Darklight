import { useEffect, useState } from "react";
import { tileCenterToWorld, worldToScreen } from "@/utils/coordinate";
import TriggerSprite from "@/engine/ui/sprite/trigger-sprite";
import type { Viewport } from "@/types/world-state";
import type { DoorState } from "@/types/trigger";
import { TransformMap } from "@/types/map-transform";
import { useAudioPlayer } from "expo-audio";
import { GAME_EFFECT_ASSETS } from "@/constants/assets/sound";

type Props = {
  door: DoorState;
  map: TransformMap;
  view: Viewport;
};

export function DoorItem({ door, map, view }: Props) {
  const [hasPlayedDoorSound, setHasPlayedDoorSound] = useState(false);

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
  const doorSound = useAudioPlayer(GAME_EFFECT_ASSETS.DOOR);

  useEffect(() => {
    doorSound.loop = false;
  }, [doorSound]);

  useEffect(() => {
    if (door.openState === "opening" && !hasPlayedDoorSound) {
      doorSound.seekTo(0);
      doorSound.play();
      setHasPlayedDoorSound(true);
    } else if (door.openState !== "opening" && hasPlayedDoorSound) {
      setHasPlayedDoorSound(false);
    }
  }, [door.openState, hasPlayedDoorSound, doorSound]);

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
