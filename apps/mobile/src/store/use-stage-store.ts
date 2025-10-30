import { create } from "zustand";
import type { StageState } from "@/types/store/stage-state";
import { saveClearedStage } from "@/lib/progress";

export const useStageStore = create<StageState>((set, get) => ({
  selectedStageId: null,
  clearedStageIds: new Set(),

  selectStage: (id) => set({ selectedStageId: id }),

  updateClearedStage: (id) => {
    const clearedStageSet = get().clearedStageIds;
    if (clearedStageSet.has(id)) {
      return;
    }

    const updatedStageSet = new Set(clearedStageSet);
    updatedStageSet.add(id);

    set({ clearedStageIds: updatedStageSet });

    saveClearedStage(id);
  },
}));
