import { transformMap } from "./transform-map";
import type { TransformMap } from "@/types/map-transform";
import { MapJson, MapJsonSchema } from "@/lib/validator/map-schema";

export function loadMap(input: unknown): TransformMap {
  const parsed: MapJson = MapJsonSchema.parse(input);

  return transformMap(parsed);
}
