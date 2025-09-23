import { WorldSystem } from "@/types/world-engine";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const CameraSystem: WorldSystem = (world) => {
  const { player, view, world: bounds } = world;
  if (!player || !view) {
    return world;
  }

  const zoom = view.zoom ?? 1;
  const vw = view.width ?? 0;
  const vh = view.height ?? 0;

  if (vw === 0 || vh === 0) {
    return world;
  }

  const halfW = vw / (2 * zoom);
  const halfH = vh / (2 * zoom);

  let targetOffsetX = player.position.x - halfW;
  let targetOffsetY = player.position.y - halfH;

  if (bounds) {
    const maxOffsetX = Math.max(0, (bounds.width ?? 0) - vw / zoom);
    const maxOffsetY = Math.max(0, (bounds.height ?? 0) - vh / zoom);
    targetOffsetX = Math.max(0, Math.min(targetOffsetX, maxOffsetX));
    targetOffsetY = Math.max(0, Math.min(targetOffsetY, maxOffsetY));
  }

  const SMOOTH = 0.2;
  view.offsetX = lerp(view.offsetX ?? 0, targetOffsetX, SMOOTH);
  view.offsetY = lerp(view.offsetY ?? 0, targetOffsetY, SMOOTH);

  return world;
};
