import type { WallNeighbors, WallPiece, WallRuleFn } from "@/types/tile-render";

function needsCross(
  neighbors: WallNeighbors,
  { strictDiagonal = true } = {},
): boolean {
  const { north, east, south, west } = neighbors;

  if (!south) {
    return false;
  }

  const neighborWallcount =
    (north ? 1 : 0) + (east ? 1 : 0) + (south ? 1 : 0) + (west ? 1 : 0);

  if (neighborWallcount === 3 && north && south && east !== west) {
    if (east && !west) {
      return !strictDiagonal || (!neighbors.northEast && !neighbors.southEast);
    }
    if (west && !east) {
      return !strictDiagonal || (!neighbors.northWest && !neighbors.southWest);
    }
    return false;
  }

  if (neighborWallcount === 2 && !north) {
    if (east && !west) {
      return !strictDiagonal || !neighbors.southEast;
    }
    if (west && !east) {
      return !strictDiagonal || !neighbors.southWest;
    }
  }

  if (neighborWallcount === 3 && !north && south && east && west) {
    return !strictDiagonal || (!neighbors.northEast && !neighbors.northWest);
  }

  return false;
}

const wallShapeRules: WallRuleFn[] = [
  (neighbors) => (!neighbors.north ? [{ kind: "edge", direction: "top" }] : []),
  (neighbors) =>
    !neighbors.east ? [{ kind: "edge", direction: "right" }] : [],
  (neighbors) =>
    !neighbors.south ? [{ kind: "edge", direction: "bottom" }] : [],
  (neighbors) => (!neighbors.west ? [{ kind: "edge", direction: "left" }] : []),

  (neighbors) =>
    !neighbors.north && !neighbors.west && !neighbors.northWest
      ? [{ kind: "corner", direction: "top_left" }]
      : [],
  (neighbors) =>
    !neighbors.north && !neighbors.east && !neighbors.northEast
      ? [{ kind: "corner", direction: "top_right" }]
      : [],
  (neighbors) =>
    !neighbors.south && !neighbors.west && !neighbors.southWest
      ? [{ kind: "corner", direction: "bottom_left" }]
      : [],
  (neighbors) =>
    !neighbors.south && !neighbors.east && !neighbors.southEast
      ? [{ kind: "corner", direction: "bottom_right" }]
      : [],
];

function selectWallPieces(neighbors: WallNeighbors): WallPiece[] {
  if (needsCross(neighbors, { strictDiagonal: true })) {
    return [{ kind: "cross" }];
  }

  const wallPieces: WallPiece[] = [];

  for (const rule of wallShapeRules) {
    const pieces = rule(neighbors);

    if (pieces.length) {
      wallPieces.push(...pieces);
    }
  }
  return wallPieces;
}

export { needsCross, selectWallPieces, wallShapeRules };
