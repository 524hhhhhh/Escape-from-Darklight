import { TriggerList } from "@/lib/validator/trigger-schema";
import { HazardTemplateMap } from "@/types/hazard";
import type {
  HazardRegistry,
  SolidRegistry,
  TriggerRegistry,
} from "@/types/registry";

function buildSolidIndex(
  grid: number[][],
  index: SolidRegistry,
  targetTile: number,
): void {
  for (let tileY = 0; tileY < grid.length; tileY++) {
    const row = grid[tileY];

    for (let tileX = 0; tileX < row.length; tileX++) {
      if (row[tileX] === targetTile) {
        index.add(tileX, tileY);
      }
    }
  }
}

function buildHazardIndex(
  grid: number[][],
  index: HazardRegistry,
  template: HazardTemplateMap,
): void {
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];

    for (let x = 0; x < row.length; x++) {
      const tileCode = row[x];
      const hazardTemplate = template[tileCode];

      if (hazardTemplate) {
        index.set(x, y, hazardTemplate);
      }
    }
  }
}

function buildTriggerIndex(
  triggers: TriggerList,
  runtime: TriggerRegistry,
): void {
  runtime.clear();

  for (const trigger of triggers) {
    if (trigger.type === "door") {
      runtime.doors.set(trigger.id, {
        id: trigger.id,
        type: trigger.type,
        tileX: trigger.tileX,
        tileY: trigger.tileY,
        sprite: { frameIndex: 0, frameTimer: 0 },
        openState: "closed",
      });
    } else if (trigger.type === "switch") {
      runtime.switches.set(trigger.id, {
        id: trigger.id,
        type: trigger.type,
        tileX: trigger.tileX,
        tileY: trigger.tileY,
        linkedDoors: trigger.linkedDoors,
        progressMs: 0,
        isCompleted: false,
        sprite: { frameIndex: 0, frameTimer: 0 },
      });
    }
  }
}

export { buildSolidIndex, buildHazardIndex, buildTriggerIndex };
