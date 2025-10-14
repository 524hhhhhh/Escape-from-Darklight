import { create } from "zustand";
import type { StageState } from "@/types/stage-state";

export const useStageStore = create<StageState>((set) => ({
  selectedStageId: null,
  clearedStages: {},

  selectStage: (id) => set({ selectedStageId: id }),
  markCleared: (id) =>
    set((state) => ({
      clearedStages: { ...state.clearedStages, [id]: true },
    })),
}));
