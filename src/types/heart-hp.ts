import { HEART_STATE } from "@/constants/heart-hp";
import { ImageSourcePropType } from "react-native";

type HeartSpriteKey = (typeof HEART_STATE)[keyof typeof HEART_STATE];

type HeartSpriteSpec = {
  src: ImageSourcePropType;
  frames: number;
  isLoop?: boolean;
  frameRate?: number;
  durationMs?: number;
};

export type { HeartSpriteKey, HeartSpriteSpec };
