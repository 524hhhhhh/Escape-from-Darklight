import { WorldSystem } from "@/types/world-engine";
import { deltaSeconds, lerp } from "@/utils/math";

const SMOOTH = 0.2;
const DEADZONE = 0.5;

export const CameraSystem: WorldSystem = (world, frameInfo) => {
  const { player, view, world: bounds } = world;
  if (!player || !view) {
    return;
  }

  const zoom = view.zoom ?? 1;
  const vw = view.width ?? 0;
  const vh = view.height ?? 0;

  if (vw === 0 || vh === 0) {
    return;
  }

  const halfW = vw / (2 * zoom);
  const halfH = vh / (2 * zoom);

  let targetOffsetX = player.position.worldX - halfW;
  let targetOffsetY = player.position.worldY - halfH;

  if (bounds) {
    const maxOffsetX = Math.max(0, bounds.width - vw / zoom);
    const maxOffsetY = Math.max(0, bounds.height - vh / zoom);
    targetOffsetX = Math.max(0, Math.min(targetOffsetX, maxOffsetX));
    targetOffsetY = Math.max(0, Math.min(targetOffsetY, maxOffsetY));
  }

  const dt = deltaSeconds(frameInfo);
  const smooth = Math.min(Math.max(SMOOTH * (dt / (1 / 60)), 0), 1);

  const dx = targetOffsetX - (view.offsetX ?? 0);
  const dy = targetOffsetY - (view.offsetY ?? 0);

  if (Math.abs(dx) <= DEADZONE) {
    view.offsetX = targetOffsetX;
  } else {
    view.offsetX = lerp(view.offsetX ?? 0, targetOffsetX, smooth);
  }

  if (Math.abs(dy) <= DEADZONE) {
    view.offsetY = targetOffsetY;
  } else {
    view.offsetY = lerp(view.offsetY ?? 0, targetOffsetY, smooth);
  }
};
