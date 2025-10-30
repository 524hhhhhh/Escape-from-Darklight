import {
  STAGES_BY_CHAPTER,
  type ChapterId,
  type StageId,
  type StageMeta,
} from "@/constants/stage-meta";

const FIRST_STAGE_INDEX = 0;
const STAGE_NOT_FOUND = -1;

function getStageList(chapterId: ChapterId): readonly StageMeta[] {
  return STAGES_BY_CHAPTER[chapterId] ?? [];
}

function getStageIndex(chapterId: ChapterId, stageId: StageId | null): number {
  if (!stageId) {
    return STAGE_NOT_FOUND;
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
  clearedSet: ReadonlySet<StageId>,
): boolean {
  const stages = getStageList(chapterId);
  const index = getStageIndex(chapterId, stageId);

  if (index === STAGE_NOT_FOUND) {
    return true;
  }

  if (index === FIRST_STAGE_INDEX) {
    return false;
  }

  const prevStageId = stages[index - 1].id;
  return !clearedSet.has(prevStageId);
}

export { getNextStageId, isStageLocked };
