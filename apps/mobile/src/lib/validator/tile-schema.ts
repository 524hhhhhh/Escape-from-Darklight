import { z } from "zod";
import { TILE } from "@/constants/map";

const TileCodeSchema = z.union([
  z.literal(TILE.ROAD),
  z.literal(TILE.WALL),
  z.literal(TILE.EXIT),
  z.literal(TILE.POISON),
  z.literal(TILE.SPIKE),
]);

export const TileGridSchema = z.array(z.array(TileCodeSchema));

export type TileGrid = z.infer<typeof TileGridSchema>;
