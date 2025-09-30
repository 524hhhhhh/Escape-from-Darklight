import React from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGameStore } from "@/store/use-game-store";
import HpBar from "@/game/ui/hud/hp-bar";
import Timer from "@/game/ui/hud/timer";

export default function StatusHud() {
  const insets = useSafeAreaInsets();
  const hp = useGameStore((state) => state.hp);
  const maxHp = useGameStore((state) => state.maxHp);
  const getHpBarStyle = (insetTop: number) => [
    styles.hpBar,
    { top: 40 + insetTop, left: 40 },
  ];

  return (
    <View style={styles.root} pointerEvents="none">
      <HpBar hp={hp} maxHp={maxHp} style={getHpBarStyle(insets.top)} />
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
