import type { Hazard } from "@/types/hazard";

type SolidRegistry = {
  has(tileX: number, tileY: number): boolean;
  add(tileX: number, tileY: number): boolean;
  remove(tileX: number, tileY: number): void;
  clear(): void;
};

type HazardRegistry = {
  get(tileX: number, tileY: number): Hazard | undefined;
  set(tileX: number, tileY: number, hazard: Hazard): void;
  delete(tileX: number, tileY: number): void;
  clear(): void;
};

export type { SolidRegistry, HazardRegistry };
