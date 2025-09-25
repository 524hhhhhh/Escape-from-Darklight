import type { SolidRegistry } from "@/types/registry";

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

export { createSolidRegistry };
