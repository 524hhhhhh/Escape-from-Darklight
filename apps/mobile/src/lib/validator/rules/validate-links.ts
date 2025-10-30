import { RefinementCtx, ZodIssueCode } from "zod";
import { TriggerList } from "@/lib/validator/trigger-schema";

export default function validateLinks(
  triggers: TriggerList,
  ctx: RefinementCtx,
) {
  const doorIdSet = new Set(
    triggers
      .filter((trigger) => trigger.type === "door")
      .map((trigger) => trigger.id),
  );

  triggers.forEach((trigger, index) => {
    if (trigger.type !== "switch") {
      return;
    }

    for (const linkedDoorId of trigger.linkedDoors) {
      if (!doorIdSet.has(linkedDoorId)) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: `switch("${trigger.id}")이 참조한 문("${linkedDoorId}")이 존재하지 않습니다.`,
          path: ["triggers", index, "linkedDoors"],
        });
      }
    }
  });
}
