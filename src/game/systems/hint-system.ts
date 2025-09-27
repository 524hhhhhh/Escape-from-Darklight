import type { WorldSystem } from "@/types/world-engine";
import type { TransformMap } from "@/types/map-transform";
import { deltaSeconds } from "@/utils/math";
import { createHintController } from "@/game/hint/hint-controller";
import { HINT_DISTANCE_STEP, HINT_TRIGGER_ZONE } from "@/constants/hint";

export const HintController = createHintController({
  distanceSteps: HINT_DISTANCE_STEP,
  hintTriggerZone: HINT_TRIGGER_ZONE,
});

export const HintSystem: WorldSystem = (world, frameInfo) => {
  const { map, player } = world as {
    map?: TransformMap;
    player?: typeof world.player;
  };
  if (!map || !player || !map.exits?.length) {
    return;
  }

  const { worldX, worldY } = player.position;
  let nearestExitDistance = Infinity;

  for (const exit of map.exits) {
    const exitDistance = Math.hypot(worldX - exit.x, worldY - exit.y);
    if (exitDistance < nearestExitDistance) {
      nearestExitDistance = exitDistance;
    }
  }

  HintController.setDistance(nearestExitDistance);
  HintController.tick(deltaSeconds(frameInfo));
};
