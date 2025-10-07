import { z } from "zod";

const SwitchSchema = z.object({
  type: z.literal("switch"),
  id: z.string().min(1),
  tileX: z.number().int(),
  tileY: z.number().int(),
  linkedDoors: z.array(z.string().min(1)).min(1),
});

const DoorSchema = z.object({
  type: z.literal("door"),
  id: z.string().min(1),
  tileX: z.number().int(),
  tileY: z.number().int(),
});

export const TriggerSchema = z.array(z.union([SwitchSchema, DoorSchema]));

export type TriggerList = z.infer<typeof TriggerSchema>;
