const HEART = {
  FRAME_SIZE: 16,
  UI: {
    SIZE: 46,
    SPACING: 0,
    OVERLAP: 14,
  },
  UNIT: 2,
  SPRITE_SHEET: {
    SOURCE: require("@assets/hp/heart-hp.png"),
    COL_COUNT: 6,
    ROW_COUNT: 5,
    CLIPS: {
      FULL_IDLE: {
        ROW_INDEX: 0,
        START_COL: 0,
        FRAME_COUNT: 6,
        IS_LOOP: true,
        FRAME_RATE: 10,
      },
      FULL_TO_HALF: {
        ROW_INDEX: 1,
        START_COL: 0,
        FRAME_COUNT: 3,
        IS_LOOP: false,
        FRAME_RATE: 12,
      },
      HALF_IDLE: {
        ROW_INDEX: 2,
        START_COL: 0,
        FRAME_COUNT: 6,
        IS_LOOP: true,
        FRAME_RATE: 10,
      },
      HALF_TO_EMPTY: {
        ROW_INDEX: 3,
        START_COL: 0,
        FRAME_COUNT: 3,
        IS_LOOP: false,
        FRAME_RATE: 12,
      },
      EMPTY: {
        ROW_INDEX: 4,
        START_COL: 0,
        FRAME_COUNT: 1,
        IS_LOOP: false,
        FRAME_RATE: 0,
      },
    } as const,
  },
} as const;

const HEART_STATE = {
  FULL_IDLE: "FULL_IDLE",
  FULL_TO_HALF: "FULL_TO_HALF",
  HALF_IDLE: "HALF_IDLE",
  HALF_TO_EMPTY: "HALF_TO_EMPTY",
  EMPTY: "EMPTY",
} as const;

export { HEART, HEART_STATE };
