import type { FrameSprite } from "@/types/sprite-animation";

type TriggerBase = {
  id: string;
  tileX: number;
  tileY: number;
};

type SwitchState = TriggerBase & {
  type: "switch";
  linkedDoors: string[];
  progressMs: number;
  isCompleted: boolean;
  sprite: FrameSprite;
};

type DoorState = TriggerBase & {
  type: "door";
  openState: "closed" | "opening" | "opened";
  sprite: FrameSprite;
};

export type { SwitchState, DoorState };
