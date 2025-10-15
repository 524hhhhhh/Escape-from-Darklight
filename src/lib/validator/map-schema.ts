import { z } from "zod";
import { TileGridSchema } from "@/lib/validator/tile-schema";
import { TriggerSchema } from "@/lib/validator/trigger-schema";
import { createGridGuard } from "@/lib/validator/helper/create-grid-guard";
import validatePosition from "@/lib/validator/rules/validate-position";
import validateLinks from "@/lib/validator/rules/validate-links";
import validateDuplicates from "@/lib/validator/rules/validate-duplicates";

export const MapJsonSchema = z
  .object({
    meta: z.object({
      version: z.string(),
      generator: z.object({
        name: z.string(),
      }),
    }),

    grid: TileGridSchema,
    spawn: z.object({ tileX: z.number().int(), tileY: z.number().int() }),
    triggers: TriggerSchema.default([]),
  })
  .superRefine((mapJson, ctx) => {
    const { grid, spawn, triggers } = mapJson;
    const isInsideGrid = createGridGuard(grid);

    validatePosition(grid, spawn, triggers, isInsideGrid, ctx);
    validateLinks(triggers, ctx);
    validateDuplicates(triggers, ctx);
  });

export type MapJson = z.infer<typeof MapJsonSchema>;
