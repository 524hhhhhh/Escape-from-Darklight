import { HEART, HEART_STATE } from "@/constants/heart-hp";
import { HeartClipKey } from "@/types/heart-hp";

function getHeartSpriteInfo(key: HeartClipKey) {
  const clip = HEART.SPRITE_SHEET.CLIPS[key];
  const frameRate = clip.FRAME_RATE ?? 0;

  return {
    src: HEART.SPRITE_SHEET.SOURCE,
    cols: HEART.SPRITE_SHEET.COL_COUNT,
    rows: HEART.SPRITE_SHEET.ROW_COUNT,

    startIndex: clip.ROW_INDEX * HEART.SPRITE_SHEET.COL_COUNT + clip.START_COL,

    frameCount: clip.FRAME_COUNT,
    isLoop: !!clip.IS_LOOP,
    frameDuration: frameRate > 0 ? 1 / frameRate : Number.POSITIVE_INFINITY,
  };
}

function getHeartState(hp: number, index: number): HeartClipKey {
  const heartStartHp = index * HEART.UNIT;
  const heartFill = hp - heartStartHp;

  if (heartFill >= HEART.UNIT) {
    return HEART_STATE.FULL_IDLE;
  }
  if (heartFill === HEART.UNIT / 2) {
    return HEART_STATE.HALF_IDLE;
  }
  return HEART_STATE.EMPTY;
}

function buildHeartStates(hp: number, heartCount: number): HeartClipKey[] {
  const result: HeartClipKey[] = new Array(heartCount);
  for (let i = 0; i < heartCount; i++) {
    result[i] = getHeartState(hp, i);
  }
  return result;
}

function getHeartTransition(
  prev: HeartClipKey,
  next: HeartClipKey,
): HeartClipKey {
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
  prevHearts: HeartClipKey[],
): HeartClipKey[] {
  const updatedHearts = prevHearts.slice();

  if (prevHp > currentHp) {
    for (let hpStep = prevHp; hpStep > currentHp; hpStep--) {
      const index = Math.floor((hpStep - 1) / HEART.UNIT);
      const prevHeartState = getHeartState(hpStep, index);
      const nextHeartState = getHeartState(hpStep - 1, index);

      updatedHearts[index] = getHeartTransition(prevHeartState, nextHeartState);
    }
  }

  return updatedHearts;
}

export { getHeartSpriteInfo, buildHeartStates, updateHeartStates };
