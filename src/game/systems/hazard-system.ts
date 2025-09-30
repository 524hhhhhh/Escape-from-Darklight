import * as Haptics from "expo-haptics";
import { WorldSystem } from "@/types/world-engine";
import { findHazardOnAABB } from "@/lib/hazard-collision";

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

  const lastHitAt = player.hazardCooldowns.get(hazard.kind) ?? 0;
  if (now - lastHitAt < hazard.cooldownMs / 1000) {
    return;
  }

  player.hp = Math.max(0, player.hp - hazard.damage);

  player.hazardCooldowns.set(hazard.kind, now);

  if (hazard.haptics === "Light") {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } else if (hazard.haptics === "Medium") {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  } else if (hazard.haptics === "Heavy") {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }
};
