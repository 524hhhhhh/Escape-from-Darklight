import type { ChapterId } from "@/constants/stage-meta";

type ChapterState = {
  selectedChapterId: ChapterId | null;
  unlockedChapters: Record<ChapterId, boolean>;
  selectChapter: (id: ChapterId | null) => void;
  unlockChapter: (id: ChapterId) => void;
};

export type { ChapterState };
