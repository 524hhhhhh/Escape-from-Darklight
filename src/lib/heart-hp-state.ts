import {
  HEART_HP,
  HEART_SPRITE_DEFAULTS,
  HEART_STATE,
  HEART_TEMPLATES,
} from "@/constants/heart-hp";
import type { HeartSpriteKey } from "@/types/heart-hp";

function getHeartSpriteInfo(key: HeartSpriteKey) {
  const template = HEART_TEMPLATES[key];

  let frameDuration: number;

  if (template.durationMs != null) {
    frameDuration = template.durationMs / template.frames / 1000;
  } else {
    frameDuration = 1 / (template.frameRate ?? HEART_SPRITE_DEFAULTS.frameRate);
  }

  return {
    src: template.src,
    frameCount: template.frames,
    loop: template.isLoop ?? false,
    frameDuration,
  };
}

function getHeartState(hp: number, index: number): HeartSpriteKey {
  const heartStartHp = index * HEART_HP;
  const heartFill = hp - heartStartHp;

  if (heartFill >= HEART_HP) {
    return "FULL_IDLE";
  }

  if (heartFill === HEART_HP / 2) {
    return "HALF_IDLE";
  }

  return "EMPTY";
}

function buildHeartStates(hp: number, heartCount: number): HeartSpriteKey[] {
  const result: HeartSpriteKey[] = new Array(heartCount);
  for (let i = 0; i < heartCount; i++) {
    result[i] = getHeartState(hp, i);
  }
  return result;
}

function getHeartTransition(
  prev: HeartSpriteKey,
  next: HeartSpriteKey,
): HeartSpriteKey {
  if (prev === HEART_STATE.FULL_IDLE && next === HEART_STATE.HALF_IDLE) {
    return HEART_STATE.FULL_TO_HALF;
  }

  if (prev === HEART_STATE.HALF_IDLE && next === HEART_STATE.EMPTY) {
    return HEART_STATE.HALF_TO_EMPTY;
  }

  return next;
}

function updateHeartStates(
  prevHp: number,
  currentHp: number,
  prevHearts: HeartSpriteKey[],
): HeartSpriteKey[] {
  const updatedHearts = prevHearts.slice();

  if (prevHp > currentHp) {
    for (let hpStep = prevHp; hpStep > currentHp; hpStep--) {
      const index = Math.floor((hpStep - 1) / HEART_HP);
      const prevHeartState = getHeartState(hpStep, index);
      const nextHeartState = getHeartState(hpStep - 1, index);

      updatedHearts[index] = getHeartTransition(prevHeartState, nextHeartState);
    }
  }

  return updatedHearts;
}

export {
  getHeartSpriteInfo,
  getHeartState,
  buildHeartStates,
  updateHeartStates,
};
