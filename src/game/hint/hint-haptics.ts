import * as Haptics from "expo-haptics";
import type { HintState } from "@/types/hint";
import { HAPTICS_INTERVAL, HAPTICS_STEP } from "@/constants/hint";

let hapticTimer: ReturnType<typeof setInterval> | null = null;
let timeoutHandles: Array<ReturnType<typeof setTimeout>> = [];

function clearAll() {
  if (hapticTimer) {
    clearInterval(hapticTimer);
    hapticTimer = null;
  }

  for (const timeoutId of timeoutHandles) {
    clearTimeout(timeoutId);
  }

  timeoutHandles = [];
}

function addTimeoutHandle(fn: () => void, delay: number) {
  const timeoutId = setTimeout(fn, delay);
  timeoutHandles.push(timeoutId);
}

export function startHapticLoop(state: HintState) {
  clearAll();

  switch (state) {
    case "LOW": {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);

      hapticTimer = setInterval(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
      }, HAPTICS_INTERVAL.LOW);

      break;
    }

    case "MEDIUM": {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      hapticTimer = setInterval(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        addTimeoutHandle(
          () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
          HAPTICS_STEP.SHORT,
        );

        addTimeoutHandle(
          () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
          HAPTICS_STEP.MEDIUM,
        );
      }, HAPTICS_INTERVAL.MEDIUM);

      break;
    }

    case "HIGH": {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

      hapticTimer = setInterval(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

        addTimeoutHandle(
          () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),
          HAPTICS_STEP.FAST,
        );

        addTimeoutHandle(
          () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
          HAPTICS_STEP.SHORT,
        );

        addTimeoutHandle(
          () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),
          HAPTICS_STEP.FAST,
        );
      }, HAPTICS_INTERVAL.HIGH);
    }
  }
}

export function stopHapticLoop() {
  clearAll();
}
