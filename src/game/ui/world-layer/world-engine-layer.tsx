import { useEffect } from "react";
import { LayoutChangeEvent, StyleProp, View, ViewStyle } from "react-native";
import { useGameLoop } from "@/hooks/use-game-loop";
import type { WorldSystem } from "@/types/world-engine";
import type { LightingWorldState } from "@/types/light";

type Props = {
  systems?: readonly WorldSystem<LightingWorldState>[];
  world: LightingWorldState;
  isRunning?: boolean;
  style?: StyleProp<ViewStyle>;
  onLayout?: (e: LayoutChangeEvent) => void;
  renderOverlay?: (world: LightingWorldState) => React.ReactNode;
};

export function WorldEngineLayer({
  systems = [],
  world,
  isRunning = false,
  style,
  onLayout,
  renderOverlay,
}: Props) {
  const loop = useGameLoop(world, [...systems]);

  useEffect(() => {
    isRunning ? loop.start() : loop.stop();
  }, [isRunning, loop]);

  const currentWorld = loop.getWorld();

  return (
    <View style={style} onLayout={onLayout}>
      {renderOverlay?.(currentWorld)}
    </View>
  );
}
