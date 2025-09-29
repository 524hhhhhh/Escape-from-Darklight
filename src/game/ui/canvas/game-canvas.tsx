import React, { useEffect, useMemo, useRef } from "react";
import { View, StyleSheet, LayoutChangeEvent } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WorldEngineLayer } from "@/game/ui/world/world-engine-layer";
import { PhysicsSystem } from "@/game/systems/physics-system";
import { CameraSystem } from "@/game/systems/camera-system";
import { WorldClampSystem } from "@/game/systems/world-clamp-system";
import Joystick from "@/game/ui/controls/joystick";
import type { WorldSystem } from "@/types/world-engine";
import sampleMap from "@assets/map/map.json";
import { createWorldState } from "@/game/world/create-world-state";
import { ExitSystem } from "@/game/systems/exit-system";
import { AnimationSystem } from "@/game/systems/animation-system";
import { HintSystem } from "@/game/systems/hint-system";
import { stopHapticLoop } from "@/game/hint/hint-haptics";
import { LightSystem } from "@/game/systems/light-system";
import { useGameStore } from "@/store/use-game-store";
import { DEFAULT_LIMIT } from "@/constants/time";
import { LightingWorldState } from "@/types/light";
import { WorldRenderLayer } from "@/game/ui/world/world-render-layer";

type Props = { isRunning?: boolean };

const systems: WorldSystem<LightingWorldState>[] = [
  PhysicsSystem,
  WorldClampSystem,
  ExitSystem,
  AnimationSystem,
  HintSystem,
  CameraSystem,
  LightSystem,
];

export default function GameCanvas({ isRunning = false }: Props) {
  const insets = useSafeAreaInsets();
  const joyStyle = { left: 20 + insets.left, bottom: insets.bottom + 20 };

  const initialWorld = useMemo(
    () => createWorldState({ mapJson: sampleMap }),
    [],
  );
  const worldRef = useRef<LightingWorldState>(initialWorld);

  const countdown = useGameStore((state) =>
    state.status.type === "playing" ? state.status.time : null,
  );

  useEffect(() => {
    if (countdown == null) {
      return;
    }

    const worldState = worldRef.current;
    const life = Math.max(0, Math.min(1, countdown / DEFAULT_LIMIT));
    worldState.light.lightLife = life;
  }, [countdown]);

  useEffect(() => {
    if (!isRunning) {
      stopHapticLoop();
    }
  }, [isRunning]);

  const handleLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    const view = worldRef.current.view;
    view.width = width;
    view.height = height;
  };

  return (
    <View style={styles.root}>
      <WorldEngineLayer<LightingWorldState>
        isRunning={isRunning}
        style={styles.canvas}
        worldMap={worldRef.current}
        systems={systems}
        onLayout={handleLayout}
        renderOverlay={(world) => <WorldRenderLayer world={world} />}
      />
      <View style={styles.hud}>
        <Joystick
          onChange={(value) => {
            const world = worldRef.current;
            world.input.x = value.x;
            world.input.y = value.y;
            world.input.power = value.strength;
          }}
          style={[styles.joystick, joyStyle]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, width: "100%", height: "100%", position: "relative" },
  canvas: { flex: 1, position: "relative" },
  hud: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: "box-none",
    zIndex: 20,
  },
  joystick: { position: "absolute" },
});
