type SolidRegistry = {
  has(tileX: number, tileY: number): boolean;
  add(tileX: number, tileY: number): boolean;
  remove(tileX: number, tileY: number): void;
  clear(): void;
};

export type { SolidRegistry };
