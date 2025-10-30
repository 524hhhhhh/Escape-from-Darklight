import type { WorldSystem } from "@/types/world-engine";
import { useGameStore } from "@/store/use-game-store";
import { isExitAtWorld } from "@/lib/map-collision";

export const ExitSystem: WorldSystem = (world) => {
  const { map, entities } = world;
  const player = entities.player;

  if (!map || !player) {
    return;
  }

  const { status, completeStage } = useGameStore.getState();
  if (status.type !== "playing") {
    return;
  }

  const { worldX, worldY } = player.position;
  if (isExitAtWorld(map, worldX, worldY)) {
    completeStage();
    return;
  }
};
