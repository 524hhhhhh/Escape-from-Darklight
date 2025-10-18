import { RefinementCtx, ZodIssueCode } from "zod";
import { TILE } from "@/constants/map";
import { TriggerList } from "@/lib/validator/trigger-schema";

export default function validatePosition(
  grid: number[][],
  spawn: { tileX: number; tileY: number },
  triggers: TriggerList,
  isInsideGrid: (x: number, y: number) => boolean,
  ctx: RefinementCtx,
) {
  const isSpawnInBounds = isInsideGrid(spawn.tileX, spawn.tileY);

  if (!isSpawnInBounds) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: `spawn 위치가 grid 범위를 벗어났습니다: (${spawn.tileX}, ${spawn.tileY})`,
      path: ["spawn"],
    });
  }

  triggers.forEach((trigger, index) => {
    const { tileX, tileY, type, id } = trigger;

    if (!isInsideGrid(tileX, tileY)) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: `${type}("${id}") 위치가 grid 범위를 벗어났습니다: (${tileX}, ${tileY})`,
        path: ["triggers", index],
      });
      return;
    }

    if (type === "door" || type === "switch") {
      const tileValue = grid[tileY][tileX];
      if (tileValue !== TILE.ROAD) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: `${type}("${id}")은 ROAD(0) 위에만 놓을 수 있습니다. (현재: ${tileValue})`,
          path: ["triggers", index],
        });
      }
    }
  });
}
