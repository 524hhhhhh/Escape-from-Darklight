import { FRAME_RATE, SPRITE } from "@/constants/player";
import { AnimationState, PlayerSprite } from "@/types/sprite-animation";

function sliceFrame(frame: number, cols: number) {
  const col = frame % cols;
  const row = Math.floor(frame / cols);
  return { col, row };
}

function buildPingPongFrames(maxFramIndex: number) {
  const frames: number[] = [];
  for (let frameIndex = 0; frameIndex <= maxFramIndex; frameIndex++) {
    frames.push(frameIndex);
  }

  for (let frameIndex = maxFramIndex - 1; frameIndex >= 0; frameIndex--) {
    frames.push(frameIndex);
  }

  return frames;
}

function getFrameInfo(
  state: AnimationState,
  sprite: PlayerSprite,
): { frameCount: number; frameDuration: number } {
  const frameCount = SPRITE.CLIPS[state].FRAMES;

  const frameRate =
    state === "HIT"
      ? (sprite.hitFrameRate ?? FRAME_RATE.HIT ?? 8)
      : (FRAME_RATE[state] ?? 8);

  const frameDuration = 1 / frameRate;

  return { frameCount, frameDuration };
}

function getMovementState(
  inputPower: number,
  deadzone: number,
): AnimationState {
  return inputPower > deadzone ? "RUN" : "IDLE";
}

function setSpriteState(sprite: PlayerSprite, next: AnimationState) {
  if (sprite.state === next) {
    return;
  }

  sprite.state = next;
  sprite.frameIndex = 0;
  sprite.frameTimer = 0;
}

function tickSpriteFrame(
  sprite: PlayerSprite,
  frames: number,
  frameDelay: number,
  dt: number,
  loop: boolean,
) {
  sprite.frameTimer += dt;
  if (sprite.frameTimer < frameDelay) {
    return;
  }

  sprite.frameTimer -= frameDelay;
  if (loop) {
    sprite.frameIndex = (sprite.frameIndex + 1) % frames;
  } else {
    sprite.frameIndex = Math.min(sprite.frameIndex + 1, frames - 1);
  }
}

export {
  sliceFrame,
  buildPingPongFrames,
  getFrameInfo,
  getMovementState,
  setSpriteState,
  tickSpriteFrame,
};
