import React, { useEffect } from "react";
import { LayoutChangeEvent, StyleProp, View, ViewStyle } from "react-native";
import { useGameLoop } from "@/hooks/use-game-loop";
import type { WorldSystem } from "@/types/world-engine";
import { WorldState } from "@/types/world-state";

type Props<T extends WorldState> = {
  systems?: WorldSystem<T>[];
  worldMap: T;
  isRunning?: boolean;
  style?: StyleProp<ViewStyle>;
  onLayout?: (e: LayoutChangeEvent) => void;
  renderOverlay?: (world: T) => React.ReactNode;
};

export function WorldEngineLayer<T extends WorldState>({
  systems = [],
  worldMap,
  isRunning = false,
  style,
  onLayout,
  renderOverlay,
}: Props<T>) {
  const loop = useGameLoop<T>(worldMap, systems);

  useEffect(() => {
    if (isRunning) {
      loop.start();
    } else {
      loop.stop();
    }
  }, [isRunning, loop]);

  const world = loop.getWorld();

  return (
    <View style={style} onLayout={onLayout}>
      {renderOverlay?.(world)}
    </View>
  );
}
