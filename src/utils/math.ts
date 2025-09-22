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

export { normalize, clamp };
