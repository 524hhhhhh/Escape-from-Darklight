import { MapJson } from "@/lib/validator/map-schema";
import { ImageSourcePropType } from "react-native";

const STAGES_BY_CHAPTER = {
  chapter_1: [
    { id: "chapter-1-stage-1", title: "1" },
    { id: "chapter-1-stage-2", title: "2" },
    { id: "chapter-1-stage-3", title: "3" },
  ],
  locked_stage: [],
} as const;

type ChapterId = keyof typeof STAGES_BY_CHAPTER;
type StageMeta = (typeof STAGES_BY_CHAPTER)[ChapterId][number];
type StageId = StageMeta["id"];

type ChapterThumbnail = {
  id: ChapterId;
  title: string;
  image: ImageSourcePropType;
};

const CHAPTER_THUMBNAILS: readonly ChapterThumbnail[] = [
  {
    id: "chapter_1",
    title: "챕터 1",
    image: require("@assets/chapters/thumbnails/chapter_1.png"),
  },
  {
    id: "locked_stage",
    title: "???",
    image: require("@assets/chapters/thumbnails/common/locked.png"),
  },
] as const;

const MAP_BY_STAGE: Record<StageId, MapJson> = {
  "chapter-1-stage-1": require("@assets/chapters/chapter_1/stage_01.json"),
  "chapter-1-stage-2": require("@assets/chapters/chapter_1/stage_02.json"),
  "chapter-1-stage-3": require("@assets/chapters/chapter_1/stage_03.json"),
};

export { STAGES_BY_CHAPTER, CHAPTER_THUMBNAILS, MAP_BY_STAGE };
export type { ChapterId, StageMeta, StageId, ChapterThumbnail };
