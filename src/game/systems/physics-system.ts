import { PLAYER } from "@/constants/player";
import { WorldSystem } from "@/types/world-engine";
import { vectorToDirection } from "@/utils/direction";
import { deltaSeconds } from "@/utils/math";

export const PhysicsSystem: WorldSystem = (world, frameInfo) => {
  const dt = deltaSeconds(frameInfo);
  const { input, player } = world;

  if ((input.power ?? 0) <= 0) {
    return world;
  }

  const vx = input.x * PLAYER.MOVE_SPEED * input.power;
  const vy = input.y * PLAYER.MOVE_SPEED * input.power;

  player.position.worldX += vx * dt;
  player.position.worldY += vy * dt;

  const speed = Math.hypot(vx, vy);
  if (speed > PLAYER.MOVE_SPEED * PLAYER.MIN_FACING_SPEED) {
    player.facing = vectorToDirection(vx, vy);
  }

  return world;
};
