import type { WorldSystem } from "@/types/world-engine";
import { INPUT_DEADZONE, DEATH_HOLD_FRAME } from "@/constants/player";
import { deltaSeconds, nowSeconds } from "@/utils/time";
import { useGameStore } from "@/store/use-game-store";
import {
  getMovementState,
  getFrameInfo,
  setSpriteState,
  tickSpriteFrame,
} from "@/lib/sprite";

export const AnimationSystem: WorldSystem = (world, frameInfo) => {
  const { input, entities } = world;
  const { player, playerSprite } = entities;

  if (!player) {
    return;
  }

  const dt = deltaSeconds(frameInfo);
  const now = nowSeconds(frameInfo);

  const status = useGameStore.getState().status;

  if (status.type === "death" && playerSprite.state !== "DEATH") {
    world.input.x = 0;
    world.input.y = 0;
    world.input.power = 0;

    playerSprite.state = "DEATH";
    playerSprite.frameIndex = 0;
    playerSprite.frameTimer = 0;

    const { frameCount, frameDuration } = getFrameInfo("DEATH", playerSprite);
    const deathDuration = frameCount * frameDuration;
    playerSprite.deathEndAt = now + deathDuration + DEATH_HOLD_FRAME;

    return;
  }

  const spriteState = playerSprite.state;
  const nextState = getMovementState(input.power, INPUT_DEADZONE);

  if (spriteState === "DEATH") {
    const { frameCount, frameDuration } = getFrameInfo("DEATH", playerSprite);

    tickSpriteFrame(playerSprite, frameCount, frameDuration, dt, false);

    if (playerSprite.deathEndAt && now >= playerSprite.deathEndAt) {
      if (status.type === "death") {
        useGameStore.getState().gameOver(status.reason);
      }
      playerSprite.deathEndAt = undefined;
    }
    return;
  }

  if (spriteState === "HIT") {
    const { frameCount, frameDuration } = getFrameInfo("HIT", playerSprite);

    tickSpriteFrame(playerSprite, frameCount, frameDuration, dt, true);

    if (playerSprite.hitEndAt && now >= playerSprite.hitEndAt) {
      setSpriteState(playerSprite, nextState);

      playerSprite.hitFrameRate = undefined;
      playerSprite.hitEndAt = undefined;
    }
    return;
  }

  if (spriteState !== nextState) {
    setSpriteState(playerSprite, nextState);
  }

  const { frameCount, frameDuration } = getFrameInfo(
    playerSprite.state,
    playerSprite,
  );

  tickSpriteFrame(playerSprite, frameCount, frameDuration, dt, true);
};
