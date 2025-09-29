import React, { useEffect } from "react";
import { LayoutChangeEvent, StyleProp, View, ViewStyle } from "react-native";
import { useGameLoop } from "@/hooks/use-game-loop";
import type { WorldSystem } from "@/types/world-engine";
import { WorldState } from "@/types/world-state";

type Props = {
  systems?: WorldSystem[];
  worldMap: WorldState;
  isRunning?: boolean;
  style?: StyleProp<ViewStyle>;
  onLayout?: (e: LayoutChangeEvent) => void;
  renderOverlay?: (world: WorldState) => React.ReactNode;
};

export function WorldRenderer({
  systems = [],
  worldMap,
  isRunning = false,
  style,
  onLayout,
  renderOverlay,
}: Props) {
  const loop = useGameLoop(worldMap, systems);

  useEffect(() => {
    if (isRunning) {
      loop.start();
    } else {
      loop.stop();
    }
  }, [isRunning, loop]);

  const world = loop.getWorld();
  const rendered = Object.entries(world.entities)
    .map(([id, entity]) => {
      if (!entity.renderer) {
        return null;
      }

      const Renderer = entity.renderer;
      return <Renderer key={id} {...entity.props} />;
    })
    .filter(Boolean);

  return (
    <View style={style} onLayout={onLayout}>
      {renderOverlay?.(world)}
      {rendered}
    </View>
  );
}
