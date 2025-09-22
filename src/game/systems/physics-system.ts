import { PLAYER } from "@/constants/player";
import type { WorldSystem } from "@/types/world-engine";
import { vectorToDirection } from "@/utils/direction";

export const PhysicsSystem: WorldSystem = (world, frameInfo) => {
  const deltaTime = (frameInfo.time.delta ?? 0) / 1000;
  const { input, player } = world;

  if ((input.power ?? 0) <= 0) {
    return world;
  }

  const vx = input.x * PLAYER.MOVE_SPEED * input.power;
  const vy = input.y * PLAYER.MOVE_SPEED * input.power;

  player.position.x += vx * deltaTime;
  player.position.y += vy * deltaTime;

  const speed = Math.hypot(vx, vy);
  if (speed > PLAYER.MOVE_SPEED * PLAYER.MIN_FACING_SPEED) {
    player.facing = vectorToDirection(vx, vy);
  }

  return world;
};
