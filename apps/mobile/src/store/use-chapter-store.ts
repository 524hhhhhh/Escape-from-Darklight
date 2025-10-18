import { create } from "zustand";
import type { ChapterState } from "@/types/store/chapter-state";
import type { ChapterId } from "@/constants/stage-meta";

export const useChapterStore = create<ChapterState>((set) => ({
  selectedChapterId: null,
  unlockedChapters: {
    "chapter-1": true,
    "locked-stage": false,
  } as Record<ChapterId, boolean>,

  selectChapter: (id) => set({ selectedChapterId: id }),
  unlockChapter: (id) =>
    set((state) => ({
      unlockedChapters: { ...state.unlockedChapters, [id]: true },
    })),
}));
