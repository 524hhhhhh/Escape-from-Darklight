import { TILE_SIZE } from "@/constants/map";
import type { HintDistanceStep, HintState } from "@/types/hint";

function getDistanceState(
  distance: number,
  steps: HintDistanceStep,
): HintState {
  const { high, medium } = steps;
  if (distance <= high * TILE_SIZE.RENDER) {
    return "HIGH";
  }

  if (distance <= medium * TILE_SIZE.RENDER) {
    return "MEDIUM";
  }

  return "LOW";
}

export { getDistanceState };
