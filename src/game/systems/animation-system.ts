import type { WorldSystem } from "@/types/world-engine";
import { FRAME_RATE, SPRITE } from "@/constants/player";
import { deltaSeconds } from "@/utils/math";
import { AnimationState } from "@/types/sprite-animation";
import { INPUT_DEADZONE } from "@/constants/player";

export const AnimationSystem: WorldSystem = (world, frameInfo) => {
  const { input, entities } = world;
  const { player, playerSprite } = entities;

  if (!player) {
    return;
  }

  const dt = deltaSeconds(frameInfo);

  const isMoving = input.power > INPUT_DEADZONE;
  const nextState: AnimationState = isMoving ? "RUN" : "IDLE";

  if (playerSprite.state !== nextState) {
    playerSprite.state = nextState;
    playerSprite.frameIndex = 0;
    playerSprite.frameTimer = 0;
  }

  const frameRate = nextState === "IDLE" ? FRAME_RATE.IDLE : FRAME_RATE.RUN;
  const frameDelay = 1 / frameRate;

  playerSprite.frameTimer += dt;
  if (playerSprite.frameTimer >= frameDelay) {
    playerSprite.frameTimer -= frameDelay;
    const frames = SPRITE.CLIPS[nextState].FRAMES;
    playerSprite.frameIndex = (playerSprite.frameIndex + 1) % frames;
  }
};
