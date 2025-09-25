import React, { useEffect, useMemo, useRef } from "react";
import { View, StyleSheet, LayoutChangeEvent } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WorldRenderer from "@/game/world-renderer";
import { PhysicsSystem } from "@/game/systems/physics-system";
import { CameraSystem } from "@/game/systems/camera-system";
import { WorldClampSystem } from "@/game/systems/world-clamp-system";
import Joystick from "@/game/ui/controls/joystick";
import type { WorldLoopHandle, WorldSystem } from "@/types/world-engine";
import sampleMap from "@assets/map/map.json";
import TileLayer from "@/game/ui/world/tile-layer";
import { createWorldState } from "@/game/ui/world/create-world-state";
import { ExitSystem } from "@/game/systems/exit-system";

type Props = { isRunning?: boolean };
const systems: WorldSystem[] = [
  PhysicsSystem,
  WorldClampSystem,
  ExitSystem,
  CameraSystem,
];

export default function GameCanvas({ isRunning = false }: Props) {
  const insets = useSafeAreaInsets();
  const joyStyle = { left: 20 + insets.left, bottom: insets.bottom + 20 };

  const engineRef = useRef<WorldLoopHandle | null>(null);
  const initialWorld = useMemo(
    () => createWorldState({ mapJson: sampleMap }),
    [],
  );
  const worldRef = useRef(initialWorld);

  const layoutReadyRef = useRef(false);

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) {
      return;
    }

    if (isRunning) {
      engine.start();
    } else {
      engine.stop();
    }
  }, [isRunning]);

  const handleLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    const view = worldRef.current.view;
    view.width = width;
    view.height = height;
    layoutReadyRef.current = true;
  };

  return (
    <View style={styles.root}>
      <WorldRenderer
        ref={engineRef}
        isRunning={isRunning}
        style={styles.canvas}
        worldMap={worldRef.current}
        systems={systems}
        onLayout={handleLayout}
        renderOverlay={(world) =>
          world.map ? <TileLayer map={world.map} view={world.view} /> : null
        }
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
  hud: { ...StyleSheet.absoluteFillObject, pointerEvents: "box-none" },
  joystick: { position: "absolute" },
});
