import { HazardTemplateMap } from "@/types/hazard";
import { ImageSourcePropType } from "react-native";

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

const TILE_ASSETS: Record<number, ImageSourcePropType> = {
  [TILE.ROAD]: require("@assets/map/tiles/road.png"),
  [TILE.EXIT]: require("@assets/map/tiles/exit.png"),
  [TILE.SPIKE]: require("@assets/map/tiles/spike.png"),
  [TILE.POISON]: require("@assets/map/tiles/poison.png"),
};

const WALL_ASSETS = {
  edge: {
    top: require("@assets/map/walls/edge_top.png"),
    right: require("@assets/map/walls/edge_right.png"),
    bottom: require("@assets/map/walls/edge_bottom.png"),
    left: require("@assets/map/walls/edge_left.png"),
  },
  corner: {
    top_left: require("@assets/map/walls/corner_top_left.png"),
    top_right: require("@assets/map/walls/corner_top_right.png"),
    bottom_left: require("@assets/map/walls/corner_bottom_left.png"),
    bottom_right: require("@assets/map/walls/corner_bottom_right.png"),
  },
  cross: require("@assets/map/walls/cross_wall.png"),
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

export { TILE, TILE_SIZE, HAZARDS_TEMPLATES, TILE_ASSETS, WALL_ASSETS };
