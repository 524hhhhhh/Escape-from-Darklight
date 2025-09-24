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

const deltaSeconds = (frameInfo: FrameInfo, fallbackMs = 16.67): number => {
  return (frameInfo.time.delta ?? fallbackMs) / 1000;
};

export { normalize, clamp, deltaSeconds };
