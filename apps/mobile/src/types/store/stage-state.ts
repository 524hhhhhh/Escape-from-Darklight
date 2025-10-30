import type { StageId } from "@/constants/stage-meta";

type StageState = {
  selectedStageId: StageId | null;
  clearedStageIds: Set<StageId>;
  selectStage: (id: StageId | null) => void;
  updateClearedStage: (id: StageId) => void;
};

export type { StageState };
