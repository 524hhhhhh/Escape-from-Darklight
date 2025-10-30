import { useLoadingStore } from "@/store/use-loading-store";
import { LOADING_TIPS_MESSAGES } from "@/constants/game-message";
import { LOADING_TIME } from "@/constants/time";

function shuffle<T>(array: readonly T[]): T[] {
  const result = array.slice();
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export async function showLoadingWhile(
  task: () => Promise<void> | void,
): Promise<void> {
  const { show, hide } = useLoadingStore.getState();
  const startTime = Date.now();

  show({
    messages: shuffle(LOADING_TIPS_MESSAGES),
  });

  try {
    await task();

    const elapsedTime = Date.now() - startTime;
    const remainingVisibleMs = LOADING_TIME.MIN_VISIBLE_MS - elapsedTime;

    if (remainingVisibleMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, remainingVisibleMs));
    }
  } finally {
    hide();
  }
}
