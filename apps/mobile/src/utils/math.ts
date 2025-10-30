const normalizeVector = (dx: number, dy: number) => {
  const length = Math.hypot(dx, dy);
  if (length === 0) {
    return { directionX: 0, directionY: 0, length: 0 };
  }
  return { directionX: dx / length, directionY: dy / length, length };
};

const limitDistance = (length: number, max: number) =>
  Math.min(length, Math.max(0, max));

const clampToRatio = (value: number) => Math.max(0, Math.min(1, value));

const lerp = (start: number, end: number, ratio: number) =>
  start + (end - start) * ratio;

export { normalizeVector, limitDistance, lerp, clampToRatio };
