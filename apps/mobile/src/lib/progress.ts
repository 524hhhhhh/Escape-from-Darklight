import AsyncStorage from "@react-native-async-storage/async-storage";
import type { StageId } from "@/constants/stage-meta";

const STORAGE_KEY = "escape/progress/v1";

type GameProgress = {
  savedStageIds: StageId[];
  lastClearedStageId?: StageId;
};

const DEFAULT_PROGRESS: GameProgress = { savedStageIds: [] };

async function loadGameProgress(): Promise<GameProgress> {
  const savedData = await AsyncStorage.getItem(STORAGE_KEY);
  if (!savedData) {
    return DEFAULT_PROGRESS;
  }

  try {
    const progressData = JSON.parse(savedData);
    if (!progressData || !Array.isArray(progressData.savedStageIds)) {
      return DEFAULT_PROGRESS;
    }

    return progressData;
  } catch {
    return DEFAULT_PROGRESS;
  }
}

async function saveClearedStage(stageId: StageId) {
  const currentProgress = await loadGameProgress();
  if (currentProgress.savedStageIds.includes(stageId)) {
    return;
  }

  const updatedProgress: GameProgress = {
    savedStageIds: [...currentProgress.savedStageIds, stageId],
    lastClearedStageId: stageId,
  };

  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProgress));
  } catch (error) {
    if (__DEV__) {
      console.error("[progress] Storage 저장 실패", error);
    }
  }
}

export { loadGameProgress, saveClearedStage };
