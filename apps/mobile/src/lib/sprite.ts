import { FRAME_RATE, SPRITE } from "@/constants/player";
import type {
  AnimationState,
  FrameSprite,
  PlayerSprite,
} from "@/types/sprite-animation";
import { clampToRatio } from "../utils/math";

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
  sprite: FrameSprite,
  totalFrames: number,
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
    sprite.frameIndex = (sprite.frameIndex + 1) % totalFrames;
  } else {
    sprite.frameIndex = Math.min(sprite.frameIndex + 1, totalFrames - 1);
  }
}

function progressMsToFrame(
  progressMs: number,
  holdMs: number,
  frames: number,
  isActivated: boolean,
): number {
  const totalFrames = Math.max(1, frames);
  if (totalFrames === 1) {
    return 0;
  }

  const ratio = clampToRatio(progressMs / Math.max(1, holdMs));

  if (isActivated) {
    return totalFrames - 1;
  }

  const progressFrames = totalFrames - 1;
  const frameIndex = Math.floor(ratio * progressFrames);

  return Math.min(frameIndex, progressFrames - 1);
}

export {
  sliceFrame,
  buildPingPongFrames,
  getFrameInfo,
  getMovementState,
  setSpriteState,
  tickSpriteFrame,
  progressMsToFrame,
};
