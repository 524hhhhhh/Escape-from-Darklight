import React from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGameStore } from "@/store/use-game-store";
import Timer from "@/game/ui/hud/timer";
import HeartBar from "@/game/ui/hud/heart-bar";

export default function StatusHud() {
  const insets = useSafeAreaInsets();
  const hp = useGameStore((state) => state.hp);
  const maxHp = useGameStore((state) => state.maxHp);

  return (
    <View style={styles.root} pointerEvents="none">
      <HeartBar hp={hp} maxHp={maxHp} x={40} y={40 + insets.top} />
      <Timer />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 20,
  },
  hpBar: {
    position: "absolute",
    width: 120,
    height: 12,
  },
});
