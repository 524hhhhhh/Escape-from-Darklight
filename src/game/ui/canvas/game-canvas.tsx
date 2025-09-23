import React, { useEffect, useRef } from "react";
import { View, StyleSheet, LayoutChangeEvent } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WorldRenderer from "@/game/world-renderer";
import { PhysicsSystem } from "@/game/systems/physics-system";
import { CameraSystem } from "@/game/systems/camera-system";
import Joystick from "@/game/ui/controls/joystick";
import type { WorldLoopHandle, WorldSystem } from "@/types/world-engine";
import { createWorldState } from "@/game/ui/world/create-world-state";

type Props = { isRunning?: boolean };
const systems: WorldSystem[] = [PhysicsSystem, CameraSystem];

export default function GameCanvas({ isRunning = false }: Props) {
  const insets = useSafeAreaInsets();
  const joyStyle = { left: 20 + insets.left, bottom: insets.top - 40 };

  const engineRef = useRef<WorldLoopHandle | null>(null);
  const worldRef = useRef(createWorldState());

  useEffect(() => {
    if (isRunning) {
      const newWorld = createWorldState();
      worldRef.current = newWorld;

      engineRef.current?.resetWorld(newWorld);
      engineRef.current?.start();
    } else {
      engineRef.current?.stop();
    }
  }, [isRunning]);

  return (
    <View style={styles.root}>
      <WorldRenderer
        ref={engineRef}
        isRunning={isRunning}
        style={styles.canvas}
        worldMap={worldRef.current}
        systems={systems}
        onLayout={(e: LayoutChangeEvent) => {
          const { width, height } = e.nativeEvent.layout;
          worldRef.current.view.width = width;
          worldRef.current.view.height = height;
        }}
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
  canvas: { flex: 1 },
  hud: { ...StyleSheet.absoluteFillObject, pointerEvents: "box-none" },
  joystick: { position: "absolute" },
});
