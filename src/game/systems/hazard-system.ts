import * as Haptics from "expo-haptics";
import { WorldSystem } from "@/types/world-engine";
import { findHazardOnAABB } from "@/lib/hazard-collision";
import { useGameStore } from "@/store/use-game-store";
import { SPRITE } from "@/constants/player";
import { nowSeconds, toSeconds } from "@/utils/time";

export const HazardSystem: WorldSystem = (world, frameInfo) => {
  const { entities, map } = world;
  const player = entities.player;
  if (!map || !player) {
    return;
  }
  const status = useGameStore.getState().status;

  if (status.type !== "playing") {
    return;
  }

  if (entities.playerSprite.state === "DEATH") {
    return;
  }

  const hazard = findHazardOnAABB(
    map,
    player.position.worldX,
    player.position.worldY,
    player.halfW,
    player.halfH,
  );
  if (!hazard) {
    return;
  }

  const nowSec = nowSeconds(frameInfo);
  const cooldownSec = toSeconds(hazard.cooldown);

  const hazardKey = `${hazard.kind}:${hazard.tileX},${hazard.tileY}`;
  const lastHitAtSec = player.hazardCooldowns.get(hazardKey) ?? 0;

  if (nowSec - lastHitAtSec < cooldownSec) {
    return;
  }

  useGameStore.getState().applyDamage(hazard.damage);
  player.hazardCooldowns.set(hazardKey, nowSec);

  const sprite = world.entities.playerSprite;

  if (sprite) {
    const hitFrames = SPRITE.CLIPS.HIT.FRAMES;
    sprite.state = "HIT";
    sprite.frameIndex = 0;
    sprite.frameTimer = 0;

    sprite.hitFrameRate = hitFrames / cooldownSec;
    sprite.hitEndAt = nowSec + cooldownSec;
  }

  const hapticStyle = hazard.haptics;
  if (hapticStyle === "Light") {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } else if (hapticStyle === "Medium") {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  } else if (hapticStyle === "Heavy") {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }
};
