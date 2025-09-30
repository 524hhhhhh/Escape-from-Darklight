type HazardKind = "electric" | "spike";

type Hazard = {
  kind: HazardKind;
  damage: number;
  cooldownMs: number;
  haptics: "Light" | "Medium" | "Heavy";
};

type HazardTemplateMap = Partial<Record<number, Hazard>>;

export type { HazardKind, Hazard, HazardTemplateMap };
