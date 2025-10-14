import type { StageId } from "@/constants/stage-meta";

type StageState = {
  selectedStageId: StageId | null;
  clearedStages: Partial<Record<StageId, boolean>>;
  selectStage: (id: StageId | null) => void;
  markCleared: (id: StageId) => void;
};

export type { StageState };
