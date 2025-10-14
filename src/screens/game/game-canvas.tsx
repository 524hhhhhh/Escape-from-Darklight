import { useEffect, useRef } from "react";
import { View, StyleSheet, LayoutChangeEvent } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WorldEngineLayer } from "@/game/ui/world-layer/world-engine-layer";
import Joystick from "@/game/ui/controls/joystick";
import { createWorldState } from "@/game/world/create-world-state";
import { stopHapticLoop } from "@/game/hint/hint-haptics";
import { useGameStore } from "@/store/use-game-store";
import { DEFAULT_LIMIT } from "@/constants/time";
import { LightingWorldState } from "@/types/light";
import { WorldRenderLayer } from "@/game/ui/world-layer/world-render-layer";
import StatusHud from "@/game/ui/hud/status-hud";
import { systems } from "@/game/systems";

type Props = { isRunning?: boolean; canControl?: boolean };

export default function GameCanvas({
  isRunning = false,
  canControl = true,
}: Props) {
  const insets = useSafeAreaInsets();
  const joyStyle = { left: 20 + insets.left, bottom: insets.bottom + 20 };

  const currentMap = useGameStore((state) => state.currentMapJson);
  const countdown = useGameStore((state) =>
    state.status.type === "playing" ? state.status.time : null,
  );

  const worldRef = useRef<LightingWorldState | null>(null);

  useEffect(() => {
    if (currentMap) {
      worldRef.current = createWorldState({ mapJson: currentMap });
    } else {
      worldRef.current = null;
    }
  }, [currentMap]);

  useEffect(() => {
    if (countdown == null) {
      return;
    }

    const worldState = worldRef.current;

    if (!worldState) {
      return;
    }

    const life = Math.max(0, Math.min(1, countdown / DEFAULT_LIMIT));
    worldState.light.lightLife = life;
  }, [countdown]);

  useEffect(() => {
    if (!isRunning) {
      stopHapticLoop();
    }

    return () => stopHapticLoop();
  }, [isRunning]);

  if (currentMap && !worldRef.current) {
    worldRef.current = createWorldState({ mapJson: currentMap });
  }

  if (!currentMap || !worldRef.current) {
    return <View />;
  }

  const handleLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (!worldRef.current) {
      return;
    }

    const view = worldRef.current.view;
    view.width = width;
    view.height = height;
  };

  return (
    <View style={styles.root}>
      <WorldEngineLayer
        isRunning={isRunning}
        style={styles.canvas}
        world={worldRef.current}
        systems={systems}
        onLayout={handleLayout}
        renderOverlay={(world) => <WorldRenderLayer world={world} />}
      />

      <StatusHud />

      <View style={styles.hud}>
        {canControl && (
          <Joystick
            onChange={(value) => {
              const world = worldRef.current;
              if (!world) {
                return;
              }

              world.input.x = value.x;
              world.input.y = value.y;
              world.input.power = value.strength;
            }}
            style={[styles.joystick, joyStyle]}
          />
        )}
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
