import type { HeartSpriteSpec } from "@/types/heart-hp";

const HEART_HP = 2;
const HEART_UI = {
  SIZE: 44,
  SPACING: 0,
  OVERLAP: 12,
};

const HEART_SPRITE_DEFAULTS = {
  frameRate: 10,
  transitionDuration: 250,
} as const;

const HEART_STATE = {
  FULL_IDLE: "FULL_IDLE",
  FULL_TO_HALF: "FULL_TO_HALF",
  HALF_IDLE: "HALF_IDLE",
  HALF_TO_EMPTY: "HALF_TO_EMPTY",
  EMPTY: "EMPTY",
} as const;

const HEART_TEMPLATES: Record<string, HeartSpriteSpec> = {
  FULL_IDLE: {
    src: require("@assets/hp/heart_shine_full.png"),
    frames: 6,
    isLoop: true,
  },
  FULL_TO_HALF: {
    src: require("@assets/hp/heart_blink_full.png"),
    frames: 3,
    isLoop: false,
    durationMs: HEART_SPRITE_DEFAULTS.transitionDuration,
  },
  HALF_IDLE: {
    src: require("@assets/hp/heart_shine_half.png"),
    frames: 6,
    isLoop: true,
  },
  HALF_TO_EMPTY: {
    src: require("@assets/hp/heart_blink_half.png"),
    frames: 3,
    isLoop: false,
    durationMs: HEART_SPRITE_DEFAULTS.transitionDuration,
  },
  EMPTY: {
    src: require("@assets/hp/heart_empty.png"),
    frames: 1,
    isLoop: false,
    frameRate: 0,
  },
} as const satisfies Record<string, HeartSpriteSpec>;

export {
  HEART_HP,
  HEART_UI,
  HEART_SPRITE_DEFAULTS,
  HEART_STATE,
  HEART_TEMPLATES,
};
