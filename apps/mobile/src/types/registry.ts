import type { HazardTemplate } from "@/types/hazard";
import { SwitchState, DoorState } from "@/types/trigger";

type SolidRegistry = {
  has(tileX: number, tileY: number): boolean;
  add(tileX: number, tileY: number): boolean;
  remove(tileX: number, tileY: number): void;
  clear(): void;
};

type HazardRegistry = {
  get(tileX: number, tileY: number): HazardTemplate | undefined;
  set(tileX: number, tileY: number, hazard: HazardTemplate): void;
  delete(tileX: number, tileY: number): void;
  clear(): void;
};

type TriggerRegistry = {
  switches: Map<string, SwitchState>;
  doors: Map<string, DoorState>;
  clear(): void;
};

export type { SolidRegistry, HazardRegistry, TriggerRegistry };
