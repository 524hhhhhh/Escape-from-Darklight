import * as Haptics from "expo-haptics";
import type { WorldSystem } from "@/types/world-engine";
import { DOOR_FRAME_DELAY, TRIGGER_TEMPLATES } from "@/constants/trigger";
import { deltaSeconds } from "@/utils/time";
import { worldToTile } from "@/utils/coordinate";
import { progressMsToFrame, tickSpriteFrame } from "@/lib/sprite";

export const TriggerSystem: WorldSystem = (world, frameInfo) => {
  const { map, entities, triggers } = world;
  const player = entities.player;

  if (!map || !player || !triggers) {
    return;
  }

  const dt = deltaSeconds(frameInfo);

  const playerCenterX = player.position.worldX + player.halfW;
  const playerCenterY = player.position.worldY + player.halfH;

  const { tileX, tileY } = worldToTile(
    playerCenterX,
    playerCenterY,
    map.tileSize,
    map.grid[0].length,
    map.grid.length,
  );

  triggers.switches.forEach((swt) => {
    const isOnSwitchTile = swt.tileX === tileX && swt.tileY === tileY;
    const holdMs = TRIGGER_TEMPLATES.switch.HOLD_MS;

    swt.isHolding = isOnSwitchTile && !swt.isCompleted;

    if (swt.isHolding) {
      swt.progressMs += dt * 1000;

      if (swt.progressMs >= holdMs) {
        swt.progressMs = holdMs;
        swt.isCompleted = true;
        swt.isHolding = false;

        swt.linkedDoors.forEach((doorId) => {
          const door = triggers.doors.get(doorId);
          if (!door) {
            return;
          }

          if (door.openState === "closed") {
            door.openState = "opening";
          }
        });
      }
    } else if (!swt.isCompleted && swt.progressMs !== 0) {
      swt.progressMs = 0;
    }

    const prev = swt.sprite.frameIndex ?? 0;
    const next = progressMsToFrame(
      swt.progressMs,
      holdMs,
      TRIGGER_TEMPLATES.switch.FRAMES,
      swt.isCompleted,
    );

    if (next > prev) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    swt.sprite.frameIndex = next;
  });

  triggers.doors.forEach((door) => {
    if (door.openState !== "opening") {
      return;
    }

    tickSpriteFrame(
      door.sprite,
      TRIGGER_TEMPLATES.door.FRAMES,
      DOOR_FRAME_DELAY,
      dt,
      false,
    );

    if (door.sprite.frameIndex >= TRIGGER_TEMPLATES.door.FRAMES - 1) {
      door.openState = "opened";
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

      map.solids.remove(door.tileX, door.tileY);
    }
  });
};
