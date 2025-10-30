import { HazardTemplateMap } from "@/types/hazard";

const TILE = {
  ROAD: 0,
  WALL: 1,
  EXIT: 2,
  POISON: 3,
  SPIKE: 4,
};

const TILE_SIZE = {
  RENDER: 64,
  COLLISION: 58,
};

const HAZARDS_TEMPLATES: HazardTemplateMap = {
  [TILE.POISON]: {
    kind: "poison",
    damage: 1,
    cooldown: 500,
    haptics: "Light",
  },
  [TILE.SPIKE]: {
    kind: "spike",
    damage: 2,
    cooldown: 800,
    haptics: "Heavy",
  },
};

export { TILE, TILE_SIZE, HAZARDS_TEMPLATES };
