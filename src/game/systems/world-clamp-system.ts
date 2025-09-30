import { WorldSystem } from "@/types/world-engine";

export const WorldClampSystem: WorldSystem = (world) => {
  const { entities, world: bounds } = world;
  const player = entities.player;

  if (!player || !bounds) {
    return;
  }

  const playerWidth = player.halfW * 2;
  const playerHeight = player.halfH * 2;

  player.position.worldX = Math.max(
    0,
    Math.min(player.position.worldX, bounds.width - playerWidth),
  );
  player.position.worldY = Math.max(
    0,
    Math.min(player.position.worldY, bounds.height - playerHeight),
  );
};
