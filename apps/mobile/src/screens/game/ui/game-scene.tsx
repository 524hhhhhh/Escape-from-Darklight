import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, LayoutChangeEvent } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WorldEngineLayer } from "@/engine/ui/world-layer/world-engine-layer";
import Joystick from "@/engine/ui/controls/joystick";
import { createWorldState } from "@/engine/world/create-world-state";
import { stopHapticLoop } from "@/engine/hint/hint-haptics";
import { useGameStore } from "@/store/use-game-store";
import { DEFAULT_LIMIT } from "@/constants/time";
import { LightingWorldState } from "@/types/light";
import { WorldRenderLayer } from "@/engine/ui/world-layer/world-render-layer";
import StatusHud from "@/engine/ui/hud/status-hud";
import { systems } from "@/engine/systems";
import { COLORS } from "@/constants/theme";

type Props = { isRunning?: boolean; canControl?: boolean };

export default function GameScene({
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
  const [isWorldReady, setIsWorldReady] = useState(false);

  useEffect(() => {
    setIsWorldReady(false);
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

  const setupWorldViewport = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;

    if (!width || !height || !currentMap) {
      return;
    }

    if (!worldRef.current) {
      worldRef.current = createWorldState({ mapJson: currentMap });
    }

    const view = worldRef.current.view;
    view.width = width;
    view.height = height;

    setIsWorldReady(true);
  };

  return (
    <View
      style={styles.root}
      renderToHardwareTextureAndroid
      needsOffscreenAlphaCompositing
      onLayout={setupWorldViewport}
    >
      {isWorldReady && worldRef.current ? (
        <>
          <WorldEngineLayer
            isRunning={isRunning}
            style={styles.worldLayer}
            world={worldRef.current}
            systems={systems}
            renderOverlay={(world) => <WorldRenderLayer world={world} />}
          />

          <StatusHud />

          <View style={styles.overlay}>
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
        </>
      ) : (
        <View style={styles.blank} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "relative",
    backgroundColor: COLORS.BACKGROUND.GAME,
  },
  blank: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND.GAME,
  },
  worldLayer: { flex: 1, position: "relative" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: "box-none",
    zIndex: 20,
  },
  joystick: { position: "absolute" },
});
