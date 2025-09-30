import type { WorldSystem } from "@/types/world-engine";
import { SPRITE, FRAME_RATE } from "@/constants/player";
import { deltaSeconds } from "@/utils/math";
import type { AnimationState } from "@/types/sprite-animation";
import { INPUT_DEADZONE } from "@/constants/player";

export const AnimationSystem: WorldSystem = (world, frameInfo) => {
  const { input, entities } = world;
  const { player, playerSprite } = entities;

  if (!player) {
    return;
  }

  const dt = deltaSeconds(frameInfo);

  const now = (frameInfo.time.now ?? 0) / 1000;

  const isMoving = input.power > INPUT_DEADZONE;
  const nextState: AnimationState = isMoving ? "RUN" : "IDLE";

  const spriteState = playerSprite.state;

  if (spriteState === "HIT") {
    const frameRate = playerSprite.hitFrameRate ?? FRAME_RATE.HIT ?? 8;
    const frameDelay = 1 / frameRate;

    playerSprite.frameTimer += dt;
    if (playerSprite.frameTimer >= frameDelay) {
      playerSprite.frameTimer -= frameDelay;

      const frames = SPRITE.CLIPS[nextState].FRAMES;
      playerSprite.frameIndex = (playerSprite.frameIndex + 1) % frames;
    }

    if (playerSprite.hitEndAt && now >= playerSprite.hitEndAt) {
      playerSprite.state = nextState;
      playerSprite.frameIndex = 0;
      playerSprite.frameTimer = 0;
      playerSprite.hitFrameRate = undefined;
      playerSprite.hitEndAt = undefined;
    }
    return;
  }

  const frameRate = FRAME_RATE[spriteState] ?? 8;
  const frameDelay = 1 / frameRate;

  playerSprite.frameTimer += dt;
  if (playerSprite.frameTimer >= frameDelay) {
    playerSprite.frameTimer -= frameDelay;
    const frames = SPRITE.CLIPS[spriteState].FRAMES;
    playerSprite.frameIndex = (playerSprite.frameIndex + 1) % frames;
  }

  if (spriteState !== nextState) {
    playerSprite.state = nextState;
    playerSprite.frameIndex = 0;
    playerSprite.frameTimer = 0;
  }
};
