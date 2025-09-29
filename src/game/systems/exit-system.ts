import type { WorldSystem } from "@/types/world-engine";
import { useGameStore } from "@/store/use-game-store";
import { isExitAtWorld } from "@/lib/map-collision";

export const ExitSystem: WorldSystem = (world) => {
  const { map, player } = world;
  if (!map || !player) {
    return;
  }

  const { status, clearGame } = useGameStore.getState();
  if (status.type !== "playing") {
    return;
  }

  const { worldX, worldY } = player.position;
  if (isExitAtWorld(map, worldX, worldY)) {
    clearGame();
    return;
  }
};
