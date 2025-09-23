import { WorldSystem } from "@/types/world-engine";

export const WorldClampSystem: WorldSystem = (world) => {
  const { player, world: bounds } = world;
  if (!player || !bounds) {
    return world;
  }

  const playerWidth = player.size?.width ?? 0;
  const playerHeight = player.size?.height ?? 0;

  player.position.worldX = Math.max(
    0,
    Math.min(player.position.worldX, bounds.width - playerWidth),
  );
  player.position.worldY = Math.max(
    0,
    Math.min(player.position.worldY, bounds.height - playerHeight),
  );

  return world;
};
