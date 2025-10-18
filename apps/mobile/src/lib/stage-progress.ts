import {
  STAGES_BY_CHAPTER,
  type ChapterId,
  type StageId,
  type StageMeta,
} from "@/constants/stage-meta";

function getStageList(chapterId: ChapterId): readonly StageMeta[] {
  return STAGES_BY_CHAPTER[chapterId] ?? [];
}

function getStageIndex(chapterId: ChapterId, stageId: StageId | null): number {
  if (!stageId) {
    return -1;
  }
  const chapterList = getStageList(chapterId);

  return chapterList.findIndex((stage) => stage.id === stageId);
}

function getNextStageId(
  chapterId: ChapterId,
  currentStageId: StageId | null,
): StageId | null {
  const stages = getStageList(chapterId);
  if (!stages.length || !currentStageId) {
    return null;
  }

  const index = getStageIndex(chapterId, currentStageId);
  const nextStage = stages[index + 1];

  return nextStage ? nextStage.id : null;
}

function isStageLocked(
  chapterId: ChapterId,
  stageId: StageId,
  clearedMap: Record<string, boolean>,
): boolean {
  const stages = getStageList(chapterId);
  const index = stages.findIndex((stage) => stage.id === stageId);

  if (index <= 0) {
    return false;
  }

  const prevStage = stages[index - 1];
  const prevCleared = clearedMap[prevStage.id] === true;

  const isLocked = !prevCleared;

  return isLocked;
}

export { getNextStageId, isStageLocked };
