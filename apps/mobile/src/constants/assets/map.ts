import { ImageSourcePropType } from "react-native";
import { TILE } from "@/constants/map";

const TILE_ASSETS: Record<number, ImageSourcePropType> = {
  [TILE.ROAD]: require("@assets/map/tiles/road.png"),
  [TILE.EXIT]: require("@assets/map/tiles/exit.png"),
  [TILE.SPIKE]: require("@assets/map/tiles/spike.png"),
  [TILE.POISON]: require("@assets/map/tiles/poison.png"),
};

const WALL_ASSETS = {
  edge: {
    top: require("@assets/map/walls/edge-top.png"),
    right: require("@assets/map/walls/edge-right.png"),
    bottom: require("@assets/map/walls/edge-bottom.png"),
    left: require("@assets/map/walls/edge-left.png"),
  },
  corner: {
    top_left: require("@assets/map/walls/corner-top-left.png"),
    top_right: require("@assets/map/walls/corner-top-right.png"),
    bottom_left: require("@assets/map/walls/corner-bottom-left.png"),
    bottom_right: require("@assets/map/walls/corner-bottom-right.png"),
  },
  cross: require("@assets/map/walls/cross-wall.png"),
};

export { TILE_ASSETS, WALL_ASSETS };
