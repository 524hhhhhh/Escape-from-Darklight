import type { HintState } from "@/types/hint";

const HINT_MAX_FRAME_INDEX: Record<HintState, number> = {
  LOW: 3,
  MEDIUM: 7,
  HIGH: 11,
};

const HINT_FRAME_RATE: Record<HintState, number> = {
  LOW: 6,
  MEDIUM: 12,
  HIGH: 16,
};

const HINT_DISTANCE_STEP = {
  low: 12,
  medium: 7,
  high: 3,
} as const;

const HINT_TRIGGER_ZONE = 10;
const HINT_FRAME_SKIP_LIMIT = 4;
const HINT_MAX_TIME_LIMIT = 1 / 10;

const HAPTICS_INTERVAL = {
  LOW: 1200,
  MEDIUM: 1000,
  HIGH: 800,
};

const HAPTICS_STEP = {
  SHORT: 200,
  MEDIUM: 400,
  FAST: 120,
};

export {
  HINT_MAX_FRAME_INDEX,
  HINT_FRAME_RATE,
  HINT_DISTANCE_STEP,
  HINT_TRIGGER_ZONE,
  HINT_FRAME_SKIP_LIMIT,
  HINT_MAX_TIME_LIMIT,
  HAPTICS_INTERVAL,
  HAPTICS_STEP,
};
