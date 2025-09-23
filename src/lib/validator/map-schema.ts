import { z } from "zod";
import { TILE } from "@/constants/map";

export const TileCodeSchema = z.union([
  z.literal(TILE.Road),
  z.literal(TILE.Wall),
  z.literal(TILE.Exit),
]);

export const TileGridSchema = z.array(z.array(TileCodeSchema));

export type TileCode = z.infer<typeof TileCodeSchema>;
export type TileGrid = z.infer<typeof TileGridSchema>;

export const MapJsonSchema = z.object({
  meta: z.object({
    version: z.string(),
    width: z.number(),
    height: z.number(),
    tileSizeRender: z.number(),
    tileSizeCollision: z.number(),
    generator: z.object({
      name: z.string(),
      seed: z.number().nullable(),
      params: z.record(z.unknown()),
    }),
  }),
  grid: TileGridSchema,
  spawn: z.object({ tileX: z.number(), tileY: z.number() }),
  exits: z.array(
    z.object({
      tileX: z.number(),
      tileY: z.number(),
      id: z.string().optional(),
    }),
  ),
  objects: z.array(z.unknown()),
});

export type MapJson = z.infer<typeof MapJsonSchema>;
