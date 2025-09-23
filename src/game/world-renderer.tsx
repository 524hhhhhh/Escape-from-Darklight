import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { LayoutChangeEvent, StyleProp, View, ViewStyle } from "react-native";
import { useGameLoop } from "@/hooks/use-game-loop";
import type { WorldLoopHandle, WorldSystem } from "@/types/world-engine";
import { WorldState } from "@/types/world-state";

type Props = {
  systems?: WorldSystem[];
  worldMap: WorldState;
  isRunning?: boolean;
  style?: StyleProp<ViewStyle>;
  onLayout?: (e: LayoutChangeEvent) => void;
};

const WorldRenderer = forwardRef<WorldLoopHandle, Props>(
  ({ systems = [], worldMap, isRunning = false, style, onLayout }, ref) => {
    const loop = useGameLoop(worldMap, systems);

    useImperativeHandle(ref, () => ({
      start: loop.start,
      stop: loop.stop,
      resetWorld: loop.reset,
      getWorld: loop.getEntityMap,
    }));

    useEffect(() => {
      if (isRunning) {
        loop.start();
      } else {
        loop.stop();
      }
    }, [isRunning, loop]);

    const world = loop.getEntityMap();
    const rendered = Object.entries(world.entities)
      .map(([id, entity]) => {
        if (!entity.renderer) {
          return null;
        }
        const Renderer = entity.renderer;

        return <Renderer key={id} {...entity} />;
      })
      .filter(Boolean);

    return (
      <View style={style} onLayout={onLayout}>
        {rendered}
      </View>
    );
  },
);

export default WorldRenderer;
