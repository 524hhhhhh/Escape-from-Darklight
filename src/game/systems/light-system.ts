import type { WorldSystem } from "@/types/world-engine";
import type { LightFrame, LightingWorldState } from "@/types/light";
import { clampToRatio, deltaSeconds, lerp } from "@/utils/math";
import { LIGHT_RADIUS_WORLD } from "@/constants/light";

export const LightSystem: WorldSystem<LightingWorldState> = (
  world,
  frameInfo,
) => {
  const { view, entities, light } = world;
  const player = entities.player;

  if (!world.lightFrame) {
    world.lightFrame = { worldCenterX: 0, worldCenterY: 0, currentRadius: 0 };
  }
  const frame: LightFrame = world.lightFrame;

  if (!view.width || !view.height) {
    frame.worldCenterX = 0;
    frame.worldCenterY = 0;
    frame.currentRadius = 0;
    return;
  }

  const life = clampToRatio(light.lightLife ?? 1);
  const targetRadius = lerp(
    LIGHT_RADIUS_WORLD.MIN,
    LIGHT_RADIUS_WORLD.MAX,
    life,
  );

  frame.worldCenterX = player.position.worldX;
  frame.worldCenterY = player.position.worldY;

  const dt = deltaSeconds(frameInfo);

  const smoothing = 1 - Math.exp(-dt * LIGHT_RADIUS_WORLD.RESPONSE_SPEED);

  const previousRadius = frame.currentRadius || targetRadius;

  frame.currentRadius =
    previousRadius + (targetRadius - previousRadius) * smoothing;
};
