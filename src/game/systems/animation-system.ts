import type { WorldSystem } from "@/types/world-engine";
import { FRAME_RATE, SPRITE } from "@/constants/player";
import { deltaSeconds } from "@/utils/math";
import { AnimationState } from "@/types/sprite-animation";
import { INPUT_DEADZONE } from "@/constants/player";

export const AnimationSystem: WorldSystem = (world, frameInfo) => {
  const { input, player } = world;
  if (!player) {
    return;
  }

  const dt = deltaSeconds(frameInfo);

  const isMoving = input.power > INPUT_DEADZONE;
  const nextState: AnimationState = isMoving ? "RUN" : "IDLE";

  if (player.animation.state !== nextState) {
    player.animation.state = nextState;
    player.animation.frameIndex = 0;
    player.animation.frameTimer = 0;
  }

  const frameRate = nextState === "IDLE" ? FRAME_RATE.IDLE : FRAME_RATE.RUN;
  const frameDelay = 1 / frameRate;

  player.animation.frameTimer += dt;
  if (player.animation.frameTimer >= frameDelay) {
    player.animation.frameTimer -= frameDelay;
    const frames = SPRITE.CLIPS[nextState].FRAMES;
    player.animation.frameIndex = (player.animation.frameIndex + 1) % frames;
  }
};
