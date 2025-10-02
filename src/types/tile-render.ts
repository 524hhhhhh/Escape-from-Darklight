import { ImageSourcePropType } from "react-native";

type TileIsWallFn = (x: number, y: number) => boolean;

type WallNeighbors = {
  east: boolean;
  west: boolean;
  south: boolean;
  north: boolean;
  southWest: boolean;
  southEast: boolean;
  northWest: boolean;
  northEast: boolean;
};

type TileRenderable = {
  key: string;
  screenX: number;
  screenY: number;
  screenW: number;
  screenH: number;
  source: ImageSourcePropType;
};

type WallPiece =
  | { kind: "edge"; direction: "top" | "right" | "bottom" | "left" }
  | {
      kind: "corner";
      direction: "top_left" | "top_right" | "bottom_left" | "bottom_right";
    }
  | { kind: "cross" };

type WallRuleFn = (neighbors: WallNeighbors) => WallPiece[];

export type {
  TileIsWallFn,
  WallNeighbors,
  TileRenderable,
  WallPiece,
  WallRuleFn,
};
