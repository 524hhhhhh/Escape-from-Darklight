import { HazardTemplateMap } from "@/types/hazard";

const TILE = {
  ROAD: 0,
  WALL: 1,
  EXIT: 2,
  ELECTRIC: 3,
  SPIKE: 4,
};

const TILE_SIZE = {
  RENDER: 64,
  COLLISION: 58,
};

const HAZARDS_TEMPLATES: HazardTemplateMap = {
  [TILE.ELECTRIC]: {
    kind: "electric",
    damage: 1,
    cooldownMs: 300,
    haptics: "Light",
  },
  [TILE.SPIKE]: {
    kind: "spike",
    damage: 3,
    cooldownMs: 600,
    haptics: "Heavy",
  },
};

export { TILE, TILE_SIZE, HAZARDS_TEMPLATES };
