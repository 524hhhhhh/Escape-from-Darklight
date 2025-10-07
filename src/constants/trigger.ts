const TRIGGER_ASSETS = {
  switch: require("@assets/map/triggers/switch.png"),
  door: require("@assets/map/triggers/door.png"),
};

const TRIGGER_TEMPLATES = {
  switch: {
    FRAMES: 4,
    HOLD_MS: 1500,
  },
  door: {
    FRAMES: 14,
    FRAME_RATE: 8,
  },
} as const;

const DOOR_FRAME_DELAY = 1 / TRIGGER_TEMPLATES.door.FRAME_RATE;

export { TRIGGER_TEMPLATES, TRIGGER_ASSETS, DOOR_FRAME_DELAY };
