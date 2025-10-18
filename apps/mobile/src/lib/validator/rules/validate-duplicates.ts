import { RefinementCtx, ZodIssueCode } from "zod";
import { TriggerList } from "@/lib/validator/trigger-schema";

export default function validateDuplicates(
  triggers: TriggerList,
  ctx: RefinementCtx,
) {
  const triggerIds = new Set<string>();
  const occupiedTiles = new Set<string>();

  triggers.forEach((trigger, index) => {
    const { id, type, tileX, tileY } = trigger;

    if (triggerIds.has(id)) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: `triggers에 중복 id("${id}")가 있습니다.`,
        path: ["triggers", index, "id"],
      });
    } else {
      triggerIds.add(id);
    }

    if (type === "door" || type === "switch") {
      const key = `${tileX},${tileY}`;

      if (occupiedTiles.has(key)) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: `문/스위치가 같은 타일(${key})을 중복 점유하고 있습니다.`,
          path: ["triggers", index],
        });
      } else {
        occupiedTiles.add(key);
      }
    }
  });
}
