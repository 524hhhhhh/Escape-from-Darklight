import { PLAYER } from "@/constants/player";
import { checkAABBCollision } from "@/lib/map-collision";
import type { WorldSystem } from "@/types/world-engine";
import { vectorToDirection } from "@/utils/direction";
import { deltaSeconds } from "@/utils/math";

export const PhysicsSystem: WorldSystem = (world, frameInfo) => {
  const dt = deltaSeconds(frameInfo);
  const { input, player, map } = world;
  if (!player || !map) {
    return;
  }

  const power = input.power ?? Math.hypot(input.x, input.y);
  if (power <= 0) {
    return;
  }

  const velocityX = input.x * PLAYER.MOVE_SPEED * power;
  const velocityY = input.y * PLAYER.MOVE_SPEED * power;

  const { worldX: currentX, worldY: currentY } = player.position;

  const halfW = PLAYER.COLLIDER_W / 2;
  const halfH = PLAYER.COLLIDER_H / 2;

  let nextX = currentX + velocityX * dt;
  let nextY = currentY;
  const hitX = checkAABBCollision(map, nextX, nextY, halfW, halfH);
  if (hitX) {
    nextX = currentX;
  }

  nextY = currentY + velocityY * dt;
  const hitY = checkAABBCollision(map, nextX, nextY, halfW, halfH);
  if (hitY) {
    nextY = currentY;
  }

  player.position.worldX = nextX;
  player.position.worldY = nextY;

  const speed = Math.hypot(velocityX, velocityY);
  if (speed > PLAYER.MOVE_SPEED * PLAYER.MIN_FACING_SPEED) {
    player.facing = vectorToDirection(velocityX, velocityY);
  }
};
