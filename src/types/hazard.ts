type HazardKind = "electric" | "spike";

type HazardTemplate = {
  kind: HazardKind;
  damage: number;
  cooldown: number;
  haptics: "Light" | "Medium" | "Heavy";
};

type HazardTile = HazardTemplate & {
  tileX: number;
  tileY: number;
};

type HazardTemplateMap = Partial<Record<number, HazardTemplate>>;

export type { HazardKind, HazardTemplateMap, HazardTile };
