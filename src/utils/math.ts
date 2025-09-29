import { FrameInfo } from "@/types/world-engine";

const normalize = (dx: number, dy: number) => {
  const length = Math.hypot(dx, dy) || 1;

  return {
    directionX: dx / length,
    directionY: dy / length,
    length,
  };
};

const clamp = (length: number, max: number) =>
  Math.min(length, Math.max(0, max));

const clampToRatio = (value: number) => Math.max(0, Math.min(1, value));

const lerp = (start: number, end: number, ratio: number) =>
  start + (end - start) * ratio;

const deltaSeconds = (frameInfo: FrameInfo, fallbackMs = 16.67): number => {
  return (frameInfo.time.delta ?? fallbackMs) / 1000;
};

export { normalize, clamp, deltaSeconds, lerp, clampToRatio };
