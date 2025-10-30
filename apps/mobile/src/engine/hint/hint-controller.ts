import type { HintDistanceStep, HintState } from "@/types/hint";
import { getDistanceState } from "@/engine/hint/hint-frame";
import {
  HINT_FRAME_RATE,
  HINT_FRAME_SKIP_LIMIT,
  HINT_MAX_FRAME_INDEX,
  HINT_MAX_TIME_LIMIT,
} from "@/constants/hint";
import { TILE_SIZE } from "@/constants/map";
import { buildPingPongFrames } from "@/lib/sprite";
import { startHapticLoop, stopHapticLoop } from "@/engine/hint/hint-haptics";

type HintControllerHandle = {
  setDistance: (distance: number) => void;
  tick: (deltaSeconds: number) => void;
  getFrame: () => number | null;
  reset: (initial?: HintState) => void;
};

type ControllerOptions = {
  distanceSteps: HintDistanceStep;
  hintTriggerZone: number;
};

export function createHintController(
  options: ControllerOptions,
  maxFrameIndex: Record<HintState, number> = HINT_MAX_FRAME_INDEX,
): HintControllerHandle {
  let isActiveHint = false;
  let currentState: HintState = "LOW";
  let pendingState: HintState | null = null;
  let pingPongFrames: number[] = [];
  let frameIndex = 0;
  let frameTimer = 0;

  const frameRate: Record<HintState, number> = HINT_FRAME_RATE;
  let frameDelay = 1 / frameRate[currentState];

  const worldTriggerZone = options.hintTriggerZone * TILE_SIZE.RENDER;

  pingPongFrames = buildPingPongFrames(maxFrameIndex[currentState]);

  function resetHintState(state: HintState, shouldPlayHaptics = true) {
    stopHapticLoop();

    currentState = state;
    pendingState = null;
    pingPongFrames = buildPingPongFrames(maxFrameIndex[state]);
    frameDelay = 1 / frameRate[state];
    frameIndex = 0;
    frameTimer = 0;

    if (isActiveHint && shouldPlayHaptics) {
      startHapticLoop(state);
    }
  }

  const setDistance = (distance: number) => {
    if (isActiveHint && distance > worldTriggerZone) {
      isActiveHint = false;
      pendingState = null;

      stopHapticLoop();
      return;
    }

    if (!isActiveHint && distance <= worldTriggerZone) {
      isActiveHint = true;
      const initialState = getDistanceState(distance, options.distanceSteps);
      resetHintState(initialState, true);

      return;
    }

    if (isActiveHint) {
      const nextState = getDistanceState(distance, options.distanceSteps);
      if (nextState !== currentState) {
        pendingState = nextState;
      }
    }
  };

  const tick = (dt: number) => {
    if (!isActiveHint) {
      return;
    }

    if (dt > HINT_MAX_TIME_LIMIT) {
      dt = HINT_MAX_TIME_LIMIT;
    }

    frameTimer += dt;
    if (frameTimer < frameDelay) {
      return;
    }

    let pendingFrames = Math.floor(frameTimer / frameDelay);
    if (pendingFrames > HINT_FRAME_SKIP_LIMIT) {
      pendingFrames = HINT_FRAME_SKIP_LIMIT;
    }
    frameTimer -= pendingFrames * frameDelay;

    for (let i = 0; i < pendingFrames; i++) {
      frameIndex++;
      if (frameIndex >= pingPongFrames.length) {
        if (pendingState !== null && pendingState !== currentState) {
          resetHintState(pendingState, true);
        } else {
          frameIndex = 0;
        }
      }
    }
  };

  const getFrame = (): number | null => {
    if (!isActiveHint) {
      return null;
    }

    return pingPongFrames[frameIndex];
  };

  const reset = (initial: HintState = "LOW") => {
    isActiveHint = false;
    pendingState = null;
    resetHintState(initial, false);
  };

  return { setDistance, tick, getFrame, reset };
}
