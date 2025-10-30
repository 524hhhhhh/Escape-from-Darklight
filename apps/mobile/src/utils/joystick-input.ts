const applyDeadzone = (strength: number, deadzone: number) =>
  strength < deadzone ? 0 : (strength - deadzone) / (1 - deadzone);

const vectorToAngle = (x: number, y: number) => Math.atan2(y, x);

export { applyDeadzone, vectorToAngle };
