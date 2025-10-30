export { PhysicsSystem } from "./physics-system";
export { CameraSystem } from "./camera-system";
export { WorldClampSystem } from "./world-clamp-system";
export { ExitSystem } from "./exit-system";
export { AnimationSystem } from "./animation-system";
export { HintSystem } from "./hint-system";
export { LightSystem } from "./light-system";
export { HazardSystem } from "./hazard-system";
export { TriggerSystem } from "./trigger-system";

import { PhysicsSystem } from "./physics-system";
import { CameraSystem } from "./camera-system";
import { WorldClampSystem } from "./world-clamp-system";
import { ExitSystem } from "./exit-system";
import { AnimationSystem } from "./animation-system";
import { HintSystem } from "./hint-system";
import { LightSystem } from "./light-system";
import { HazardSystem } from "./hazard-system";
import { TriggerSystem } from "./trigger-system";

export const systems = [
  PhysicsSystem,
  WorldClampSystem,
  ExitSystem,
  AnimationSystem,
  HintSystem,
  HazardSystem,
  TriggerSystem,
  CameraSystem,
  LightSystem,
] as const;
