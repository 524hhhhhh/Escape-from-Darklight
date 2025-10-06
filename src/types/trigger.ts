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
  isActivated: boolean;
  sprite: FrameSprite;
};

type DoorState = TriggerBase & {
  type: "door";
  isOpen: boolean;
  sprite: FrameSprite;
  hasPlayedOpenAnim?: boolean;
};

export type { SwitchState, DoorState };
