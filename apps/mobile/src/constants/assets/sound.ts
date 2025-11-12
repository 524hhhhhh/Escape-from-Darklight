const BGM_ASSETS = {
  MAIN: require("@assets/sound/bgm/bgm-main.mp3"),
  INGAME: require("@assets/sound/bgm/bgm-ingame.mp3"),
};

const UI_FEEDBACK_ASSETS = {
  PRESS: require("@assets/sound/effect/ui-feedback.wav"),
  GAME_START: require("@assets/sound/effect/game-start.wav"),
};

const GAME_EFFECT_ASSETS = {
  GAME_OVER: require("@assets/sound/effect/game-over.wav"),
  HIT: require("@assets/sound/effect/hit.wav"),
  CLEARED: require("@assets/sound/effect/game-clear.wav"),
  SWITCH: require("@assets/sound/effect/switch.wav"),
  DOOR: require("@assets/sound/effect/door.wav"),
};

const SWITCH_SOUND_DELAY = 500;

export {
  BGM_ASSETS,
  UI_FEEDBACK_ASSETS,
  GAME_EFFECT_ASSETS,
  SWITCH_SOUND_DELAY,
};
