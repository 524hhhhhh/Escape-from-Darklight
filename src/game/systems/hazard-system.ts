import * as Haptics from "expo-haptics";
import { WorldSystem } from "@/types/world-engine";
import { findHazardOnAABB } from "@/lib/hazard-collision";
import { useGameStore } from "@/store/use-game-store";

export const HazardSystem: WorldSystem = (world, frameInfo) => {
  const { entities, map } = world;
  const player = entities.player;
  if (!map || !player) {
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

  const now = (frameInfo.time.now ?? 0) / 1000;

  const hazardKey = `${hazard.kind}:${hazard.tileX},${hazard.tileY}`;

  const lastHitAt = player.hazardCooldowns.get(hazardKey) ?? 0;
  if (now - lastHitAt < hazard.cooldown / 1000) {
    return;
  }

  useGameStore.getState().applyDamage(hazard.damage);
  player.hazardCooldowns.set(hazardKey, now);

  const sprite = world.entities.playerSprite;

  if (sprite) {
    const frames = 4;
    sprite.state = "HIT";
    sprite.frameIndex = 0;
    sprite.frameTimer = 0;
    sprite.hitFrameRate = frames / (hazard.cooldown / 1000);
    sprite.hitEndAt = now + hazard.cooldown / 1000;
  }

  if (hazard.haptics === "Light") {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } else if (hazard.haptics === "Medium") {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  } else if (hazard.haptics === "Heavy") {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }
};
