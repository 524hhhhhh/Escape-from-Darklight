import { Hazard } from "@/types/hazard";
import type { HazardRegistry, SolidRegistry } from "@/types/registry";

const key = (x: number, y: number) => `${x},${y}`;

function createSolidRegistry(): SolidRegistry {
  const index = new Set<string>();
  return {
    has: (tileX, tileY) => index.has(key(tileX, tileY)),
    add: (tileX, tileY) => {
      const size = index.size;
      index.add(key(tileX, tileY));
      return index.size !== size;
    },
    remove: (tileX, tileY) => {
      index.delete(key(tileX, tileY));
    },
    clear: () => index.clear(),
  };
}

function createHazardRegistry(): HazardRegistry {
  const map = new Map<string, Hazard>();
  return {
    get: (x, y) => map.get(key(x, y)),
    set: (x, y, hazard) => {
      map.set(key(x, y), hazard);
    },
    delete: (x, y) => {
      map.delete(key(x, y));
    },
    clear: () => {
      map.clear();
    },
  };
}

export { createSolidRegistry, createHazardRegistry };
